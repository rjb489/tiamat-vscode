import React from 'react';
import ReactMarkdown from 'react-markdown';
import "./Message.css";

const Message = (props) => {
    return (
        <div className={`message ${props.speaker}`}>
            <p className="message-speaker">{props.speaker}</p>
            <ReactMarkdown className="message-content" disallowedElements={['p']} unwrapDisallowed={true}>
                    {props.content}
            </ReactMarkdown>
        </div>
    );
};

export default Message;