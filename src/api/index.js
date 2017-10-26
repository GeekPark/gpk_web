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


function fetch (child) {
  return new Promise((resolve, reject) => {
    api.$get(api.url + child).then(res => {
      resolve(res)
    }).catch(reject)
  })
}


export function fetchAccessKey () {
  return new Promise((resolve, reject) => {
    api.$get(`${accountApi}my/access_key`).then(res => {
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
  return fetch(`posts/${id}/preview?key=${key}`)
}

export function fetchColumn (id, page) {
  return fetch(`columns/${id}?page=${page}`)
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
