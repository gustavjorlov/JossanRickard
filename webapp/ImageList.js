import React from 'react';
import Image from './Image.js';

export default class ImageList extends React.Component{
    render(){
        console.log("ImageList", this.props);
        return (<div className="imagelist">
            <h1>ImageList</h1>
            {this.props.messages.map((item) => <Image id={item.id} url={item.url} caption={item.caption}/>) }
        </div>);
    }
}
