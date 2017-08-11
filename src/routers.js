import Vue             from 'vue'
import VueRouter       from 'vue-router'
import config          from './config.js'

import Index           from 'views/Index.vue'
import News            from 'views/News.vue'
import Column          from 'views/Column.vue'
import Tag             from 'views/Tag.vue'
import Author          from 'views/Author.vue'
import Comment         from 'views/Comment.vue'

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
      meta: {title: '首页'}
    },
    { path: '/news/:id',
      name: 'news',
      component: News,
      meta: {title: '文章详情'}
    },
    { path: '/column/:id',
      name: 'column',
      component: Column,
      meta: {title: '栏目页'}
    },
    { path: '/tag/:tag',
      name: 'tag',
      component: Tag,
      meta: {title: '标签页'}
    },
    { path: '/author/:id',
      name: 'author',
      component: Author,
      meta: {title: '作者页'}
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
    { path: '/comment',
      name: 'comment',
      component: Comment,
      meta: {title: '评论'}
    },
    { path: '*',
      component: Errors,
      meta: {title: 'Error'}
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  let token = localStorage.getItem('token')
	if(to.meta.requireAuth) {
		if(token) {
			next()
		} else {
			next({
				path: '/login',
				query: { redirect: to.fullPath }
			})
		}
	} else {
		next()
	}
})

export default router
