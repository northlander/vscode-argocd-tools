import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class ArgocdApplicationTreeDataProvider implements vscode.TreeDataProvider<ArgocdApplication>{
    getTreeItem(element: ArgocdApplication): vscode.TreeItem {
        return element;
    }
    getChildren(element?: ArgocdApplication): vscode.ProviderResult<ArgocdApplication[]> {
        if ( element ) {
            return Promise.resolve([]);
        } else {
            return Promise.resolve([ 
                new ArgocdApplication("Application A", vscode.TreeItemCollapsibleState.Collapsed),
                new ArgocdApplication("Application B", vscode.TreeItemCollapsibleState.Collapsed),
                new ArgocdApplication("Application C", vscode.TreeItemCollapsibleState.Collapsed),
                new ArgocdApplication("Application D", vscode.TreeItemCollapsibleState.Collapsed),
                new ArgocdApplication("Application E", vscode.TreeItemCollapsibleState.Collapsed) ]);
        }
    }
}

class ArgocdApplication extends vscode.TreeItem {
    constructor(
        
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ){
        super(label, collapsibleState);
    }

    get tooltip(): string {
        return `${this.label} tooltip`;
    }

    get description(): string {
        return `application description`;
    }
}