import React from 'react';

const Message = (props) => {
    return (
        <div className="message">
            <p className="speaker">{props.speaker}</p>
            <p className="content">{props.content}</p>
        </div>
    );
};

export default Message;