import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Typography, Divider } from '@mui/material';

const Message = (props) => {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: '750px',
                    p: 1.5,
                    borderRadius: 2,
                    boxShadow: 1,
                    mb: 1.5,
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxSizing: 'border-box'
                }}
            >
                <Typography
                    sx={{
                        fontSize: 13,
                        fontWeight: 'bold',
                        color: 'text.secondary',
                        mb: 0.5
                    }}
                >
                    {props.speaker}
                </Typography>
                <ReactMarkdown>{props.content}</ReactMarkdown>
            </Box>
            <Divider sx={{ width: '100%', maxWidth: '750px', mb: 2 }} />
        </>
    );
};

export default Message;
