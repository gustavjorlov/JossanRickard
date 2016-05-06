import React from 'react';
import Message from './Message.js';

export default class MessageList extends React.Component{
    render(){
        console.log("MessageList", this.props);
        return (<div className="messagelist col-sm-6">
            <h1>http://jorlov.se/hej</h1>
            {this.props.messages.map((item) => <Message id={item.id} name={item.name} message={item.message} />) }
        </div>);
    }
}
