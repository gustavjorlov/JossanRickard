import React from 'react';

const Image = ({id, url, caption}) => {
    return (
        <figure key={id} className="figure col-sm-6">
            <img src={url} className="figure-img img-fluid img-rounded" />
            <h2>{caption}</h2>
        </figure>
    );
}

export default Image;
