import Vue from 'vue'

export default {
  SET_ACCESSKEY: (state, { data }) => {
    state.access_key = data.access_key
  },

  SET_HOME: (state, { data }) => {
    state.homepage = data
  },

  SET_NEWS: (state, { data }) => {
    state.news = data
  },

  SET_PREVIEW: (state, { data }) => {
    state.news = data
  },

  SET_COLUMN: (state, { data }) => {
    state.column = data
  },

  SET_TOPICS: (state, { data }) => {
    state.topics = data
  },

  SET_TAG: (state, { data }) => {
    state.tag = data
  },

  SET_AUTHOR: (state, { data }) => {
    state.author = data
  },

  SET_ACTIVE_TYPE: (state, { type }) => {
    state.activeType = type
  },


  SET_LIST: (state, { type, ids }) => {
    state.lists[type] = ids
  },

  SET_ITEMS: (state, { items }) => {
    items.forEach(item => {
      if (item) {
        Vue.set(state.items, item.id, item)
      }
    })
  },

  SET_USER: (state, { id, user }) => {
    Vue.set(state.users, id, user || false) /* false means user not found */
  }
}
