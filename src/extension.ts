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

        const htmlPath = path.join(context.extensionPath, 'src', 'chat_panel', 'index.html');
        let htmlContent = fs.readFileSync(htmlPath, 'utf8');

        const cssPath = path.join(context.extensionPath, 'src', 'chat_panel', 'styles.css');
        const cssContent = fs.readFileSync(cssPath, 'utf8');

        const jsPath = path.join(context.extensionPath, 'src', 'chat_panel', 'script.js');
        const jsContent = fs.readFileSync(jsPath, 'utf8');

        // insert CSS into HTML content
        htmlContent = htmlContent.replace(
            '</head>',
            `<style>${cssContent}</style></head>`
        );

        // insert JS into HTML content
        htmlContent = htmlContent.replace(
            '</body>',
            `<script>${jsContent}</script></body>`
        );

        panel.webview.html = htmlContent;

        // Handle messages from the webview
        panel.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'sendMessage':
                        const userMessage = message.text;
                        const botResponse = "Hi! I'm Tiamat!";
                        panel.webview.postMessage({ command: 'botReply', text: botResponse });
                        break;
                }
            },
            undefined,
            context.subscriptions
        );
    });

    context.subscriptions.push(chatDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

// Chatbot Webview Panel HTML
function getChatbotPanelContent() {
    return `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Chat Bot</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                }
                #messages {
                    border: 1px solid #ddd;
                    height: 300px;
                    overflow-y: scroll;
                    margin-bottom: 10px;
                    padding: 10px;
                }
                #userInput {
                    width: 80%;
                    padding: 10px;
                }
                #sendButton {
                    padding: 10px 20px;
                    cursor: pointer;
                }
            </style>
        </head>
        <body>
            <div id="messages"></div>
            <input type="text" id="userInput" placeholder="Type a message" />
            <button id="sendButton">Send</button>

            <script>
                const vscode = acquireVsCodeApi();

                // Handle the send button click
                document.getElementById('sendButton').addEventListener('click', () => {
                    const userInput = document.getElementById('userInput').value;
                    vscode.postMessage({ command: 'sendMessage', text: userInput });
                    document.getElementById('userInput').value = '';
                });

                // Receive messages from the extension
                window.addEventListener('message', event => {
                    const message = event.data;
                    if (message.command === 'botReply') {
                        const messagesDiv = document.getElementById('messages');
                        const newMessage = document.createElement('div');
                        newMessage.textContent = 'Bot: ' + message.text;
                        messagesDiv.appendChild(newMessage);
                    }
                });
            </script>
        </body>
        </html>
    `;
}