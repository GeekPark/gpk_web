import {
  fetchAccessKey,
  fetchHome,
  fetchNews,
  fetchPreview,
  fetchColumn,
  fetchTopics,
  fetchTag,
  fetchAuthor
} from '../api'

export default {

  FETCH_ACCESSKEY: ({ commit, state }) => {
    return fetchAccessKey()
      .then(data => commit('SET_ACCESSKEY', { data }))
  },

  FETCH_HOME: ({ commit, state }, { page }) => {
    return fetchHome(page)
      .then(data => commit('SET_HOME', { data }))
  },

  FETCH_NEWS: ({ commit, state }, { id }) => {
    return fetchNews(id, state.access_key)
      .then(data => commit('SET_NEWS', { data }))
  },

  FETCH_PREVIEW: ({ commit, state }, { id, key }) => {
    return fetchPreview(id, key)
      .then(data => commit('SET_PREVIEW', { data }))
  },

  FETCH_COLUMN: ({ commit, state }, { id, page }) => {
    return fetchColumn(id, page)
      .then(data => {
        commit('SET_COLUMN', { data })
      })
  },

  FETCH_TOPICS: ({ commit, state }, { id }) => {
    return fetchTopics(id)
      .then(data => {
        commit('SET_TOPICS', { data })
      })
  },

  FETCH_TAG: ({ commit, state }, { page }) => {
    return fetchTag(page)
      .then(data => {
        commit('SET_TAG', { data })
      })
  },

  FETCH_AUTHOR: ({ commit, state }, { id, page }) => {
    return fetchAuthor(id, page)
      .then(data => commit('SET_AUTHOR', { data }))
  }
}
