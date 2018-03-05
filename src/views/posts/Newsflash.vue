<template lang="pug">
.news-flash
  h3 极客严选
  ul(data-track-category="news-flash" data-track-item="li")
    li.news-item(v-for="post in posts" :key="post.id" :class="{'active': post.display}")
      img.icon(:src='`${post.icon}?imageView2/1/w/32/h/32/interlace/1/q/88/interlace/1/`')
      .title(@click='unwind(post)') {{post.edited_title}}
      .summary {{post.summary}}
      a.link(v-if="post.url" :href="`${post.url}`", :target="$store.state.target") 阅读原文
      .time {{post.updatedAt | fromNow}}
  a.more(href="/breakingnews", :target="$store.state.target") 查看更多
</template>

<script>
import axios from 'axios'

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
      axios.get(`https://apigo.holoread.news/api/v1/articles`).then((result) => {
        this.posts = result.data.data.slice(0, 5).map(el => {
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
    list-style-type none
    .icon
      position absolute
      top .2em
      left 0
      width 16px
      height 16px
  .news-item
    margin 15px 0
    padding-left 25px
    clear both
    line-height 1.5
    color rgba(0, 0, 0, .8)
    font-size 12px
    position relative
    .title
      font-size 14px
      cursor pointer
    .summary
      color rgba(0, 0, 0, .5)
      margin .5em 0
      max-height 0
      overflow hidden
      transition all .1s
    .time
      color rgba(0, 0, 0, .5)
    .link
      float right
      color #0185F2
      opacity 0
      height 0
      overflow hidden
      transition all .3s
    &.active
      .summary
        max-height 500px
        transition all .4s
      .link
        opacity 1
        height auto
  .more
    text-align center
    border-top 1px solid #E4E4E4
    margin 0 -15px
    line-height 2.5
    display block
    color rgba(0, 0, 0, .6)

</style>
