

J'ai un broker et des observers (qui utilisent le broker)

```javascript
const EventEmitter = require('events').EventEmitter;

class Broker extends EventEmitter { }

class Observer {
  constructor(broker) {
    this.broker = broker;
  }
  on(message, work) { this.broker.on(message, work); }
  emit(message, data) { this.broker.emit(message, data); }
}

module.exports = {
    Observer: Observer
  , Broker: Broker
};
```

j'ai une application express qui "écoute" sur "/ci"
à chaque fois qu'il y a un event GitHub elle emet sur le channel "ci_event"
