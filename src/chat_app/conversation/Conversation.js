import React, { useState } from 'react';
import axios from 'axios';
import Message from "./Message";
import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material';

const Conversation = () => {
    const [prompt, setPrompt] = useState("");
    const [testMode, setTestMode] = useState(false);
    const [messageHistory, setMessageHistory] = useState([]);
    const [enabled, setEnabled] = useState(true);

    const testMessages = [
        "Here’s a **test message** with some `inline code`.",
        "Let's try another example with a [link](https://example.com).",
        "Here's a code block:\n\n```javascript\nconsole.log('Hello World!');\n```"
    ];

    const sendMessage = async () => {
        if (enabled && prompt.trim()) {
            setEnabled(false);
            setMessageHistory((prev) => [{ speaker: "You", content: prompt.trim() }, ...prev]);
            setPrompt("");

            const response = testMode
                ? testMessages[Math.floor(Math.random() * testMessages.length)]
                : "Simulated response from assistant";

            setMessageHistory((prev) => [{ speaker: "Tiamat", content: response }, ...prev]);
            setEnabled(true);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',
                p: 2,
                boxSizing: 'border-box',
            }}
        >
            <FormControlLabel
                control={
                    <Checkbox
                        checked={testMode}
                        onChange={() => setTestMode(!testMode)}
                    />
                }
                label="Test Mode"
                sx={{ alignSelf: 'flex-start', mb: 2 }}
            />
            <Box
                sx={{
                    flex: 1,
                    width: '100%',
                    maxWidth: '800px',
                    overflowY: 'auto',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 2,
                    p: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    minHeight: 0,
                }}
            >
                {messageHistory.map((message, index) => (
                    <Message key={index} speaker={message.speaker} content={message.content} />
                ))}
            </Box>
            <TextField
                fullWidth
                multiline
                minRows={3}
                variant="outlined"
                placeholder="Type your message here"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                InputProps={{
                    sx: {
                        color: 'white',  // White text for input
                        '&::placeholder': {
                            color: 'rgba(255, 255, 255, 0.5)',  // Light grey for placeholder
                        },
                    },
                }}
                sx={{
                    mt: 2,
                    width: '100%',
                    maxWidth: '800px',
                    borderRadius: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }}
            />
        </Box>
    );
};

export default Conversation;
