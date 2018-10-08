<template lang="pug">
.hot-news
  h3 七日热门
  article.news-item(v-for='post, index in posts' :key='post.id' data-track-category="hot-news" data-track-item="a")
    a(:href="`/news/${post.id}`", :target="$store.state.target")
      .news-cover
        span {{index + 1}}
        img(:src="`${post.cover_url}?imageView2/1/w/482/h/300/interlace/1/`")
      p.multiline-text-overflow {{post.title}}
</template>

<script>
import api from 'store/api'

export default {
  data () {
    return {
      loading: true,
      posts: [],
    }
  },
  methods: {
    fetch () {
      this.loading = true;
      api.get(`posts/hot_in_week?per=7`).then((result) => {
        this.posts = result.data.posts;
        this.loading = false;
      }).catch((err) => {
        console.log(err);
        // this.$message.error(err.toString())
      })
    },
  },
  beforeMount () {
    this.fetch()
  }
}
</script>

<style lang="stylus" scoped>
.hot-news
  border 1px solid #E4E4E4
  padding 15px
  margin-bottom 50px
  h3
    font-size 22px
    margin 0
  .news-item
    margin 20px 0
    .news-cover
      border 1px solid #F1F1F1
      position relative
      span
        position absolute
        left 0px
        top 0px
        width 28px
        height 28px
        line-height 28px
        background #000
        color #fff
        text-align center
      img
        width 100%
        height 150px
    p
      margin 5px 0
      line-height 22px
      text-overflow ellipsis
      display -webkit-box
      -webkit-line-clamp 2
      -webkit-box-orient vertical
      overflow hidden
</style>

