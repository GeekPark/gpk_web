<template lang="pug">
#liked
  .header-banner
    h3 我的喜欢
    .desc 共{{total_count}}篇文章
  .main-content
    .container(style="text-align: center")
      .article-list(v-if="total_count > 0")
        item(v-for="post in posts", :key="post.id", :post="post")
        .tac(v-if="!end")
          a.load-more(@click="fetch", :class="{'loading-in': loading, 'no-more': nomore}")
            .loading-article
            span 加载更多
      p(style="text-align:center; padding: 50px 0", v-else)
        | 您还没有喜欢的文章
</template>

<script>
import Item from './posts/Item.vue'
import api from 'store/api'

let access_key

export default {
  components: { Item },
  data () {
    return {
      page: 0,
      loading: true,
      nomore: false,
      total_count: 0,
      posts: [],
    }
  },
  meta () {
    return {
      title: "我的喜欢"
    }
  },
  methods: {
    fetch () {
      this.loading = true;
      this.page += 1;
      api.get(`posts/favorite_posts?access_key=${access_key}&page=${this.page}`).then((result) => {
        this.total_count = result.data.meta.total_count
        if (result.data.posts) this.posts = this.posts.concat(result.data.posts)
        this.loading = false
        if (result.data.meta.total_pages <= this.page) this.nomore = true
      }).catch((err) => {
        this.$message.error(err.toString())
      })
    },
  },

  mounted () {
    access_key = this.$store.state.access_key || localStorage.getItem('access_key')
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
