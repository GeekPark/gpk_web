// import 'assets/css/theme/index.css'
import Vue        from 'vue'
import Vuex       from 'vuex'

import App        from './App'
/* eslint-disable no-new */
import router       from './routers.js'
import store        from 'stores'
import Element      from 'element-ui'
import Vheader      from 'components/Vheader.vue'
import Vfooter      from 'components/Vfooter.vue'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(Element)
Vue.component(Vheader.name,      Vheader)
Vue.component(Vfooter.name,      Vfooter)

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


