// this is aliased in webpack config based on server/client build
import { createAPI } from 'create-api'
import config from '../config.js'

// import Axios from 'axios'

const logRequests = !!process.env.DEBUG_API

const api = createAPI({
  version: 'v1',
  config: {
    url: config.host
  }
})

const accountApi = config.account

// warm the front page cache every 15 min
// make sure to do this only once across all requests
if (api.onServer) {
  warmCache()
}

function warmCache () {
  setTimeout(warmCache, 1000 * 60 * 15)
}

function fetch (child) {
  logRequests && console.log(`fetching ${child}...`)
  const cache = api.cachedItems
  if (cache && cache.has(child)) {
    logRequests && console.log(`cache hit for ${child}.`)
    return Promise.resolve(cache.get(child))
  } else {
    return new Promise((resolve, reject) => {
      api.$get(api.url + child).then(res => {
        const val = res
        // mark the timestamp when this item is cached
        if (val) val.__lastUpdate = Date.now()
        cache && cache.set(child, val)
        logRequests && console.log(`fetched ${child}.`)
        resolve(val)
      }).catch(reject)
    })
  }
}


export function fetchAccessKey () {
  return new Promise((resolve, reject) => {
    api.$get(`${accountApi}my/access_key`).then(res => {
      console.log('fetchAccessKey', res)
      resolve(res)
    }).catch(reject)
  })
}

export function fetchHome (page) {
  return fetch(`?page=${page}`)
}

export function fetchNews (id, access_key) {
  return fetch(`posts/${id}?access_key=${access_key}`)
}

export function fetchPreview (id, key) {
  return fetch(`posts/${id}/preview?key==${key}`)
}

export function fetchColumn (id, page) {
  return fetch(`columns/${id}?page==${page}`)
}

export function fetchTopics (id, page) {
  return fetch(`?page=${page}`)
}

export function fetchTag (id, page) {
  return fetch(`?page=${page}`)
}

export function fetchAuthor (id, page) {
  return fetch(`posts/author/${id}?page=${page}`)
}

export function fetchIdsByType (type) {
    return api.cachedIds && api.cachedIds[type]
        ? Promise.resolve(api.cachedIds[type])
        : fetch(`${type}stories`)
}
export function fetchItem (id) {
    return fetch(`item/${id}`)
}

export function fetchItems (ids) {
    return Promise.all(ids.map(id => fetchItem(id)))
}
export function fetchPage (type, page) {
    return fetch(`${type}/${page}`)
}
export function fetchUser (id) {
    return fetch(`user/${id}`)
}

/**
* 监听数据变动(未使用firebase先使用定时刷新)
*/
export function watchList (type, cb) {
    let first = true
    let isOn = true
    let timeoutId = null
    const handler = res => {
        cb(res)
    }
    function watchTimeout () {
        if (first) {
            first = false
        } else {
            api.$get(`${api.url}${type}stories.json`).then(handler)
        }
        if (isOn) {
            timeoutId = setTimeout(watchTimeout, 1000 * 60 * 15)
        }
    }
    watchTimeout()
    return () => {
        isOn = false
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
    }
}
