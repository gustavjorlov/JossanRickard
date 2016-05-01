import React from 'react';

const Image = ({id, url, caption}) => {
    return (
        <div key={this.props.id} className="image">
            <img src={this.props.url} />
            <p>{this.props.caption}</p>
        </div>
    );
}

export default Image;

// export default class Image extends React.Component{
//     render(){
//         console.log("Image", this.props);
//         return (<div key={this.props.id} className="image">
//             <img src={this.props.url} />
//             <p>{this.props.caption}</p>
//         </div>);
//     }
// }
