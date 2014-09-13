var React = require('../vendor/react/react');
var Chat = require('./components/chat');
var Session = require('./libs/session');

// var API_KEY = 'YOUR OPENTOK API KEY';
// var SESSION_ID = 'YOUR OPENTOK SESSION ID';
// var TOKEN = 'YOUR OPENTOK TOKEN FOR SESSION';

var API_KEY = '44925552';
var SESSION_ID = '1_MX40NDkyNTU1Mn5-U2F0IEF1ZyAwMiAwMzowOTowOSBQRFQgMjAxNH4wLjQ0OTc1MjMzfn4';
var TOKEN = 'T1==cGFydG5lcl9pZD00NDkyNTU1MiZzaWc9MDJmZTA3Njk4MGJkNzViOTBkZjk2MzZjYmUxMjIyMjg1NDM0NGE4Njpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTFfTVg0ME5Ea3lOVFUxTW41LVUyRjBJRUYxWnlBd01pQXdNem93T1Rvd09TQlFSRlFnTWpBeE5INHdMalEwT1RjMU1qTXpmbjQmY3JlYXRlX3RpbWU9MTQwNjk3NDE1MiZub25jZT0wLjkwNDUzMjUyNjIwMTIyOTEmZXhwaXJlX3RpbWU9MTQwOTU2NjA3OA==';

window.app = (function() {
  var name = prompt("Please enter your name");
  var session = new Session(API_KEY, SESSION_ID);

  session.addListener('connected', function() {
    React.renderComponent(Chat({
      name: name,
      session: session
    }), document.getElementById('chat'));
  });

  session.init(TOKEN);
})();
