<template lang="pug">
#column
  subnav
  .header-banner
    h3 {{column.title}}
    .desc {{column.description}}
  .main-content
    .container
      .article-list
        item(v-for="post in posts", :key="`column-${post.id}`", :post="post", :columnTitle="column.title", :columnId="column.id")
        .tac(v-if="!nomore")
          a.load-more(@click="fetch", :class="{'loading-in': loading}")
            .loading-article
            span 加载更多
        .tac(v-else) 没有更多内容了
      .article-sidebar
        hotnews(v-once)
</template>

<script>
import Subnav from '../components/Vsubnav.vue'
import Item from './posts/Item.vue'
import Hotnews from './posts/Hotnews.vue'
import api from 'store/api'

let page = 1

export default {
  components: { Subnav, Item, Hotnews },
  title () {
    return this.column.title
  },
  data () {
    return {
      loading: false,
      posts: [],
      nomore: false
    }
  },
  asyncData ({ store, route: { params: { id } } }) {
    return store.dispatch('FETCH_COLUMN', { id, page })
  },
  computed: {
    column () {
      this.posts = this.$store.state.column.column.posts
      return this.$store.state.column.column
    }
  },

  methods: {
    fetch () {
      this.loading = true
      page += 1
      api.get(`columns/${this.$route.params.id}?page=${page}`).then((result) => {
        this.nomore = !result.data.column.posts.length
        this.posts = this.posts.concat(result.data.column.posts)
        this.loading = false
      }).catch((err) => {
        this.$message.error(err.toString())
      })
    },
  }
}

</script>

<style lang="stylus">
#column
  .sub-nav
    margin-bottom 0
.header-banner
  background url('http://imgslim.geekpark.net/image/newgeekpark/column_bg.jpg') center center no-repeat
  background-size cover
  color #fff
  text-align center
  padding 20px 0
  height 180px
  h3
    margin 40px 0 40px
    font-size 50px
    font-weight 300
    letter-spacing .5em
    text-indent 0.25em
  .desc
    font-size 14px
    font-weight 300
    letter-spacing .5em
    padding 0 60px
    line-height 1.5
  @media screen and (max-width: 767px)
    h3
      font-size 40px
      letter-spacing 0
      text-indent 0
    .desc
      letter-spacing 0

</style>
