import * as vscode from 'vscode';
import { VsArgocdNodeContextValues } from './constants';
import { V1alpha1Repository } from './argocd-api-model/models';

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
    private onDidChangeTreeDataEmitter: vscode.EventEmitter<ArgocdRepoNode | undefined> = new vscode.EventEmitter<ArgocdRepoNode | undefined>();
    readonly onDidChangeTreeData: vscode.Event<ArgocdRepoNode | undefined> = this.onDidChangeTreeDataEmitter.event;

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

    private async getArgocdRepos(): Promise<ArgocdRepoNode[]> {

        // mock data
        const repos: V1alpha1Repository[] = [
         {
            repo: "https://github.com/northlander/rocket-config",
            username: "pat",
            connectionState: {
              status: "Successful",
              message: "",
              attemptedAt: {seconds: "2020-07-24T20:37:46Z"}
            },
            type: "git"
          },
          {
            repo: "https://containous.github.io/traefik-helm-chart",
            connectionState: {
              status: "Successful",
              message: "",
              attemptedAt: {seconds: "2020-07-24T20:37:46Z"}
            },
            type: "helm",
            name: "traefik"
          },
          {
            repo: "https://kubernetes.github.io/ingress-nginx/",
            connectionState: {
              status: "Successful",
              message: "",
              attemptedAt: {seconds: "2020-07-24T20:37:46Z"}
            },
            type: "helm",
            name: "ingress-nginx"
          }
        ];
        return Promise.resolve(repos.map(r => new ArgocdRepoNodeImpl(r)));
    }
}

