<template lang="pug">
#app(element-loading-text="拼命加载中" v-if="toload")
  vheader
  transition(name="fade" mode="out-in")
    router-view(:access_key="$store.state.access_key")
  feedback(v-once)
  vfooter
</template>

<script>
import api from 'store/api'

export default {
  name: 'app',
  data () {
    return {
      toload: true
    }
  },
  mounted() {
    if (!this.$device.isMobile()) {
      this.$store.state.target = '_blank'
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading;
    }
  }
}
</script>

<style lang="stylus">
@import "assets/fonts/iconfont.css"
@import "stylus/var.styl"
$siderrWidth = 200px
$headerHeight = 80px
.iconfont
  font-size inherit
  margin 0 .25em
  outline none
html, body
  width 100%
  margin 0
  padding 0
  overflow-x hidden
  font-size 14px
  font-family Helvetica,Arial,"PingFang SC","Hiragino Sans GB","Source Han Sans CN",Roboto,"Microsoft Yahei",sans-serif
  -webkit-font-smoothing antialiased
  background #fff
div, a, img
  -webkit-tap-highlight-color transparent
  -webkit-touch-callout none
input, textarea
  outline none
img
  vertical-align bottom
#app
  color #000
  background transparent
  width 100%
.container
  max-width 1130px
  margin 0 auto
  @media screen and (max-width: 1130px)
    margin 0 20px
.clear
  clear both
h3
  font-size 20px
  font-weight 500
a
  color #000
.multiline-text-overflow
  overflow hidden
  text-overflow ellipsis
  display -webkit-box
  -webkit-line-clamp 2
  -webkit-box-orient vertical
#error
  h1
    text-align center
    padding 200px 0
.main-content
  margin 50px 0
  .article-list
    width 815px
    display inline-block
    text-align left
    .time
      border 1px solid rgba(0,0,0,0.1)
      border-width 1px 0
      text-align center
      line-height 40px
      margin 25px 0
      color rgba(0,0,0,0.6)
      &:first-child
        margin-top 0
      i
        color #000
.article-sidebar
  float right
  width 275px
  .ad-index
    height 250px
    background #D8D8D8
    margin-bottom 50px
@media screen and (max-width: 1130px)
  .main-content .article-list, #post .main-wrap
    max-width 100%
    width 100%
  .article-sidebar
    display none
.load-more
  display: inline-block;
  padding: 8px 25px;
  border: 1px solid #d5d5d5;
  letter-spacing: 1px;
  font-size: 1.5rem;
  margin-top: 15px;
  margin-bottom: 15px;
  color: #9e9e9e;
  background-color: #fff;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  position relative
  &:hover
    color: #444;
    border-color: #444;
  .loading-article
    background-image: url(//imgslim.geekpark.net/assets/imgs/icons/loading.svg);
    background-size: 100% 100%;
    width: 30px;
    height: 30px;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    background-size: 100% 100%;
  &.loading-in
    .loading-article
      opacity 1
    span
      opacity 0
  &.no-more
    display none
@media $media
  #app
    padding-top 45px
  .sub-nav
  .sponsor-wrapper
  .article-sidebar
  .page-footer
    display none
  .container
    margin 0 20px
  .main-content
    margin-top 0
    .article-list
      margin-top 30px
      width 100%

//  public css
.no-touch-bg
  user-select none
  -webkit-tap-highlight-color transparent
  -webkit-touch-callout none
  -webkit-user-select none
.slide-fade-enter-active
  transition all .1s ease
.slide-fade-leave-active
  transition all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0)
.slide-fade-enter, .slide-fade-leave-active
  transform translateX(10px)
  opacity 0

.center
  position   absolute
  top        50%
  left       50%
  transform  translate(-50%,-50%)


article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section
  display block

body
  line-height 1

blockquote, q
  quotes none

blockquote:before, blockquote:after,

q:before, q:after
  content ''
  content none

table
  border-collapse collapse
  border-spacing 0

html
  font-size 62.5%

a
  text-decoration none
  cursor pointer

body.modal-open
  overflow: hidden
  height 100vh


.triangle-down
  triangleDown()
.hidden-ipad
  mediaMax(1024px)
.player-btn
  display: inline-block
  width: 42px
  height: 42px
  line-height: 40px
  color: #fff
  transition: all 0.4s ease
  border: 1px solid rgba(255, 255, 255, 1)
  border-radius: 3px
  background-color: rgba(0, 0, 0, 0.5)
  text-align: center
  font-size: 1.2rem
  .icon-player
    font-size: 1.4rem

.w50p
  width: 50%
.hidden
  display: none !important
.hidden-xs
  @media screen and (max-width: $screen-xs-max)
    display: none !important
.hidden-notxs
  @media screen and (min-width: $screen-sm-min)
    display: none !important
.block
  display: block
.mt-global
  margin-top: $global-margin
.mb-global
  margin-bottom: $global-margin
.static
  position: static
.relative
  position: relative
.absolute
  position: absolute
.no-padding
  padding: 0
.tac
  text-align: center
.tal
  text-align: left
.tar
  text-align: right
.dib
  display: inline-block
img.js-lazy
  visibility: hidden
  &.loaded
    visibility: visible
.dib-middle
  dib-middle()
.dib-top
  display: inline-block
  vertical-align: top

.a-center
  a-center()
</style>
