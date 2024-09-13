const vscode = acquireVsCodeApi();

function addMessage(content) {
    const messagesDiv = document.getElementById('messages');
    const newMessage = document.createElement('div');
    newMessage.textContent = content;
    messagesDiv.appendChild(newMessage);
}

function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim()) {  // Avoid sending empty messages
        vscode.postMessage({ command: 'sendMessage', text: userInput });
        document.getElementById('userInput').value = '';
        addMessage("You: " + userInput);
    }
}

// Handle the send button click
document.getElementById('sendButton').addEventListener('click', () => {
    sendMessage();
});

// Handle "Enter" key press to send the message
document.getElementById('userInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Receive messages from the extension
window.addEventListener('message', event => {
    const message = event.data;
    if (message.command === 'botReply') {
        addMessage("Tiamat: " + message.text);
    }
});