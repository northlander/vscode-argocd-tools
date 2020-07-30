import * as vscode from 'vscode';
import { VsArgocdNodeContextValues, ArgocdIcons, OperationPhases } from './constants';
import { V1alpha1Application } from './api/gen/model/v1alpha1Application';
import { Argocd } from './argocd.service';
import { V1alpha1SyncOperationResult } from './api/gen/model/v1alpha1SyncOperationResult';
import { V1alpha1ApplicationStatus } from './api/gen/model/v1alpha1ApplicationStatus';
import { sync } from 'glob';

export interface ArgocdApplicationNode {
    appModel: V1alpha1Application;
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
        treeItem.contextValue = VsArgocdNodeContextValues.Application;
        treeItem.iconPath = new vscode.ThemeIcon(this.syncStatusToIcon(this.appModel?.status));
        
        return treeItem;
    }

    async getChildren(): Promise<ArgocdApplicationNode[]> {
        return Promise.resolve([]);
    }

    private getLabel(): string {
        return this.appModel.metadata?.name || '<unknown>';
    }

    private syncStatusToIcon(appStatus?: V1alpha1ApplicationStatus) {
        const operationPhase = appStatus?.operationState?.phase;
        if ( operationPhase === OperationPhases.Succeeded ) {
            const syncStatus = appStatus?.sync?.status;
            if (syncStatus === 'Unknown') { return ArgocdIcons.Unknown; }
            else if (syncStatus === 'Synced') { return ArgocdIcons.Synced; }
            else if (syncStatus=== 'OutOfSync') { return ArgocdIcons.OutOfSync; }
            else { return ArgocdIcons.Unknown; }
        } else if ( operationPhase === OperationPhases.Running ) {
            return ArgocdIcons.Syncing;
        } else if ( operationPhase === OperationPhases.Failed || operationPhase === OperationPhases.Error ) {
            return ArgocdIcons.SyncError;
        } else {
            return ArgocdIcons.SyncTerminating;
        }
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

