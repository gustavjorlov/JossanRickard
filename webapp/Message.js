import React from 'react';

const Message = ({id, name, message}) => {
    return (
        <div key={id} className="message">
            <h2>{name}: {message}</h2>
        </div>
    );
}

export default Message;
