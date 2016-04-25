import ReactDOM from 'react-dom';
import React from 'react';
import $ from 'jquery';
import ImageList from './ImageList.js';

class Application extends React.Component {
    constructor(){
        super(props);
        this.state = { images: [] };
    }
    componentDidMount(){
        console.log("componentDidMount");
        $.get("/images", (err, response) => {
            console.log(err, response);
            this.setState({
                images: response
            });
        });
    }
    render(){
        return (<div>
            <h1>JSX</h1>
            <ImageList images={this.state.images} />
        </div>);
    }
}

ReactDOM.render(<Application/>, document.getElementById("main"));
