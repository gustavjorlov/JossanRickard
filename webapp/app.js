import ReactDOM from 'react-dom';
import React from 'react';
import $ from 'jquery';

class Application extends React.Component {
    constructor(){
        this.setState({
            images: []
        });
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
