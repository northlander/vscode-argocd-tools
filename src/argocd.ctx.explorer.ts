import * as vscode from 'vscode';
import { VsArgocdNodeContextValues } from './constants';
import { ArgocdContext } from './argocd.context';

export interface ArgocdContextNode {
    getChildren(): Promise<ArgocdContextNode[]>;
    getTreeItem(): vscode.TreeItem;
}

class ArgocdContextNodeImpl implements ArgocdContextNode {

    constructor(readonly ctx: ArgocdContext){
        
    }

    getTreeItem(): vscode.TreeItem {

        const treeItem = new vscode.TreeItem(`${this.ctx.name}`, vscode.TreeItemCollapsibleState.None);
        if ( this.ctx.current ) {
            treeItem.iconPath = new vscode.ThemeIcon("menu-selection");
        }
        
        treeItem.contextValue = VsArgocdNodeContextValues.Context;
        return treeItem;
    }

    async getChildren(): Promise<ArgocdContextNode[]> {
        return Promise.resolve([]);
    }
}

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
}

export class ArgocdContextExplorer implements vscode.TreeDataProvider<ArgocdContextNode> {
    private onDidChangeTreeDataEmitter: vscode.EventEmitter<ArgocdContextNode | undefined> = new vscode.EventEmitter<ArgocdContextNode | undefined>();
    readonly onDidChangeTreeData: vscode.Event<ArgocdContextNode | undefined> = this.onDidChangeTreeDataEmitter.event;

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

    private async getArgocdContexts(): Promise<ArgocdContextNode[]> {
        return Promise.resolve([
            new ArgocdContextNodeImpl({name: "grpc.argocd.nordlander.digital", server: "grpc.argocd.nordlander.digital", current: false}),
            new ArgocdContextNodeImpl({name: "argocd-server", server:"argocd-server", current: true})
        ]);
    }
}




