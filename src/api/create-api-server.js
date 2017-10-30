import LRU from 'lru-cache'
import Axios from 'axios'
import fetch from 'node-fetch'
import config from '../config'
import client from './redis'
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
            Axios.get(url).then(res => {
              client.set(url, JSON.stringify(res.data), 'EX', 120)
              resolve(res.data)
            }).catch(reject)
          })
        })
      },
      '$post': function (url, data) {
        return Axios.post(url, data).then(res => Promise.resolve(res.data))
      }
    }
    process.__API__ = api
  }
  return api
}
