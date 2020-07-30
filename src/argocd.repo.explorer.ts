import * as vscode from 'vscode';
import { VsArgocdNodeContextValues } from './constants';
import { V1alpha1Repository } from './api/gen/model/v1alpha1Repository';
import { Argocd } from './argocd.service';

export interface ArgocdRepoNode {
    getChildren(): Promise<ArgocdRepoNode[]>;
    getTreeItem(): vscode.TreeItem;
}

class ArgocdRepoNodeImpl implements ArgocdRepoNode {
    constructor(readonly repoModel: V1alpha1Repository) {

    }

    getTreeItem(): vscode.TreeItem {
        const treeItem = new vscode.TreeItem(this.getLabel(), vscode.TreeItemCollapsibleState.None);
        treeItem.description = this.repoModel.name;
        treeItem.contextValue = VsArgocdNodeContextValues.Repo;
        return treeItem;
    }

    async getChildren(): Promise<ArgocdRepoNode[]> {
        return Promise.resolve([]);
    }

    private getLabel(): string {
        return this.repoModel.repo || '<unknown>';
    }
}

export class ArgocdRepoExplorer implements vscode.TreeDataProvider<ArgocdRepoNode> {
    private _onDidChangeTreeData: vscode.EventEmitter<ArgocdRepoNode | undefined> = new vscode.EventEmitter<ArgocdRepoNode | undefined>();
    readonly onDidChangeTreeData: vscode.Event<ArgocdRepoNode | undefined> = this._onDidChangeTreeData.event;

    constructor() {

    }

    getTreeItem(element: ArgocdRepoNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element.getTreeItem();
    }

    getChildren(parent?: ArgocdRepoNode): vscode.ProviderResult<ArgocdRepoNode[]> {
        if (parent) {
            return parent.getChildren();
        }

        return this.getArgocdRepos();
    }

    refresh(node?:ArgocdRepoNode) {
      this._onDidChangeTreeData.fire(node);
    }

    private async getArgocdRepos(): Promise<ArgocdRepoNode[]> {
        const repos = await Argocd.listRepos();
        return Promise.resolve(repos.map(r => new ArgocdRepoNodeImpl(r)));
    }
}

