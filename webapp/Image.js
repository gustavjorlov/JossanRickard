import React from 'react';

const Image = ({id, url, caption}) => {
    return (
        <div key={id} className="image">
            <img width="100px" src={url} />
            <p>{caption}</p>
        </div>
    );
}

export default Image;
