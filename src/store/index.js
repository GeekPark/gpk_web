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
      qiniu: (name) => {
        return `'http://ovsnhdoi9.bkt.clouddn.com/image/newgeekpark/${name}`
      },
      homepage: {
        homepage_posts: []
      },
      column: {
        column: {
          posts: []
        }
      },
      news: {
        post: []
      }
    },
    mutations,
    actions
  })
}
