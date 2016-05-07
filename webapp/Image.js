import React from 'react';

const Image = ({id, url, caption}) => {
    return (
        <figure key={id} className="figure">
            <img src={url} className="figure-img img-fluid img-rounded" />
            <figcaption className="figure-caption text-center-lg">{caption}</figcaption>
        </figure>
    );
}

export default Image;
