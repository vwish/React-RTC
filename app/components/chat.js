var React = require('../../vendor/react/react');
var MessageList = require('./message_list');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      messages: [],
      newMessage: ''
    };
  },
  componentDidMount: function() {
    this.props.session.addListener('message', this.receiveMessage);
  },
  componentWillUnmount: function() {
    this.props.session.removeListener('message', this.receiveMessage);
  },
  send: function(e) {
    if (e.keyCode !== 13 || e.target.value === "") {
      return;
    }

    // Send new message
    this.props.session.message({
      name: this.props.name,
      message: e.target.value
    });
    this.refs.messageForm.getDOMNode().value = '';
  },
  addMessage: function(newMessage) {
    this.state.messages.push(newMessage);

    return this.setState({
      messages: this.state.messages
    });
  },
  receiveMessage: function(data) {
    this.addMessage(data.name + ": " + data.message);
  },
  render: function() {
    return React.DOM.div({
      className: 'chat'
    }, this.messageList(), this.messageForm());
  },
  messageForm: function() {
    return React.DOM.input({
      className: 'form-control',
      name: 'message',
      onKeyUp: this.send,
      placeholder: 'Send message...',
      ref: 'messageForm',
      type: 'text'
    });
  },
  messageList: function() {
    return MessageList({
      messages: this.state.messages
    });
  }
});
