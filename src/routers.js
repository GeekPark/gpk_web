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
      component: News,
      meta: {title: '文章详情'}
    },
    { path: '/topics/:id',
      redirect: '/news/:id'
    },
    { path: '/column/:id',
      name: 'column',
      component: Column,
      meta: {title: '栏目页'}
    },
    { path: '/topic/:id',
      name: 'topics',
      component: Topics,
      meta: {title: '专题页'}
    },
    { path: '/tags/:tag',
      name: 'tags',
      component: Tag,
      meta: {title: '标签页'}
    },
    { path: '/users/:id',
      name: 'author',
      component: Author,
      meta: {title: '作者主页'}
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
  document.title = to.meta.title
  next()
  
  // let token = localStorage.getItem('token')
	// if(to.meta.requireAuth) {
	// 	if(token) {
	// 		next()
	// 	} else {
	// 		next({
	// 			path: '/login',
	// 			query: { redirect: to.fullPath }
	// 		})
	// 	}
	// } else {
	// 	next()
	// }
})

export default router
