import LRU from 'lru-cache'
// import Axios from 'axios'
import fetch from 'node-fetch'

export function createAPI ({ config, version }) {
  let api
  // this piece of code may run multiple times in development mode,
  // so we attach the instantiated API to `process` to avoid duplications
  if (process.__API__) {
    api = process.__API__
  } else {
    api = {
      // url: 'https://hacker-news.firebaseio.com/v0/',
      url: `${config.url}v1/`,
      onServer: true,
      cachedItems: LRU({
        max: 1000,
        maxAge: 1000 * 60 * 15
      }),
      '$get': function (url) {
        return fetch(url).then(res => res.json())
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
