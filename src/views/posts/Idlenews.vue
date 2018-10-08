<template lang="pug">
.idle-news
  h3 行业资讯
  article.news-item(v-for="post in posts.slice(0, 5)" :key="post.id" data-track-category="idle-news" data-track-item="a")
    a(:href="`/news/${post.id}`", :target="$store.state.target")
      .img-wrapper
        .img-cover
          img(:src="`${post.cover_url}?imageView2/1/w/490/h/300/interlace/1/`")
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
      api.get(`columns/2?per=5`).then((result) => {
        this.posts = result.data.column.posts;
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
.idle-news
  border 1px solid #E4E4E4
  padding 15px
  margin-bottom 50px
  h3
    font-size 22px
    margin 0
  .news-item
    margin 15px 0
    clear both
    height 70px
    .img-wrapper
      width 70px
    .img-cover
      width 100%
      height 0
      padding-bottom 100%
      background-color #c3c3c3
      border 1px solid #efefef
      position relative
      overflow hidden
      img
        position absolute
        top 50%
        left 50%
        transform translate3d(-50%, -50%, 0)
        height 100%
        width auto
        min-width 100%
    p
      margin -70px 0 0 80px
      line-height 1.5
      &.multiline-text-overflow
        -webkit-line-clamp 3
</style>
