<template lang="jade">
.idle-news
  h3 捕风捉影
  article.news-item
    ul
      li(v-for="post, index in posts.slice(0, 5)", :key="post.id")
        a(:href="`/news/${post.id}`", target="_blank") {{post.title}}
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
      api.get(`columns/2?per=5`).then((result) => {
        console.log(result);
        this.posts = result.data.column.posts;
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
.idle-news
  border 1px solid #E4E4E4
  padding 20px
  margin 50px 0
  h3
    font-size 20px
    font-weight 500
    margin 0
  .news-item
    margin 20px 0
    ul
      padding-left 1em
    li
      margin 15px 0
      line-height 22px
      a
        color #000
</style>
