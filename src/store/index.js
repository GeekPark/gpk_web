import Vuex      from 'vuex'
import Vue       from 'vue'
import mutations from './mutations'
import actions   from './actions'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      isLoading: false,
      access_key: null,
      target: '',
      userInfo: null,
      homepage: {
        homepage_posts_f: [],
        homepage_posts: []
      },
      ads: [],
      column: {
        column: {
          posts: []
        }
      },
      news: {
        post: []
      },
      post: {}
    },
    getters: {
      getAccessKey: state => () => state.access_key
    },
    mutations,
    actions
  })
}
