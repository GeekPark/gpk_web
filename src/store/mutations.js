import Vue from 'vue'

export default {
  SET_ACCESSKEY: (state, { data }) => {
    state.access_key = data.access_key
  },

  SET_HOME: (state, { data }) => {
    state.homepage = data
  },

  SET_AD: (state, { data }) => {
    state.ads = data
  },

  SET_BREAKINGNEWS: (state, { data }) => {
    state.breakingnews = data
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
  }
}
