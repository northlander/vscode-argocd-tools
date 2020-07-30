// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ArgocdContextExplorer, ArgocdContextNode } from './argocd.ctx.explorer';
import { ArgocdRepoExplorer } from './argocd.repo.explorer';
import { addRepo } from './argocd.repo.commands';
import { Argocd } from './argocd.service';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const argocdContextExplorer = new ArgocdContextExplorer();
	const argocdRepoExplorer = new ArgocdRepoExplorer();

	const subscriptions = [
		vscode.commands.registerCommand("extension.vsArgocdTools.deleteContextEntry", deleteContext),
		vscode.commands.registerCommand("extension.vsArgocdTools.setCurrentContext", setCurrentContext),
		vscode.commands.registerCommand("extension.vsArgocdTools.addRepo", addRepo),
		vscode.commands.registerCommand("extension.vsArgocdTools.refreshContexts", () => argocdContextExplorer.refresh())
	];
	
	subscriptions.forEach((element) => {
        context.subscriptions.push(element);
	});

	vscode.window.registerTreeDataProvider('extension.vsArgocdTools.contexts', argocdContextExplorer);
	vscode.window.registerTreeDataProvider('extension.vsArgocdTools.repos', argocdRepoExplorer);
}

// this method is called when your extension is deactivated
export function deactivate() {}

export const deleteMessageItems: vscode.MessageItem[] = [
    {
        title: "Delete"
    },
    {
        title: "Cancel",
        isCloseAffordance: true
    }
];

async function deleteContext(explorerNode?: ArgocdContextNode){
	if (explorerNode){
		const answer = await vscode.window.showWarningMessage(`Do you want to delete the context '${explorerNode.getTreeItem().label}'?`, ...deleteMessageItems);
        if (!answer || answer.isCloseAffordance) {
            return;
        }
	}
}

async function setCurrentContext(explorerNode?: ArgocdContextNode){
	if (explorerNode){
		await Argocd.setCurrentContext(explorerNode.context);
		await vscode.window.showInformationMessage(`Argocd context set to ${explorerNode.getTreeItem().label}`);
	}
}