import Vue             from 'vue'
import VueRouter       from 'vue-router'
import config          from '../config.js'

import Home            from '../views/Home.vue'
import News            from '../views/News.vue'
import Newsflash       from '../views/Newsflash.vue'
import Detail          from '../views/Detail.vue'
import Column          from '../views/Column.vue'
import Topics          from '../views/Topics.vue'
import Tag             from '../views/Tag.vue'
import Author          from '../views/Author.vue'
import Liked           from '../views/Liked.vue'

import About           from '../views/About.vue'
import Report          from '../views/Report.vue'

Vue.use(VueRouter)

export function createRouter () {
  return new VueRouter({
    mode: 'history',
    routes: [
      { path: '/',
        name: 'index',
        component: Home
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
      // { path: '/breakingnews',
      //   name: 'breakingnews',
      //   component: Newsflash
      // },
      // { path: '/breakingnews/:id',
      //   name: 'detail',
      //   component: Detail
      // },
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
        component: Liked
      },
      { path: '/about',
        name: 'about',
        component: About
      },
      { path: '/report',
        name: 'report',
        component: Report
      }
    ]
  })
}
