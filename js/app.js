var React = React || {};

var Message = React.createClass({
  render: function() {
    return React.DOM.li({
      className: 'list-group-item'
    }, this.props.message);
  }
});

var MessageList = React.createClass({
  componentDidUpdate: function() {
    // Scroll message list to the bottom
    this.getDOMNode().scrollTop = this.getDOMNode().scrollHeight;
  },
  render: function() {
    var messages = this.props.messages.map(function(message, i) {
      return Message({
        key: i,
        message: message
      });
    });
    return React.DOM.ul({
      className: 'list-group messages'
    }, messages);
  }
});

var Chat = React.createClass({
  getInitialState: function() {
    return {
      messages: [],
      newMessage: ''
    };
  },
  send: function(e) {
    if (e.keyCode !== 13 || e.target.value === "") {
      return;
    }

    // Append new message
    var newMessage = this.props.name + ": " + e.target.value;
    this.state.messages.push(newMessage);

    // Clear the input
    this.refs.messageForm.getDOMNode().value = '';

    return this.setState({
      messages: this.state.messages
    });
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

window.onload = function() {
  var name = prompt("Please enter your name");
  React.renderComponent(Chat({
    name: name
  }), document.getElementById('chat'));
};
