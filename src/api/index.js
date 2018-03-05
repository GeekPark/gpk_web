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

export function fetchAd() {
  return fetch(`ads`)
}

export function fetchHome (page) {
  return new Promise((resolve, reject) => {
    api.$get(`${config.host}v2?page=${page}`).then(res => {
      resolve(res)
    }).catch(reject)
  })
  // return fetch(`?page=${page}`)
}

export function fetchBreakingNews (id) {
  return fetch(`news/${id}`)
}

export function fetchNews (id) {
  return fetch(`posts/${id}`)
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
