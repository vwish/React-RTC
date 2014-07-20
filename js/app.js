var EventEmitter = EventEmitter || {};
var React = React || {};

var MessageCollection = function(messages) {
  this.messages = messages || [];
};

// Attach Emitter to MessageCollection
MessageCollection.prototype = Object.create(EventEmitter.prototype);

MessageCollection.prototype.add = function(message) {
  this.messages.push(message);
  this.emit('change');
};

MessageCollection.prototype.getAll = function() {
  return this.messages;
};

var Message = React.createClass({
  render: function() {
    return React.DOM.li({
      className: 'list-group-item'
    }, this.props.message);
  }
});

var MessageList = React.createClass({
  componentDidMount: function() {
    this.props.messages.on('change', this.refresh);
  },
  componentDidUpdate: function() {
    // Scroll message list to the bottom
    this.getDOMNode().scrollTop = this.getDOMNode().scrollHeight;
  },
  componentWillUnmount: function() {
    this.props.messages.off('change', this.refresh);
  },
  refresh: function() {
    this.forceUpdate();
  },
  render: function() {
    var messages = this.props.messages.getAll().map(function(message, i) {
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
      newMessage: ''
    };
  },
  send: function(e) {
    if (e.keyCode !== 13 || e.target.value === "") {
      return;
    }
    this.props.messages.add(e.target.value);
    this.refs.newMessage.getDOMNode().value = '';
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
      ref: 'newMessage',
      type: 'text'
    });
  },
  messageList: function() {
    return MessageList({
      messages: this.props.messages
    });
  }
});

var messages = new MessageCollection();

window.onload = function() {
  React.renderComponent(Chat({
    messages: messages
  }), document.getElementById('chat'));
};
