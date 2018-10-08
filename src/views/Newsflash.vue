<template lang="pug">
.main-content
  .container
    .article-list
      .flash-item(v-for="post in posts", :key="post.id")
        .icon
          img(:src="post.icon" @error="imgError")
          .date {{post.updatedAt | fromHours}}
        .title {{post.edited_title}}
        .summary {{post.summary}}
        .meta
          a.link(v-if="post.url" :href="`${post.url}`", :target="$store.state.target") 阅读原文
    .article-sidebar
      hotnews(v-once)
</template>

<script>
import Hotnews from './posts/Hotnews.vue'
import axios from 'axios'

export default {
  components: { Hotnews },
  data () {
    return {
      loading: true,
      posts: []
    }
  },
  meta () {
    return {
      title: "全球快讯"
    }
  },
  methods: {
    fetch () {
      this.loading = true;
      axios.get(`https://digestapit.geeks.vc/v1/articles`).then((result) => {
        this.posts = result.data.data.reverse()
        this.loading = false
      }).catch((err) => {
        this.$message.error(err.toString())
      })
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
.flash-item
  margin 15px 0 55px
  clear both
  line-height 1.5
  color rgba(0, 0, 0, .8)
  font-size 14px
  padding-left 28px
  position relative
  .icon
    position absolute
    left 0
    text-align center
    width 18px
    img
      width 100%
    .date
      font-size 10px
      padding-top .3em
      color rgba(0, 0, 0, .5)
  .title
    font-size 18px
    font-weight bold
    margin-bottom .8em
  .summary
    color rgba(0, 0, 0, .5)
    margin .5em 0
    transition all .4s
  .meta
    .link
      float right
      color #0185F2
      line-height 35px
.share-btn
  display inline-block
  width 35px
  height 35px
  text-align center
  line-height 35px
  border-radius 50%
  color #5B5B5B
  opacity 1
  transition all 0.2s
  background-color #F6F6F6
  margin-left 1em
  &:hover
    color #fff
.share-btn.wechat:hover
  background-color #00D10D
.share-btn.weibo:hover
  background-color #DF2029
.share-btn .iconfont
  font-size 16px
  line-height 36px
  font-weight normal
.wx-qrcode
  position absolute
  width 120px
  height 120px
  left 50%
  bottom 40px
  margin-left -60px
  opacity 0
  transform scale(0)
  transform-origin bottom center
  transition all 0.3s
.share-btn.wechat:hover .wx-qrcode
  opacity 1
  transform scale(1)
</style>
