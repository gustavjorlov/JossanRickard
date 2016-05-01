import React from 'react';
import Image from './Image.js';

export default class ImageList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            images: this.props.images
        };
        console.log(this.images);
    }
    getImages(item){
        console.log(item);
        return "<h1>"+item.url+"</h1>";
    }
    render(){
        return (<div>
            <h1>ImageList</h1>
            {this.state.images ? this.state.images.map(this.getImages) : "no images"}
        </div>);
    }
}
