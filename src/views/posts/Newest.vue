<template lang="jade">
.more-news
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

<style lang="stylus">
.more-news
  margin-top 50px
  h4
    font-size 12px
    margin 0
    margin-bottom 20px
  .news-item
    display inline-block
    vertical-align top
    width 24%
    margin-left: 1.3%;
    &:first-of-type
      margin-left 0
    .news-cover
      border 1px solid #F1F1F1
      position relative
      width 100%
      height 0
      padding-bottom 64%
      overflow hidden
      img
        position absolute
        top 50%
        left 50%
        transform translate3d(-50%, -50%, 0)
        height 100%
    p
      margin 5px 0
      line-height 1.5
  @media screen and (max-width: 767px)
    .news-item
      width 50%
      margin-left 0
      margin-top 10px
      padding-right 15px
      box-sizing border-box
      .multiline-text-overflow
        -webkit-line-clamp 2
  
  @media screen and (max-width: 540px)
    .news-item
      width 50%
</style>

