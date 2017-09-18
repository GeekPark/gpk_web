import {
  fetchUser,
  fetchItems,
  fetchIdsByType,
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
    console.log('access_key', state.access_key)
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
  },

  // ensure data for rendering given list type
  FETCH_LIST_DATA: ({ commit, dispatch, state }, { type }) => {
    commit('SET_ACTIVE_TYPE', { type })
    return fetchIdsByType(type)
      .then(ids => commit('SET_LIST', { type, ids }))
      .then(() => dispatch('ENSURE_ACTIVE_ITEMS'))
  },

  // ensure all active items are fetched
  ENSURE_ACTIVE_ITEMS: ({ dispatch, getters }) => {
    return dispatch('FETCH_ITEMS', {
      ids: getters.activeIds
    })
  },

  FETCH_ITEMS: ({ commit, state }, { ids }) => {
    // on the client, the store itself serves as a cache.
    // only fetch items that we do not already have, or has expired (3 minutes)
    const now = Date.now()
    ids = ids.filter(id => {
      const item = state.items[id]
      if (!item) {
        return true
      }
      if (now - item.__lastUpdated > 1000 * 60 * 3) {
        return true
      }
      return false
    })
    if (ids.length) {
      return fetchItems(ids).then(items => commit('SET_ITEMS', { items }))
    } else {
      return Promise.resolve()
    }
  },

  FETCH_USER: ({ commit, state }, { id }) => {
    return state.users[id]
      ? Promise.resolve(state.users[id])
      : fetchUser(id).then(user => commit('SET_USER', { id, user }))
  }
}
