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
        console.log("ImageList", this.state);
        return (<div>
            <h1>ImageList</h1>
            {this.state.images ? this.state.images.map((item) => {
              console.log("hello", item);
            }) : "no images"}
        </div>);
    }
}
