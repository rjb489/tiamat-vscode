// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

interface TiamatResult extends vscode.ChatResult {
    metadata : {
        command : string;
    }
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tiamat-vscode" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('tiamat-vscode.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Tiamat!');
	});

	context.subscriptions.push(disposable);

    const chatDisposable = vscode.commands.registerCommand('tiamat-vscode.chat', () => {
        const panel = vscode.window.createWebviewPanel(
            'tiamat',
            'Tiamat',
            vscode.ViewColumn.One,
            {
                enableScripts: true
            }
        );

        const scriptUri = panel.webview.asWebviewUri(
            vscode.Uri.file(path.join(context.extensionPath, 'out', 'chat_app', 'bundle.js'))
        );
    
        panel.webview.html = getWebviewContent(scriptUri);
        
        // TODO: Listen for chat requests from chat app, call DocGPT API to return response
        /*
        panel.webview.onDidReceiveMessage(async (message) => {
            switch (message.command) {
                case 'askQuestion':
                const response = await getChatbotResponse(message.text);
                panel.webview.postMessage({ command: 'botReply', text: response });
                break;
            }
        });
        */
    });

    context.subscriptions.push(chatDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

async function getChatbotResponse(userMessage: string): Promise<string> {
    return `Hello! I am Tiamat! You said "${userMessage}"`;
}

// Chatbot Webview Panel HTML
function getWebviewContent(scriptUri: vscode.Uri) {
    return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>React Webview</title>
    </head>
    <body>
      <div id="root"></div>
      <script src="${scriptUri}"></script>
    </body>
  </html>`;
  }