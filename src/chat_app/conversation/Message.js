import React from 'react';
import ReactMarkdown from 'react-markdown';
import "./Message.css";

const Message = (props) => {
    return (
        <div className="message">
            <p className="message-line">
                <strong>{props.speaker}:</strong> 
                <span className="message-content">
                    <ReactMarkdown disallowedElements={['p']} unwrapDisallowed={true}>
                        {props.content}
                    </ReactMarkdown>
                </span>
            </p>
        </div>
    );
};

export default Message;