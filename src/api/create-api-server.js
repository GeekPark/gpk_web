import LRU from 'lru-cache'
// import Axios from 'axios'
import fetch from 'node-fetch'
import config from '../config'
const redis = require('redis')
const client = redis.createClient(config.redis.port, config.redis.host)
console.log('connect:', config.redis.host, config.redis.port)
client.on('error', function (err) {
  console.log('Error ' + err)
})
client.on('ready', function (res) {
  console.log('client ready')
})
client.on('connect', function () {
  console.log('connect')
})
export function createAPI ({ config, version }) {
  let api
  // this piece of code may run multiple times in development mode,
  // so we attach the instantiated API to `process` to avoid duplications
  if (process.__API__) {
    api = process.__API__
  } else {

    api = {
      url: `${config.url}v1/`,
      onServer: true,
      '$get': function (url) {
        // return fetch(url).then(res => {
        //   return res.json()
        // })
        return new Promise((resolve, reject) => {
          client.get(url, function (err, reply) {
            // reply is null when the key is missing
            if (reply !== null) {
              // console.log('load cache')
              resolve(JSON.parse(reply))
              return
            }
            fetch(url).then(res => {
              const data = res.json()
              data.then(r => {
                client.set(url, JSON.stringify(r), 'EX', 120)
              })
              resolve(data)
            })
          })
        })
      },
      '$post': function (url, data) {
        return fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify(data)
        }).then(res => res.json())
      }
    }
    process.__API__ = api
  }
  return api
}
