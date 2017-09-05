<template lang="jade">
#search-panel
  .search-wrapper(:class="isLoading ? 'loading' : ''")
    .wrap
      .input-wrap
        input(v-model="keyword" id="search-input" placeholder="搜索文章")
      .result-wrap
        .info
          span(v-if="count > 0") 共找到 {{count}} 篇文章
          span(v-else-if="count === 0 && keyword.length !== 0 && !isLoading") 抱歉，没有找到 {{keyword}} 相关的文章
        #result-wrap.results
          article.article-items(v-for="post in posts")
            .article-info
              a(v-bind:href="`/news/${post.id}`")
                h3.multiline-text-overflow(v-html="highlights(post.title, keyword)")
              p.multiline-text-overflow(v-html="highlights(post.abstract, keyword)")
          span(v-if="isOver") 没有更多内容了~
</template>

<script>
import api from 'stores/api'
let page = 1

export default {
  data () {
    return {
      keyword: '',
      isLoading: false,
      posts: [],
      count: 0,
      isOver: false,
    }
  },
  beforeDestroy() {
    $('body').removeClass('modal-open')
  },
  mounted(){
    $('body').addClass('modal-open')
    $('#search-input').focus()

    const $target = $("#result-wrap")
    $target.scroll(() => {
      const nowScroll = $target.scrollTop() + $target.innerHeight()
      const allHeight = $target.prop('scrollHeight')
      if (nowScroll + 30 > allHeight) this.loadMore()
    })
  },
  watch: {
    keyword: function(val, oldVal){
      this.changeHandler()
    }
  },
  methods: {
    loadMore() {
      if (this.isOver) return
      this.isLoading = true
      api.get(`posts?query=${this.keyword}&page=${page}`).then((result) => {
        this.count = result.data.meta.total_count
        this.posts = page === 1 ? result.data.posts : this.posts.concat(result.data.posts)
        this.isOver = this.posts.length && ++page > result.data.meta.total_pages
        this.isLoading = false
      }).catch((err) => {
        console.log(err)
      })
    },
    changeHandler() {
      page = 1 // reset page
      if (this.keyword.length === 0) {
        this.posts = []
        this.isOver = false
        this.count = 0
      } else {
        this.isOver = false
        this.loadMore()
      }
    },
    highlights(value, keyword) {
      if (!value || !keyword) return value
      let re =new RegExp(keyword, "gim");
      return value.replace(re, `<em>${keyword}</em>`);
    }
  },
  beforeMount () {
  }
}
</script>

<style lang="stylus">
@import "../stylus/var.styl";
body.modal-open
  overflow: hidden
@keyframes searching
  0%
    transform: scale(0)
    left: 0
    right: 100%
  50%
    left: 0
    right: 0
    transform: scale(1)
  100%
    left: 100%
    right: 0
    transform: scale(0)
.search-wrapper
  position: fixed
  right: 0
  top: 0
  left: 0
  bottom: 0
  z-index: 100
  width: 100vw
  height: 100vh
  background-color: rgba(255, 255, 255, 0.99)
  .wrap
    position: absolute
    margin-left: auto
    margin-right: auto
    margin-top: 60px
    width: 80vw
    height: 70vh
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    max-width: 800px
  input
    border 0
    outline none
    width 100%
    line-height 1.5
    font-size 3.5rem
    color $color-blue
    background transparent
  .input-wrap
    position relative
    border-bottom 2px solid #e8e8e8
  &.loading
    .input-wrap
      border-color $color-blue
    .input-wrap::after
      content ''
      position absolute
      display block
      bottom -2px
      background-color #0499e0
      width 100%
      height 2px
      animation searching 1.5s
      animation-iteration-count infinite
      transform-origin left
  .result-wrap
    margin-top 15px
    height 100%
    .info
      font-size 1.4rem
    .results
      margin-top 10px
      // 100px = .input-wrap + .info
      height calc(100% - 100px)
      overflow-y auto
      -webkit-overflow-scrolling touch
      scrollbar()
    em
      color $color-blue
      font-style normal
    p
      color #5f5f5f
    .article-items
      margin 30px 0
      line-height 1.8
  .item-title
    font-size 1.8rem
    color #444
    margin: 0
    &:hover
      text-decoration: underline
      color: $color-blue
  .item-info
    color: #aeaeae
  .result-item:not(.last-child)
    padding-bottom: 15px
    margin-bottom: 15px
    border-bottom: 1px solid #efefef
  @media $media
    .wrap
      top calc(50% + 30px)
      height 80vh
      max-height calc(100vh - 100px)
    input
      font-size: 2.5rem
    .item-title
      mutileLineEllipsis(2, 25px)
</style>