var EventEmitter = require ('../../vendor/eventEmitter/EventEmitter');

var Session = function(apiKey, sessionId) {
  this.apiKey = apiKey;
  this.sessionId = sessionId;
};

Session.prototype = Object.create(EventEmitter.prototype);
Session.prototype.init = function(token) {
  var self = this;
  this.session = OT.initSession(this.apiKey, this.sessionId);
  this.session.on('signal', function(event) {
    if(event.type === 'signal:message') {
      self.emitEvent('message', [event.data]);
    }
  });
  this.session.connect(token, function(event) {
    self.emitEvent('connected');
  });
};
Session.prototype.message = function(data) {
  this.session.signal({
    type: 'message',
    data: data
  });
};

module.exports = Session;
