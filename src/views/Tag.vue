<template lang="pug">
#tag
  .header-banner
    h3 # {{$route.params.tag}} #
    .desc 共{{total_count}}篇文章
  .main-content
    .container
      .article-list
        item(v-for="post in posts", :key="post.id", :post="post")
        .tac
          a.load-more(@click="fetch", :class="{'loading-in': loading, 'no-more': nomore}")
            .loading-article
            span 加载更多
      .article-sidebar
        hotnews(v-once)
</template>

<script>
import Item from './posts/Item.vue'
import Hotnews from './posts/Hotnews.vue'
import api from 'store/api'

export default {
  components: { Item, Hotnews },
  data () {
    return {
      page: 0,
      loading: true,
      nomore: false,
      total_count: 0,
      posts: []
    }
  },
  meta () {
    return {
      title: "热门标签"
    }
  },
  methods: {
    fetch () {
      this.loading = true;
      this.page += 1;
      api.get(`posts/by-tag/${encodeURIComponent(this.$route.params.tag)}?page=${this.page}`).then((result) => {
        if (result.data.meta.total_count < 1) {
          location.href = '/404.html'
        } else {
          this.total_count = result.data.meta.total_count
          this.posts = this.posts.concat(result.data.posts)
          this.loading = false
          window.ga('send', 'event', {
            eventCategory: 'Tag',
            eventAction: 'loadmore',
            eventLabel: '加载更多',
          });
          if (result.data.meta.total_pages <= this.page) this.nomore = true
        }
      }).catch((err) => {
        this.$message.error(err.toString())
      })
    },
  },

  beforeMount () {
    document.title = this.$route.params.tag + ' | 极客公园'
    this.fetch()
  }
}

</script>

<style lang="stylus" scoped>

.header-banner
  background url('//imgslim.geekpark.net/image/newgeekpark/column_bg.jpg') center center no-repeat
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
    letter-spacing 0
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
