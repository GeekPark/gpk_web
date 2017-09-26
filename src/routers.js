import Vue             from 'vue'
import VueRouter       from 'vue-router'
import config          from './config.js'

import Index           from 'views/Index.vue'
import News            from 'views/News.vue'
import Column          from 'views/Column.vue'
import Topics          from 'views/Topics.vue'
import Tag             from 'views/Tag.vue'
import Author          from 'views/Author.vue'
import Liked           from 'views/Liked.vue'

import About           from 'views/About.vue'
import Report          from 'views/Report.vue'
import Errors          from 'views/Errors.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/',
      name: 'index',
      component: Index,
      meta: {title: '极客公园-只为商业新变量'}
    },
    { path: '/news/:id',
      name: 'news',
      component: News
    },
    { path: '/topics/:id',
      redirect: '/news/:id'
    },
    { path: '/column/:id',
      name: 'column',
      component: Column
    },
    { path: '/topic/:id',
      name: 'topics',
      component: Topics
    },
    { path: '/tags/:tag',
      name: 'tags',
      component: Tag
    },
    { path: '/users/:id',
      name: 'author',
      component: Author
    },
    { path: '/liked',
      name: 'liked',
      component: Liked,
      meta: {title: '我的喜欢 | 极客公园'}
    },
    { path: '/about',
      name: 'about',
      component: About,
      meta: {title: '关于极客公园'}
    },
    { path: '/report',
      name: 'report',
      component: Report,
      meta: {title: '求报道'}
    },
    { path: '*',
      component: Errors,
      meta: {title: 'Error'}
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (window.ga) {
    window.ga('set', 'page', to.fullPath);
    window.ga('send', 'pageview');
  }
  (function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https'){
     bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else{
      bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
  })();
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
