import ReactDOM from 'react-dom';
import React from 'react';
import $ from 'jquery';

class Application extends React.Component {
    componentDidMount(){
        console.log("componentDidMount");
        $.get("/images", (err, response) => {
            console.log(err, response);
        });
    }
    render(){
        return (<h1>JSX</h1>);
    }
}

ReactDOM.render(<Application/>, document.getElementById("main"));
