<template lang="pug">
#search-panel
  .search-wrapper(:class="isLoading ? 'loading' : ''")
    .wrap
      .input-wrap
        input(v-model="keyword" id="search-input" placeholder="搜索")
      .search-type
        input(type="radio" id="search-post" value='' v-model="searchType")
        label(for="search-post") 文章
        input(type="radio" id="search-authors" value='true' v-model="searchType")
        label(for="search-authors") 作者
      .result-wrap
        .info
          //- span(v-if="count > 0") 共找到 {{count}} 篇文章
          span(v-if="posts.length < 1 && authors.length < 1 && keyword.length !== 0 && !isLoading") 抱歉，没有找到 {{keyword}} 相关的结果
        #result-wrap.results
          template(v-if="!searchType")
            article.article-items(v-for="post in posts")
              .article-info
                a(v-bind:href="`/news/${post.id}`" target="_blank")
                  h3.multiline-text-overflow(v-html="post.title.join('...')")
                p.multiline-text-overflow(v-html="post.abstract.join('...')")
                p.multiline-text-overflow(v-if="post.content_rendered" v-html="post.content_rendered.join('...')")
            span(v-if="isOver") 没有更多内容了~
          template(v-else)
            article.author-items(v-for="author in authors")
              a(v-bind:href="`/users/${author.id}`" target="_blank")
                .img-box
                  img(:src="author.avatar_url" w=96 h=96)
                | {{author.nickname}}
</template>

<script>
import api from 'store/api'
let page = 1

export default {
  data () {
    return {
      keyword: '',
      isLoading: false,
      posts: [],
      authors: [],
      searchType: '',
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
    },
    searchType: function(val, oldVal){
      this.posts = []
      this.authors = []
      this.changeHandler()
    }
  },
  methods: {
    getAuthor() {
      this.isLoading = true
      api.account.get(`/api/v1/authors?nickname=${this.keyword}`).then((result) => {
        this.authors = result.data
        this.isLoading = false
      }).catch((err) => {
        console.log(err)
      })
    },
    loadMore() {
      if (this.isOver) return
      this.isLoading = true
      api.get(`posts/es_search?query=${this.keyword}&page=${page}`).then((result) => {
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
      this.isOver = false
      if (this.keyword.length === 0) {
        this.posts = []
        this.authors = []
        this.count = 0
      } else {
        if (this.searchType) {
          this.getAuthor()
        } else {
          this.loadMore()
        }
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
    margin-top: 40px
    width: 80vw
    height: 70vh
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    max-width: 800px
  .input-wrap
    position relative
    border-bottom 2px solid #e8e8e8
    input
      border 0
      outline none
      width 100%
      line-height 1.5
      font-size 3.5rem
      color $color-blue
      background transparent
  .search-type
    padding 10px 5px
    label
      margin-right 1em
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

    .author-items
      margin 1em 3em 1em 0
      display inline-block
      font-size 16px
      .img-box
        width 48px
        height 48px
        border-radius 50%
        overflow hidden
        display inline-block
        margin-right 0.6em
        vertical-align middle
        img
          width 100%
          vertical-align top
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
