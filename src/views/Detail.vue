<template lang="pug">
.main-content
  .container
    .article-list
      .flash-item
        .title {{post.title}}
        .summary {{post.summary}}
        .meta
          a.link(:href="`${post.source_link}`", :target="$store.state.target") 阅读原文
          .date {{post.published_at | fromNow}}
    .article-sidebar
      hotnews(v-once)
</template>

<script>
import Hotnews from './posts/Hotnews.vue'
import api from 'store/api'

export default {
  components: { Hotnews },
  data () {
    return {
      loading: true,
      nomore: false,
      post: {}
    }
  },
  meta () {
    return {
      title: "专题精选"
    }
  },
  methods: {
    fetch () {
      this.loading = true;
      api.get(`news/${this.$route.params.id}`).then((result) => {
        this.post = result.data.new
        this.loading = false
      }).catch((err) => {
        this.$message.error(err.toString())
      })
    },
  },

  beforeMount () {
    this.fetch()
    document.title = '极客快讯 | 极客公园'
  }
}

</script>

<style lang="stylus" scoped>
.flash-item
  margin 15px 0 55px 15px
  clear both
  line-height 1.5
  color rgba(0, 0, 0, .8)
  font-size 14px
  .title
    font-size 18px
    font-weight bold
    margin-bottom .8em
  .summary
    color rgba(0, 0, 0, .6)
    margin .5em 0
    transition all .4s
  .meta
    .time
      color #000
    .link
      float right
      color #0185F2

</style>
