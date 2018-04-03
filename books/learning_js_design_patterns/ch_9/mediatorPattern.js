const mediator = (function() {
  // storage for topics/events
  const channels = {}

  const subscribe = function(channel, fn) {
    if (!channels[channel]) {
      channels[channel] = []
    }
    channels[channel].push({context: this, callback: fn})
    return this
  }

  const publish = function(channel) {
    if (!channels[channel].length) {
      return false
    }
    const args = Array.prototype.slice.call(arguments, 1)
    for (let i = 0; i < channels[channel].length; i++) {
      const subscription = channels[channel][i]
      subscription.callback.apply(subscription.context, args)
    }
    return this
  }

  return {
    publish,
    subscribe,
    installTo: function(obj) {
      obj.subscribe = subscribe
      obj.publish = publish
    }
  }
})()
;(function(m) {
  // default value for person
  let person = 'Luke'
  m.subscribe('nameChange', function(arg) {
    console.log(person)
    person = arg
    console.log(person)
  })
  m.publish('nameChange', 'David')
})(mediator)
