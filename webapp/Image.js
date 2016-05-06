import React from 'react';

const Image = ({id, url, caption}) => {
    return (
        <div key={id} className="image">
            <img className="img-thumbnail img-fluid" src={url} />
            <p>{caption}</p>
        </div>
    );
}

export default Image;
