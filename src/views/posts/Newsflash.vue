<template lang="pug">
.news-flash
  h3 全球快讯
  ul(data-track-category="news-flash" data-track-item="li")
    li.news-item(v-for="post in posts" :key="post.id" :class="{'active': post.display}")
      .icon
        img(:src="post.icon" @error="imgError")
        .time {{post.updatedAt | fromHours}}
      .title(@click='unwind(post)') {{post.edited_title}}
      .summary {{post.summary}}
      .footer
        a.link(v-if="post.url" :href="`${post.url}`", :target="$store.state.target") 阅读原文
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
      axios.get(`https://digestapit.geeks.vc/v1/articles`).then((result) => {
        this.posts = result.data.data.reverse().slice(0, 5).map(el => {
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
    },
    imgError (event) {
      let defaultIcon = "https://holoread-img.geekpark.net/app/icon/icon.png"
      if (event.target.src !== defaultIcon) {
        event.target.src = defaultIcon
      }
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
      width 18px
      height 18px
      text-align center
      img
        width 100%
    .time
      font-size 10px
      padding-top .3em
      color rgba(0, 0, 0, .5)
  .news-item
    margin 15px 0
    padding-left 28px
    clear both
    line-height 1.5
    min-height 3em
    color rgba(0, 0, 0, .8)
    font-size 12px
    position relative
    .title
      font-size 14px
      cursor pointer
    .summary
      color rgba(0, 0, 0, .5)
      max-height 0
      overflow hidden
      transition all .1s
    .footer
      text-align right
      opacity 0
      height 0
      overflow hidden
      transition all .3s
    .link
      color #0185F2
    &.active
      .summary
        max-height 500px
        transition all .4s
        margin .5em 0
      .footer
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
