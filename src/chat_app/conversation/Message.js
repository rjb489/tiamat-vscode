import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Typography, Divider } from '@mui/material';

const Message = (props) => {
    const isUser = props.speaker === 'You';

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: '750px',
                    p: 2,
                    backgroundColor: isUser ? 'transparent' : 'rgba(255, 255, 255, 0.04)',
                    borderRadius: 0,
                    mb: 1,
                    boxSizing: 'border-box',
                }}
            >
                {/* Speaker Name Styling */}
                <Typography
                    sx={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: isUser ? 'rgba(144, 202, 249, 1)' : 'rgba(244, 143, 177, 1)', // User: Blue, Assistant: Pink
                        textTransform: 'uppercase',
                        letterSpacing: 1.2,
                        mb: 0.5,
                    }}
                >
                    {props.speaker}
                </Typography>
                {/* Message Content */}
                <ReactMarkdown>{props.content}</ReactMarkdown>
            </Box>
            <Divider sx={{ width: '100%', maxWidth: '750px', mb: 1 }} />
        </>
    );
};

export default Message;
