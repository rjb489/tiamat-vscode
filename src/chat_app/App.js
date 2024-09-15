import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const App = () => {
    const [prompt, setPrompt] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);
    const [enabled, setEnabled] = useState(true);

    const queryAssistant = async (msg) => {
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
            <div className="messages">
                {messageHistory.map((message, index) => (
                    <p className="message" key={index}>{message.speaker}: {message.content}</p>
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
