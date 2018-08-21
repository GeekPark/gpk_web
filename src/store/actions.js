import {
  fetchAccessKey,
  fetchAd,
  fetchHome,
  fetchBreakingNews,
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

  FETCH_AD: ({ commit, state }) => {
    return fetchAd()
      .then(data => commit('SET_AD', { data }))
  },

  FETCH_HOME: ({ commit, dispatch, state }, { page }) => {
    return fetchHome(page)
      .then(data => commit('SET_HOME', { data }))
      .then(() => dispatch('FETCH_AD'))
  },

  FETCH_BREAKINGNEWS: ({ commit, state }, { id }) => {
    return fetchBreakingNews(id)
      .then(data => commit('SET_BREAKINGNEWS', { data }))
      .catch(err => Promise.reject({ code: 404 }))
  },

  FETCH_NEWS: ({ commit, state }, { id }) => {
    return fetchNews(id)
      .then(data => commit('SET_NEWS', { data }))
      .catch(err => Promise.reject({ code: 404 }))
  },

  FETCH_PREVIEW: ({ commit, state }, { id, key }) => {
    return fetchPreview(id, key)
      .then(data => {
        if (data.message) {
          return Promise.reject({ url: `/news/${id}` })
        } else {
          commit('SET_PREVIEW', { data })
        }
      })
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
        if (data.posts.length < 1) {
          return Promise.reject({ code: 404 })
        } else {
          commit('SET_TAG', { data })
        }
      })
  },

  FETCH_AUTHOR: ({ commit, state }, { id, page }) => {
    return fetchAuthor(id, page)
      .then(data => commit('SET_AUTHOR', { data }))
  }
}
