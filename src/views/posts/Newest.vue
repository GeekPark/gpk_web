<template lang="jade">
.related-news
  h4
    i.iconfont.icon-double-slash
    | 最新文章
  article.news-item(v-for='post, index in posts', :key='post.id')
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
      posts: [],
    }
  },
  methods: {
    fetch () {
      this.loading = true;
      api.get(`posts?per=4`).then((result) => {
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
.related-news
  margin-top 50px
  h4
    font-size 12px
    margin 0
    margin-bottom 20px
  .news-item
    display inline-block
    vertical-align top
    width 158px
    margin-left 20px
    &:first-of-type
      margin-left 0
    .news-cover
      border 1px solid #F1F1F1
      position relative
      overflow hidden
      img
        height 100px
        vertical-align bottom
    p
      margin 5px 0
      line-height 1.5
</style>

