import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from "./Message";
import './App.css'; // Import the CSS file

const App = () => {
    const [prompt, setPrompt] = useState("");
    const [testMode, setTestMode] = useState(false);
    const [messageHistory, setMessageHistory] = useState([]);
    const [enabled, setEnabled] = useState(true);

    const testMessages = [
        "This is a test message.",
        "Here's a random response.",
        "I'm in test mode, no API calls here!",
        "Preset message #4",
        "Another test response!"
      ];

    const queryAssistant = async (msg) => {
        if (testMode === true) {
            return testMessages[Math.floor(Math.random() * testMessages.length)];
        } else {
            try {
                const response = await axios.post('http://127.0.0.1:8000/v1/assistant/prompt', {
                    message: msg,
                    session_id: 'vscode',
                });
                return response.data.answer;
            } catch (error) {
                console.error('Error:', error);
                return error.message;
            }
        }
    };

    const sendMessage = async () => {
        if (enabled && prompt.trim()) {
            setEnabled(false);

            setMessageHistory((prevMessages) => [...prevMessages, {speaker: "You", content: prompt.trim()}]);
            setPrompt("");

            let response = await queryAssistant(prompt.trim());
            setMessageHistory((prevMessages) => [...prevMessages, {speaker: "Tiamat", content: response}]);

            setEnabled(true);
        }
    };

    return (
        <div className="conversation">
            <label>Test Mode:</label>
            <input className="test-mode"
                type="checkbox"
                value={testMode}
                onChange={(event) => setTestMode(event.target.value)}
            />
            <div className="messages">
                {messageHistory.map((message, index) => (
                    <Message speaker={message.speaker} content={message.content} />
                ))}
            </div>
            <input className="user-input"
                placeholder="Type your message here"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
            />
            <button className="send-button" onClick={sendMessage}>Send</button>
        </div>
    );
};

export default App;
