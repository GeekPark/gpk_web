// import 'assets/css/theme/index.css'
import Vue        from 'vue'
import Vuex       from 'vuex'

import App        from './App'
/* eslint-disable no-new */
import router       from './routers.js'
import store        from 'stores'
import Element      from 'element-ui'
import VueLazyload  from 'vue-lazyload'
import * as filters from './util/filters'
import Device from './util/device.js'

import Vheader      from 'components/Vheader.vue'
import Vfooter      from 'components/Vfooter.vue'
import Feedback     from 'components/Feedback.vue'

Vue.use(Element)
Vue.use(VueLazyload, {
  preLoad: 1.33333,
  attempt: 1,
  filter: {
    progressive (listener, options) {
      const f = options.supportWebp ? '/format/webp' : ''
      const w = listener.el.getAttribute("w") || 0
      const h = listener.el.getAttribute("h") || 0
      listener.el.setAttribute('srcset', `${listener.src}?imageView2/1/w/${w * 2}/h/${h * 2}${f}/ignore-error/1/ 2x`)
      listener.src += `?imageView2/2/w/${w}/h/${h}${f}/ignore-error/1`
    }
  }
})
Vue.use(Device)
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.component(Vheader.name,      Vheader)
Vue.component(Vfooter.name,      Vfooter)
Vue.component(Feedback.name,      Feedback)

// Vue.directive('title', {
//   inserted: function (el, binding) {
//     document.title = el.dataset.title
//   }
// })

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})


