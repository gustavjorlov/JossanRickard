import React from 'react';

export default class Image extends React.Component{
    render(){
        console.log("Image", this.props);
        return (<div key={this.props.id} className="image">
            <img src={this.props.url} />
            <p>{this.props.caption}</p>
        </div>);
    }
}
