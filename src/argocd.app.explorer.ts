import * as vscode from 'vscode';
import { VsArgocdNodeContextValues } from './constants';
import { V1alpha1Application } from './api/gen/model/v1alpha1Application';
import { Argocd } from './argocd.service';

export interface ArgocdApplicationNode {
    getChildren(): Promise<ArgocdApplicationNode[]>;
    getTreeItem(): vscode.TreeItem;
}

class ArgocdApplicationNodeImpl implements ArgocdApplicationNode {
    constructor(readonly appModel: V1alpha1Application) {

    }

    getTreeItem(): vscode.TreeItem {
        const treeItem = new vscode.TreeItem(this.getLabel(), vscode.TreeItemCollapsibleState.None);
        treeItem.description = this.appModel.status?.sync?.status + 
                                    ' | ' +
                                this.appModel.status?.health?.status;
        treeItem.contextValue = VsArgocdNodeContextValues.Repo;
        return treeItem;
    }

    async getChildren(): Promise<ArgocdApplicationNode[]> {
        return Promise.resolve([]);
    }

    private getLabel(): string {
        return this.appModel.metadata?.name || '<unknown>';
    }
}

export class ArgocdApplicationExplorer implements vscode.TreeDataProvider<ArgocdApplicationNode> {
    private _onDidChangeTreeData: vscode.EventEmitter<ArgocdApplicationNode | undefined> = new vscode.EventEmitter<ArgocdApplicationNode | undefined>();
    readonly onDidChangeTreeData: vscode.Event<ArgocdApplicationNode | undefined> = this._onDidChangeTreeData.event;

    constructor() {

    }

    getTreeItem(element: ArgocdApplicationNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element.getTreeItem();
    }

    getChildren(parent?: ArgocdApplicationNode): vscode.ProviderResult<ArgocdApplicationNode[]> {
        if (parent) {
            return parent.getChildren();
        }

        return this.getArgocdApps();
    }

    refresh(node?:ArgocdApplicationNode) {
      this._onDidChangeTreeData.fire(node);
    }

    private async getArgocdApps(): Promise<ArgocdApplicationNode[]> {
        const apps = await Argocd.listApplications();
        return Promise.resolve(apps.map(a => new ArgocdApplicationNodeImpl(a)));
    }
}

