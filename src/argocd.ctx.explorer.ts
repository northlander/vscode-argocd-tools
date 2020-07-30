import * as vscode from 'vscode';
import { VsArgocdNodeContextValues } from './constants';
import { ArgocdContext } from './argocd.context';
import { IArgocd, Argocd } from './argocd.service';

export interface ArgocdContextNode {
    context: ArgocdContext;
    getChildren(): Promise<ArgocdContextNode[]>;
    getTreeItem(): vscode.TreeItem;
}

class ArgocdContextNodeImpl implements ArgocdContextNode {

    constructor(readonly context: ArgocdContext){

    }

    getTreeItem(): vscode.TreeItem {

        const treeItem = new vscode.TreeItem(`${this.context.name}`, vscode.TreeItemCollapsibleState.None);
        if ( this.context.current ) {
            treeItem.iconPath = new vscode.ThemeIcon("menu-selection");
        }
        
        treeItem.contextValue = VsArgocdNodeContextValues.Context;
        return treeItem;
    }

    async getChildren(): Promise<ArgocdContextNode[]> {
        return Promise.resolve([]);
    }
}
/*
class ArgocdContextErrorNode implements ArgocdContextNode {
    constructor(private readonly text: string, private readonly detail: string) {

    }

    getTreeItem(): vscode.TreeItem {
        const treeItem = new vscode.TreeItem(this.text);
        treeItem.tooltip = 'Click for details';
        treeItem.command = {
            title: 'Show details',
            command: 'extension.showInfoMessage',
            arguments: [this.detail]
        };
        return treeItem;
    }

    async getChildren(): Promise<ArgocdContextNodeImpl[]> {
        return [];
    }
}*/

export class ArgocdContextExplorer implements vscode.TreeDataProvider<ArgocdContextNode> {

    private _onDidChangeTreeData: vscode.EventEmitter<ArgocdContextNode | undefined> = new vscode.EventEmitter<ArgocdContextNode | undefined>();
    readonly onDidChangeTreeData: vscode.Event<ArgocdContextNode | undefined> = this._onDidChangeTreeData.event;

    readonly argocdService:IArgocd = Argocd;

    constructor() {
    }

    getTreeItem(element: ArgocdContextNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element.getTreeItem();
    }

    getChildren(parent?: ArgocdContextNode): vscode.ProviderResult<ArgocdContextNode[]> {
        if (parent) {
            return parent.getChildren();
        }

        return this.getArgocdContexts();
    }

    refresh(node?: ArgocdContextNode): void {
        this._onDidChangeTreeData.fire(node);
    }

    private async getArgocdContexts(): Promise<ArgocdContextNode[]> {
        return (await this.argocdService.listContexts()).map(ctx => {
            return new ArgocdContextNodeImpl(ctx);
        });
    }
}




