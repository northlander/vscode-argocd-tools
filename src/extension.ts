// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ArgocdContextExplorer, ArgocdContextNode } from './argocd.ctx.explorer';
import { ArgocdRepoExplorer } from './argocd.repo.explorer';
import { addRepo } from './argocd.repo.commands';
import { Argocd } from './argocd.service';
import { ArgocdApplicationExplorer, ArgocdApplicationNode } from './argocd.app.explorer';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const argocdContextExplorer = new ArgocdContextExplorer();
	const argocdRepoExplorer = new ArgocdRepoExplorer();
	const argocdApplicationExplorer = new ArgocdApplicationExplorer();

	const subscriptions = [
		vscode.commands.registerCommand("extension.vsArgocdTools.deleteContextEntry", (node?: ArgocdContextNode) => deleteContext(argocdContextExplorer, node)),
		vscode.commands.registerCommand("extension.vsArgocdTools.setCurrentContext", (node?: ArgocdContextNode) => setCurrentContext(argocdContextExplorer, node)),
		vscode.commands.registerCommand("extension.vsArgocdTools.addRepo", addRepo),
		vscode.commands.registerCommand("extension.vsArgocdTools.refreshContexts", () => argocdContextExplorer.refresh()),
		vscode.commands.registerCommand("extension.vsArgocdTools.refreshRepos", () => argocdRepoExplorer.refresh()),
		vscode.commands.registerCommand("extension.vsArgocdTools.refreshApplications", () => argocdApplicationExplorer.refresh()),
		vscode.commands.registerCommand("extension.vsArgocdTools.sync", (node?: ArgocdApplicationNode) => sync(argocdApplicationExplorer, node)),
	];
	
	subscriptions.forEach((element) => {
        context.subscriptions.push(element);
	});

	vscode.window.registerTreeDataProvider('extension.vsArgocdTools.contexts', argocdContextExplorer);
	vscode.window.registerTreeDataProvider('extension.vsArgocdTools.repos', argocdRepoExplorer);
	vscode.window.registerTreeDataProvider('extension.vsArgocdTools.applications', argocdApplicationExplorer);
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

async function deleteContext(explorer: ArgocdContextExplorer, explorerNode?: ArgocdContextNode){
	if (explorerNode){
		const answer = await vscode.window.showWarningMessage(`Do you want to delete the context '${explorerNode.getTreeItem().label}'?`, ...deleteMessageItems);
        if (!answer || answer.isCloseAffordance) {
            return;
		}
		// await Argocd.deleteContext(explorerNode);
		explorer.refresh();
	}
}

async function setCurrentContext(explorer: ArgocdContextExplorer, explorerNode?: ArgocdContextNode){
	if (explorerNode){
		await Argocd.setCurrentContext(explorerNode.context);
		explorer.refresh();
		await vscode.window.showInformationMessage(`Argocd context set to ${explorerNode.getTreeItem().label}`);
	}
}

async function sync(explorer: ArgocdApplicationExplorer, explorerNode?: ArgocdApplicationNode) {
	if (explorerNode && explorerNode.appModel.metadata?.name) {
		await Argocd.syncResource([explorerNode.appModel.metadata?.name], [], [], [], false, false, false, "apply");
		explorer.refresh();
		await vscode.window.showInformationMessage(`Argocd syncing ${explorerNode.getTreeItem().label}`);
	}
}