var React = require('../../vendor/react/react');

module.exports = React.createClass({
  render: function() {
    return React.DOM.li({
      className: 'list-group-item'
    }, this.props.message);
  }
});
