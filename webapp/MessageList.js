import React from 'react';
import Message from './Message.js';

export default class MessageList extends React.Component{
    render(){
        console.log("MessageList", this.props);
        return (<div className="messagelist col-sm-4">
            <h1 className="display-3">jorlov.se/hej</h1>
            {this.props.messages.map((item) => <Message id={item.id} name={item.name} message={item.message} />) }
        </div>);
    }
}
