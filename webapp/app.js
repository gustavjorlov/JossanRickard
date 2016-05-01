import ReactDOM from 'react-dom';
import React from 'react';
import $ from 'jquery';
import ImageList from './ImageList.js';

class Application extends React.Component {
    constructor(props){
        super(props);
        this.state = { images: [] };
    }
    componentDidMount(){
        console.log("componentDidMount");
        $.get("/images", (response, status) => {
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
