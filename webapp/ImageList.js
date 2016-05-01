import React from 'react';
import Image from './Image.js';

export default class ImageList extends React.Component{
    getImages(item){
        return (<div key={item.id} className="image">
            <img src={item.url} />
            <p>{item.caption}</p>
        </div>);
    }
    render(){
        console.log("ImageList", this.props);
        return (<div>
            <h1>ImageList</h1>
            {this.props.images ? this.props.images.map(this.getImages) : "no images"}
        </div>);
    }
}
