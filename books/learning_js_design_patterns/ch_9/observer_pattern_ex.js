const pubSub = {}
;(function(q) {
  const topics = {}
  let subUid = -1

  q.publish = function(topic, args) {
    if (!topics[topic].length) {
      throw new Error('topic not found')
    }
    const subscribers = topics[topic]
    let len = subscribers ? subscribers.length : 0

    while (len--) {
      subscribers[len].func(topic, args)
    }
    return this
  }

  q.subscribe = function(topic, func) {
    if (!topics[topic]) {
      topics[topic] = []
    }

    let token = (++subUid).toString()
    topics[topic].push({
      token: token,
      func: func
    })
    console.log(topics)
    return token
  }

  q.unsubscribe = function(token) {
    for (let m in topics) {
      if (topics[m]) {
        for (let i = 0; i < topics[m].length; i++) {
          if (topics[m][i].token === token) {
            topics[m].splice(i, 1)
            return token
          }
        }
      }
    }
  }
})(pubSub)

const testHandler = (topics, data) => {
  console.log(`${topics}: ${data}`)
}

const testSubscription = pubSub.subscribe('example1', testHandler) // gets set to the token
pubSub.publish('example1', 'hello world') // example1: hello world
pubSub.publish('example1', ['test', 'a', 'b', 'c']) // example1: test,a,b,c
pubSub.unsubscribe(testSubscription) // unsubscribed from the event
pubSub.publish('example1', 'hello?') // this will unleash an error
