import * as vscode from 'vscode';

export async function showYesNoQuestion(question: string){
    
    const yesNoMessageItems: vscode.MessageItem[] = [
        {
            title: "yes"
        },
        {
            title: "no",
        }
    ];

    var options:vscode.MessageOptions = {
        modal: true
    };

    const answer = await vscode.window.showInformationMessage(question, options, ...yesNoMessageItems);
    return answer && answer?.title === 'yes';
}