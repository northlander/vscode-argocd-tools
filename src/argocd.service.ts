import { ArgocdContext } from "./argocd.context";
import * as shell from 'shelljs';
import * as vscode from 'vscode';
import { V1alpha1Repository } from "./api/gen/model/v1alpha1Repository";
import { V1alpha1Application } from "./api/gen/model/v1alpha1Application";
import { join } from "path";

export interface IArgocd{
    /**
     * List all Argocd contexts.
     */
    listContexts(): Promise<ArgocdContext[]>;

    /**
     * Set/change the current context.
     * @param ctx The context to change to.
     */
    setCurrentContext(ctx: ArgocdContext): Promise<void>;

    /**
     * List all Repositories in current Argocd Context.
     */
    listRepos():Promise<V1alpha1Repository[]>;

    /**
     * List all applications in current Argocd context.
     */
    listApplications(): Promise<V1alpha1Application[]>;

    /**
     * Synchronize Applications and resources.
     * @param applicationNames Sync multiples apps by these names
     * @param selector Sync apps that match this labels
     * @param resources Sync only specific resources as GROUP:KIND:NAME. Fields may be blank.
     * @param labels Sync only specific resources with a label
     * @param force Use a force apply
     * @param dryRun Preview apply without affecting cluster
     * @param prune Allow deleting unexpected resources
     * @param strategy Sync strategy (one of: apply|hook)
     * @param revision Sync to a specific revision. Preserves parameter overrides
     */
    syncResource(applicationNames: string[],
                 selector: string[],
                 resources: string[],
                 labels: string[], 
                 force: boolean, 
                 dryRun: boolean, 
                 prune: boolean, 
                 strategy: string, 
                 revision?: string): Promise<void>;
}

interface TableRow
{
    [key: string]: string;
}

interface ShellResult {
    readonly code: number;
    readonly stdout: string;
    readonly stderr: string;
}

const DEBUGLOG = true;

export const Argocd : IArgocd = {

    async listContexts(): Promise<ArgocdContext[]> {
        if (DEBUGLOG) { console.log("ARGOCD: Listing Contexts"); }
        const ctxResp = await execAsync("argocd context");

        if (ctxResp?.stdout) {
            const contexts = parseSpaceAdjustedTable(ctxResp?.stdout.split('\n'))
                .map(tr => {
                    return {
                        name: tr["NAME"],
                        server: tr["SERVER"],
                        current: tr["CURRENT"] === '*'
                    };
                });
            return Promise.resolve(contexts);
        }
        // TODO error message?
        return Promise.resolve([]);
    },

    async setCurrentContext(ctx: ArgocdContext): Promise<void> {
        const ctxResp = await execAsync(`argocd context ${ctx.name}`);
        // TODO fix error handling
    },

    async listRepos(): Promise<V1alpha1Repository[]> {
        if (DEBUGLOG) { console.log("ARGOCD: Listing Repos"); }
        const shellResult = await execAsync(`argocd repo list -o json`);
        if (shellResult?.stdout) {
            const repos:V1alpha1Repository[] = JSON.parse(shellResult.stdout);
            return Promise.resolve(repos);
        }
        return Promise.resolve([]);
    },

    async listApplications(): Promise<V1alpha1Application[]> {
        if (DEBUGLOG) { console.log("ARGOCD: Listing Applications"); }
        const shellResult = await execAsync(`argocd app list -o json`);
        if (shellResult?.stdout) {
            const apps:V1alpha1Application[] = JSON.parse(shellResult.stdout);
            return Promise.resolve(apps);
        }
        return Promise.resolve([]);
    },

    async syncResource( applicationNames: string[],
                        selector: string[],
                        resources: string[],
                        labels: string[],
                        force = false, 
                        dryRun = false, 
                        prune = false, 
                        strategy = "apply", 
                        revision?: string): Promise<void>{
            let command = "argocd app sync";
            command += joinWithPrefixIfNotEmpty(applicationNames, " ");
            command += joinWithPrefixIfNotEmpty(resources, " --resources ");
            command += joinWithPrefixIfNotEmpty(labels, " --label ");
            command += joinWithPrefixIfNotEmpty(selector, " --selector ");
            if (force) { command += " --force"; }
            if (dryRun) { command += " --dry-run"; }
            if (prune) { command += " --prune"; }

            command += " --async";

            if (DEBUGLOG) { console.log(`ARGOCD: Sync Command: ${command}`); }
            const shellResult = await execAsync(command);
        }
};

async function execAsync(cmd: string, stdin?: string): Promise<ShellResult | undefined> {
    try {
        return new Promise<ShellResult>((resolve) => {
            const proc = shell.exec(cmd, execOpts(), 
                (code, stdout, stderr) => resolve({code : code, stdout : stdout, stderr : stderr})
            );
            if (stdin) {
                proc?.stdin?.end(stdin);
            }
        });
    } catch (ex) {
        vscode.window.showErrorMessage(ex);
        return undefined;
    }
}

function execOpts(): any {
    let env = process.env;
    if (isWindows()) {
        env = Object.assign({ }, env, { HOME: home() });
    }
   // env = shellEnvironment(env);
    const opts = {
        cwd: vscode.workspace.rootPath,
        env: env,
        async: true
    };
    return opts;
}

function home(): string {
    return process.env['HOME'] || 
        concatIfSafe(process.env['HOMEDRIVE'], process.env['HOMEPATH']) ||
        process.env['USERPROFILE'] ||
        '';
}

function concatIfSafe(drive: string | undefined, home: string | undefined): string | undefined {
    if (drive && home) {
        if (!home.toLowerCase().startsWith('\\windows\\system32')) {
            return drive.concat(home);
        }
    }

    return undefined;
}

function isWindows() {
    return (process.platform === "win32"); //&& !getUseWsl();
};



function parseSpaceAdjustedTable(tx: string[]):TableRow[] {
    const headLine = tx.shift();
    const re = /(?<=\s)\S|(?<=^)\S/g;

    interface Col{
        name: string,
        startIndex: number,
        length?: number
    }
    let columns:Col[] = [];

    if (headLine) {
        let match  = re.exec(headLine);

        while(match) {
            
            const endIndex = headLine.indexOf(' ',match.index);
            const name = endIndex !== -1 ? 
                headLine.substr(match.index, endIndex).trim()
                : headLine.substr(match.index).trim();
            
            columns.push( {startIndex: match.index, name} );
            match  = re.exec(headLine);
        }
    
        // fix endIndex
        columns = columns.map( (col, idx, array) => {
            const length = idx + 1 === array.length ? 
                undefined : 
                array[idx+1].startIndex - col.startIndex;
    
            return { name: col.name, 
                     startIndex: col.startIndex, 
                     length: length};
        });
    
        const result = tx.filter(l => l.length > 0)
                         .map( (line) => {
            const row :TableRow = {};
            columns.forEach( col => {
                row[col.name] = line.substr(col.startIndex, col.length).trim();
            });
            return row;
        });
        
        return result;
    } else {
        return [];
    }
    
}

function joinWithPrefixIfNotEmpty(values:string[], prefix: string) {
    const joined = values.join(' ');
    if (joined) { return `${prefix}${joined}`; }
    else { return ''; };
}