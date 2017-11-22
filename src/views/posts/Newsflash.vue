<template lang="pug">
.news-flash
  h3 极客快讯
  ul
    li.news-item(v-for="post in posts", :key="post.id", :class="{'active': post.display}")
      .title(@click='unwind(post)') {{post.title}}
      .summary {{post.summary}}
      .time {{post.published_at | fromNow}}
  a.more(href="/newsflash", :target="$store.state.target") 加载更多
</template>

<script>
import api from 'store/api'

export default {
  data () {
    return {
      loading: true,
      posts: [],
      active: ''
    }
  },
  methods: {
    fetch () {
      this.loading = true;
      api.get(`news?per=5`).then((result) => {
        this.posts = result.data.news.map(el => {
          el.display = false
          return el
        })
        this.loading = false;
      }).catch((err) => {
        console.log(err);
        // this.$message.error(err.toString())
      })
    },
    unwind (post) {
      post.display = !post.display
    }
  },
  beforeMount () {
    this.fetch()
  }
}
</script>

<style lang="stylus" scoped>
.news-flash
  border 1px solid #E4E4E4
  padding 15px 15px 0
  margin-bottom 50px
  h3
    font-size 22px
    margin 0
  ul
    padding 0
  .news-item
    margin 15px 0 15px 15px
    clear both
    line-height 1.5
    color rgba(0, 0, 0, .8)
    font-size 12px
    .title
      font-size 14px
      cursor pointer
    .summary
      color rgba(0, 0, 0, .6)
      margin .5em 0
      max-height 0
      overflow hidden
      transition all .1s
    .time
      color rgba(0, 0, 0, .3)
    &.active
      .summary
        max-height 500px
        transition all .4s
  .more
    text-align center
    border-top 1px solid #E4E4E4
    margin 0 -15px
    line-height 2.5
    display block
    color rgba(0, 0, 0, .6)

</style>
