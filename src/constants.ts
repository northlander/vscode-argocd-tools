
export class VsArgocdNodeContextValues {
    public static readonly Context = "vsArgocdTools.context";
    public static readonly Repo = "vsArgocdTools.repo";
    public static readonly Application = "vsArgocdTools.application";
}

 //TODO think these through.
export class ArgocdIcons { 
    public static readonly Synced = "check";
    public static readonly OutOfSync = "triangle-up";
    public static readonly Unknown = "question";
    public static readonly Syncing = "sync";
    public static readonly SyncError = "sync-ignored";
    public static readonly SyncTerminating = "flame";
}

export type OperationPhase = 'Running' | 'Error' | 'Failed' | 'Succeeded' | 'Terminating';

export const OperationPhases = {
    Running: 'Running' as OperationPhase,
    Failed: 'Failed' as OperationPhase,
    Error: 'Error' as OperationPhase,
    Succeeded: 'Succeeded' as OperationPhase,
    Terminating: 'Terminating' as OperationPhase
};