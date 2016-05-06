import ReactDOM from 'react-dom';
import React from 'react';
import $ from 'jquery';
import ImageList from './ImageList.js';

class Application extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            images: []
        };
    }
    componentDidMount(){
        console.log("componentDidMount");
        $.get("/messages", (response, status) => {
            console.log(response);
            this.setState({
                messages: response.filter((item) => {
                    return item.type === "text";
                }),
                images: response.filter((item) => {
                    return item.type === "instagram";
                })
            });
        });
    }
    render(){
        return (
            <div className="application">
                <h1>#RHJÄRTAJ</h1>
                <ImageList images={this.state.images} />
                <MessageList messages={this.state.messages} />
            </div>
        );
    }
}

ReactDOM.render(<Application/>, document.getElementById("main"));
