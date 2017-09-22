<template lang="jade">
.more-news
  h4
    i.iconfont.icon-double-slash
    | 最新文章
  .news-list
    article.news-item(v-for='post, index in posts', :key='post.id')
      .img-cover-wrap
        a(:href="`/news/${post.id}`", :target="$store.state.target")
          .news-cover
            img(v-lazy="post.cover_url" w=158 h=100)
      div
        a.category-tag(:href="`/column/${post.column.id}`", :target="$store.state.target") {{post.column.title}}
        a(:href="`/news/${post.id}`", :target="$store.state.target")
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
    .category-tag
      display none
    .img-cover-wrap
      border 1px solid #F1F1F1
      .news-cover
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
      width 100%
      display flex
      margin-left 0
      margin-top 10px
      padding-right 0px
      box-sizing border-box
      .img-cover-wrap
        flex-grow 0
        flex-shrink 0
        width 108px
        margin-right 10px
        .news-cover
          padding-bottom 75%
      .category-tag
        display inline-block
        line-height 2
        background-color #DCDCDC
        font-size 12px
        font-weight bold
        padding 0 5px
      .multiline-text-overflow
        flex 1
        -webkit-line-clamp 2
</style>

