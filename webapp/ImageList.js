import React from 'react';

export default class ImageList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            images: this.props.images
        };
        console.log(this.images);
    }
    render(){
        return (<div>
            <h1>ImageList</h1>
        </div>);
    }
}
