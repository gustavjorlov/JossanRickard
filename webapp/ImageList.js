import React from 'react';
import Image from './Image.js';

export default class ImageList extends React.Component{
    render(){
        console.log("ImageList", this.props);
        return (<div className="imagelist col-sm-8">
            <h1 className="display-3">#rhjärtaj</h1>
            {this.props.images.map((item) => <Image id={item.id} url={item.url} caption={item.caption} />) }
        </div>);
    }
}
