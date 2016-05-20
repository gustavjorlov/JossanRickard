import React from 'react';

const Image = ({id, url, caption, displayname}) => {
    return (
        <figure key={id} className={(window.location.hash === '#two' ? 'figure col-sm-6' : 'figure')}>
            <img src={url} className="figure-img img-fluid img-rounded" />
        </figure>
    );
}

export default Image;
