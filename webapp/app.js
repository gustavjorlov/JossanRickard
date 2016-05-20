import ReactDOM from 'react-dom';
import React from 'react';
import $ from 'jquery';
import ImageList from './ImageList.js';
import MessageList from './MessageList.js';

class Application extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            images: []
        };
    }
    getMessages(){
        $.get("/messages", (response, status) => {
            console.log(response);
            this.setState({
                messages: response.filter((item) => {
                    return item.type === "text";
                }).sort((a, b) => {
                    return Number(a.time) < Number(b.time) ? 1 : -1;
                }),
                images: response.filter((item) => {
                    return item.type === "instagram";
                }).sort((a, b) => {
                    return Number(a.time) < Number(b.time) ? 1 : -1;
                })
            });
        });
    }
    componentDidMount(){
        console.log("componentDidMount");
        this.getMessages();
        setInterval(() => {this.getMessages()}, 1000*15);
    }
    render(){
        return (
            <div className="application container">
                <div className="row">
                    <ImageList images={this.state.images} />
                    <MessageList messages={this.state.messages} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Application/>, document.getElementById("main"));
