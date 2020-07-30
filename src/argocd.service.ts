import { ArgocdContext } from "./argocd.context";
import * as shell from 'shelljs';
import * as vscode from 'vscode';

export interface IArgocd{

    listContexts(): Promise<ArgocdContext[]>;
    setCurrentContext(ctx: ArgocdContext): Promise<void>;
}

export const Argocd : IArgocd = {

    async listContexts(): Promise<ArgocdContext[]> {
        const ctxResp = await execAsync("argocd context");
        console.log(ctxResp);
        return Promise.resolve([]);
    },

    async setCurrentContext(ctx: ArgocdContext): Promise<void> {

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

export interface ShellResult {
    readonly code: number;
    readonly stdout: string;
    readonly stderr: string;
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
