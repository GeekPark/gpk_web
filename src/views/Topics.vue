<template lang="pug">
#topics
  .header-banner(:style="{backgroundImage: 'url(' + bg + ')'}")
    template(v-if="!topic.title_visible")
      h3 # {{topic.title}} #
      .desc 共{{topic.post_count}}篇文章
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
      topic: {},
      posts: [],
      bg: ''
    }
  },
  meta () {
    return {
      title: "专题精选"
    }
  },
  methods: {
    fetch () {
      this.loading = true
      this.page += 1
      api.get(`topics/${this.$route.params.id}?page=${this.page}`).then((result) => {
        let data = result.data.topic
        this.topic = data
        this.posts = this.posts.concat(data.posts)
        document.title = data.title + ' | 极客公园'
        if (!data.posts.length || (data.posts.length === data.post_count)) this.nomore = true
        this.loading = false
        if (this.$device.isMobile()) {
          this.bg = data.app_banner_url
        } else {
          this.bg = data.banner_url
        }
      }).catch((err) => {
        this.$message.error(err.toString())
      })
    },
  },

  beforeMount () {
    this.fetch()
  }
}

</script>

<style lang="stylus" scoped>
.header-banner
  background #666 url('//imgslim.geekpark.net/image/newgeekpark/column_bg.jpg') center center no-repeat
  background-size auto 100%
  color #fff
  display flex
  align-items center
  justify-content center
  flex-direction column
  padding 0
  height 225px
  h3
    margin 10px 0 20px
    font-size 50px
    font-weight 300
    letter-spacing 0
    text-indent 0.25em
  .desc
    font-size 14px
    font-weight 300
    letter-spacing 0
    padding 0 60px
    line-height 1.5
  @media screen and (max-width: 767px)
    height 64vw
    h3
      font-size 40px
      letter-spacing 0
      text-indent 0
    .desc
      letter-spacing 0
</style>
