import * as vscode from 'vscode';
import { V1alpha1Repository } from './api/api';
import { showYesNoQuestion } from './vscodeutills';
import * as fs from 'async-file';

enum RepoConnectionType {
    https,
    ssh
};

export async function addRepo(){

    const repoSettings: V1alpha1Repository = {};

    console.log("Adding a repository");

    // Helm or Git
    repoSettings.type = await vscode.window.showQuickPick( ['helm', 'git'], 
        {canPickMany: false, placeHolder: 'What type of repository do you want to add?'});

    console.log(`A ${repoSettings.type} repo is selected`);

    // Name
    if ( repoSettings.type === 'helm') {
        repoSettings.name = await vscode.window.showInputBox( 
            { prompt: 'What is the name of the repo?',
              value: 'my-repo',
              validateInput: (v:string) => v ? null : 'A name is required for Helm repos.'});
    }

    repoSettings.repo = await vscode.window.showInputBox(
        { prompt: 'What is the repo URL?', 
          value: 'https://github.com/example/repo.git',
          validateInput: (v:string) => v ? null : 'A repo URL is needed.'
        }
    );

    const connectionType = (repoSettings.repo?.startsWith('https://') || repoSettings.repo?.startsWith('http://')) 
                                ? RepoConnectionType.https : RepoConnectionType.ssh;
        
    if ( connectionType === RepoConnectionType.ssh ) {
        if (await showYesNoQuestion('Do you want to add a SSH Private key to authenticate? (a file dialog will open)')) {
            repoSettings.sshPrivateKey = await loadFileFromDiaogAsync('Choose SSH private key to authenticate' );
            if (!repoSettings.sshPrivateKey) {return;}
        }
        
    } else { // https
        
        repoSettings.username = await vscode.window.showInputBox(
            { prompt: 'Username (optional)', 
              value: 'optional username'
            }
        );

        repoSettings.password = await vscode.window.showInputBox(
            { prompt: 'password (optional)', 
              value: 'optional password'
            }
        );

        if (await showYesNoQuestion("Do you want to add a TLS client certificate? " +
                                        "Choose the certificate in the first file dialog and the key in the second")) {
            repoSettings.tlsClientCertData = await loadFileFromDiaogAsync('Choose TLS Client certificate');
            if (!repoSettings.tlsClientCertData) {return;}
            repoSettings.tlsClientCertKey = await loadFileFromDiaogAsync('Choose TLS Client certificate key');
            if (!repoSettings.tlsClientCertKey) {return;}
        }
    }

    if (await showYesNoQuestion('Do you want to skip server verification (insecure?)')) {
        repoSettings.insecure = true;
    }

    if ( repoSettings.type === 'git' && await showYesNoQuestion("Do you want to enable LFS support?" )) {
        repoSettings.enableLfs = true;
    }

    console.log(JSON.stringify(repoSettings));
}

async function loadFileFromDiaogAsync(title: string) {
    const files = await vscode.window.showOpenDialog({
        canSelectFolders: false,
        canSelectMany: false,
        canSelectFiles: true,
        title: title
    });
    if (files && files.length === 1){
        return await fs.readTextFile(files[0].fsPath);
    } else {
        vscode.window.showErrorMessage("A file must be selected");
    }  
}