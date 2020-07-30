import { ArgocdContext } from "./argocd.context";
import * as shell from 'shelljs';
import * as vscode from 'vscode';

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

export const Argocd : IArgocd = {

    async listContexts(): Promise<ArgocdContext[]> {
        console.log("ARGOCD: Listing Contexts");
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
        return Promise.resolve([]);
    },

    async setCurrentContext(ctx: ArgocdContext): Promise<void> {
        const ctxResp = await execAsync(`argocd context ${ctx.name}`);
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