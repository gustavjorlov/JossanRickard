import React from 'react';
import Image from './Image.js';

export default class ImageList extends React.Component{
    getImages(item){
        console.log(item);
        return "<h1>"+item.url+"</h1>";
    }
    render(){
        console.log("ImageList", this.state);
        return (<div>
            <h1>ImageList</h1>
            {this.props.images ? this.props.images.map((item) => {
              console.log("hello", item);
              this.getImages(item);
            }) : "no images"}
        </div>);
    }
}
