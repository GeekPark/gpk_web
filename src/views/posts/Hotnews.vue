<template lang="jade">
.hot-news
  h3 七日热门
  article.news-item(v-for='post, index in posts', :key='post.id')
    a(:href="`/news/${post.id}`", target="_blank")
      .news-cover
        span {{index + 1}}
        img(alt="", :src="post.cover_url")
      p.multiline-text-overflow {{post.abstract}}
</template>

<script>
import api from 'stores/api'

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
        console.log(result);
        this.posts = result.data.posts;
        this.loading = false;
      }).catch((err) => {
        console.log(err);
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
.hot-news
  border 1px solid #ccc
  padding 20px
  margin 25px 0
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

