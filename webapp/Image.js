import React from 'react';

const Image = ({id, url, caption, displayname}) => {
    return (
        <figure key={id} className={'figure ' (window.location.hash === '#two' ? 'col-sm-6' : '')}>
            <img src={url} className="figure-img img-fluid img-rounded" />
        </figure>
    );
}

export default Image;
