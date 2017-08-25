<template lang="jade">
.next-news
  h4 →下一篇
  article.news-item
    a(:href="`/news/${post.id}`", target="_blank")
      .news-cover
        img(alt="", :src="post.cover_url")
      p.multiline-text-overflow {{post.title}}
</template>

<script>
import api from 'stores/api'

export default {
  data () {
    return {
      loading: true,
      post: {},
    }
  },
  methods: {
    fetch () {
      this.loading = true;
      api.get(`posts/${this.$route.params.id}/next`).then((result) => {
        console.log(result);
        this.post = result.data.post;
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
.next-news
  padding 20px
  padding-top 0
  margin-bottom 50px
  transition all .3s
  &:hover
    transform translateX(10px)
  h4
    font-size 12px
    color #0185F2
    margin 0
    margin-bottom 10px
  .news-item
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
        vertical-align bottom
    p
      margin 5px 0
      line-height 22px
      text-overflow ellipsis
      display -webkit-box
      -webkit-line-clamp 2
      -webkit-box-orient vertical
      overflow hidden
</style>

