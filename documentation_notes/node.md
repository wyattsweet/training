# [Node](https://nodejs.org/en/docs/)

## Events

Much of the core Node api is built around a specific, event-driven architecture in which specific objects called emitters periodically emit named events which cause Function objects, known as listeners to be called.

`fs.ReadStream` emits an event when the file is opened. a stream emits an event whenever data is available to be read.

All objects that emit events are instances of `EventEmitter`. When the `EventEmitter` object emits an event, all of the functions attached to that specific event are called synchronously. Any values returned by the called listeners are ignored.

This simple example from the docs shows a instance of `EventEmitter`, registering a listener using `.on`, and the event being triggered with `eventEmitter.emit()`

```js
import EventEmitter from 'events'

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter()
  myEmitter.on('event', () => {
    console.log('an event happened!!')
  })
  myEmitter.emit('event')
```

