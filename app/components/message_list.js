var React = require('../../vendor/react/react');
var Message = require('./message');

module.exports = React.createClass({
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
