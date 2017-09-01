<template lang="jade">
#post
  v-title {{postsData.title}}
  section.container
    .main-wrap
      article
        #play-room(:class="{'video-player': postsData.post_type == 'video'}")
        header.post-header(:class="{'video': postsData.post_type == 'video'}")
          .label.article-info(v-if="postsData.post_type !== 'video' && postsData.column && !promotion[postsData.column.id]")
            a.category-tag(:href="`/column/${postsData.column && postsData.column.id}`" target="_blank")  {{postsData.column && postsData.column.title}}
            .article-time {{postsData.reading_time}}min read
          h1 {{postsData.title}}
          .user-info
            a.author(v-for="author in postsData.authors", :href="`/users/${author.id}`")
              img(:src="author.avatar_url")
              | {{author.nickname}}
            span.release-date {{postsData.published_at | formatDate}}
        .topic-cover(v-if="postsData.post_type !== 'video'")
          img#topic-cover(:src="postsData.cover_url")
          .tips
            i.iconfont.icon-quotes
            span 摘要
          p {{postsData.abstract}}
        #article-body.article-content(v-html="postsData.content")
          p {{postsData.abstract}}
        .article-source
        section.tags
          a.article-tag(v-for="tag in postsData.tags", :href="`/tags/${tag}`", target="_blank") {{tag}}
        .share-wrap
          share(:title="postsData.title")

      .like-wrap
        .like-button(@click="toggleLike(postsData.id)", :class="{liked: postsData.liked}")
          span.like-icon
            .heart-animation-1
            .heart-animation-2
        p(v-if="postsData.like_count > 0") {{postsData.like_count}}
      comment(:postid="$route.params.id")
      related(v-if="postsData.column && !promotion[postsData.column.id]")
      newest
      
    aside.article-sidebar
      sponsor(position="post")
      hotnews
      nextnews
</template>

<script>
import api from 'stores/api'
import moment from 'moment'
import Sponsor from '../components/Sponsor.vue'
import Hotnews from './posts/Hotnews.vue'
import Related from './posts/Related.vue'
import Newest from './posts/Newest.vue'
import Nextnews from './posts/Nextnews.vue'
import Share from '../components/Share.vue'
import VTitle from '../components/VTitle.vue'
import Comment from './Comment.vue'
import mediumZoom from 'medium-zoom'
import { isWechat, isMobileUA } from 'mdetect'

const access_key = localStorage.getItem('access_key')

export default {
  components: { Hotnews, Nextnews, Share, VTitle, Comment, Sponsor, Related, Newest },

  data () {
    return {
      postsData: {},
      promotion: {
        '2': '捕风捉影',
        '248': '业界资讯'
      }
    }
  },
  watch: {
    'postsData.post_type': function (val, oldVal) {
      if (!isMobileUA()) {
        setTimeout(()=>{
          mediumZoom([
            ...document.querySelectorAll("#topic-cover"),
            ...document.querySelectorAll(".article-content img")
          ])
        }, 100)
      } else if (isWechat()) {
        const imgs = [];
        imgs.push($('#topic-cover').attr('src'));
        $('#article-body img').each(function () {
          imgs.push($(this).attr('src'));
        });

        $('#post').on('click', 'img', function () {
          const src = $(this).attr('src');
          if (imgs.indexOf(src) === -1) return;
          // window.ga('send', 'event', 'M.article.pic.zoom', 'zoom', src);
          wx.previewImage({
            current: src,
            urls: imgs,
          });
        });
      }

      if (val === 'video') {
        const el = document.getElementById('play-room');
        let videoScript = document.createElement('script');
        videoScript.src = `//union.bokecc.com/player?vid=${this.postsData.extra.video_id}&siteid=99F117B348066991&autoStart=true&playerid=0A25BF740EA51439&playertype=1&width=100%&height=100%`;
        videoScript.type ='text/javascript';
        el.innerHTML = '';
        el.appendChild(videoScript);
      }
    }
  },
  methods: {
    fetch () {
      api.get(`posts/${this.$route.params.id}?access_key=${access_key}`).then(result => {
        console.log(result);
        this.postsData = result.data.post
      }).catch((err) => {
        this.$router.push({path: '/404'})
      })
    },

    toggleLike: function(id) {
      if (!this.$store.state.userInfo) {
        if (confirm('喜欢需要登录喔，点击确定去登录')) window.location.href = `${api.account.defaults.baseURL}login?callback_url=${encodeURIComponent(location.href)}`;
        return;
      }
      let like = this.postsData.liked ? 'unlike' : 'like'
      api.post(`posts/${id}/${like}?access_key=${access_key}`).then((res) => {
        console.log('res', res);
        this.postsData.liked = !this.postsData.liked;
        this.postsData.like_count += like === 'unlike' ? -1 : 1
      }).catch((err) => {
        console.log(err);
        this.$message.error(err.toString())
      })
    },
  },
  filters: {
    formatDate: function (value) {
      if (!value) return ''
      return moment(value).format("YYYY/MM/DD")
    }
  },
  beforeMount () {
    this.fetch()
  }
}

</script>

<style lang="stylus">
@import "../stylus/var.styl";
$gray = #EBEBEB
$pink = #f94c8d
$bezier = cubic-bezier(0.175, 0.885, 0.32, 1.275)

#play-room
  &.video-player
    position relative
    padding-bottom 56.288%
    overflow hidden
    height 0px
    & > div
      position absolute !important
      left 0
      top 0
      bottom 0
      right 0
    @media screen and (max-width: 767px)
      margin 0 -20px
      padding-bottom 63%
#post
  margin 40px auto 0 auto
  color #353535
  .container
    text-align center
  .main-wrap
    max-width 700px
    width 100%
    display inline-block
    padding-bottom 120px
    vertical-align top
    text-align left
    @media screen and (max-width: 1130px)
      max-width 100%
  .article-sidebar
    display inline-block
    vertical-align top
    text-align left
    float none
    margin-left 60px
    @media screen and (max-width: 1130px)
      display none
  .post-header
    margin-bottom 30px
    border-bottom 1px solid #ddd
    .user-info a
      color #0185f2
    .category-tag
      display inline-block
      padding 0 9px
      line-height 2
      background-color #DCDCDC
      font-size 14px
      margin-right 1em
      font-weight bold
      color #000
    .article-time
      display inline-block
      font-size 14px
    h1
      line-height 1.5
      font-size 26px
    .user-info
      padding-bottom 15px
      img
        width 40px
        height 40px
        border-radius 50%
        display inline-block
        vertical-align middle
        margin-right .5em
      .author
        margin-right 1em
  .topic-cover
    border-bottom 1px solid #ddd
    margin-bottom 30px
    img
      width 100%
    p
      line-height 1.5
      font-size 16px
      padding 20px
    .tips
      margin-top 40px
      span
        color rgba(0,0,0,.6)
  
  .article-content
    word-wrap break-word
    font-size 16px
    line-height 1.625
    b
      color #fff
      font-weight normal
      background #000
    h2
      position relative
      font-size 18px
      margin 30px 0 15px
    img
      display block
      max-width 100%
      margin 0 auto
      height auto
    img.js-lazy.blur
      width 100%
    img.loading
      cursor wait
    blockquote
      color rgba(0, 0, 0, .6)
      margin 0
    iframe
      width 100%
    .gp_media_video
      position relative
      width 100%
      height 0
      padding-top 62%
      embed,
      iframe
        width 100%
        height 100%
        position absolute
        left 0
        top 0
    p
      margin 15px 0
      color rgba(0, 0, 0, .8)
      img + i
        color rgba(0, 0, 0, .6)
        font-size 12px
        font-style normal
    a, a:visited
      color rgba(0, 0, 0, .8)
      text-decoration none
      border-bottom 1px solid #F84B8D
  
  .tags
    margin-top 30px
    a
      display inline-block
      background-color #5B5B5B
      color #fff
      margin 5px 10px 5px 0
      line-height 24px
      padding 0 1em
      font-size 12px
      transition all 0.3s
  @media screen and (max-width: 767px)
    margin 0
    .main-wrap
      width 100%
    .post-header
      padding 20px 20px 10px 15px
      margin 0 -20px 20px
      border-left 5px solid #DCD900
      h1
        font-size 22px
      &.video
        border-left-color #F84B8D
    .article-content
      iframe
        height 51vw
.like-wrap
  text-align center
  margin 20px auto 50px
  p
    margin 8px 0
.like-button
  display inline-block
  background #fff
  box-shadow 0 0 7px 2px rgba(0,0,0,0.20)
  border-radius 50%
  color darken($gray, 100%)
  filter grayscale(100%)
  user-select none
  width 50px
  height 50px
  cursor pointer
  &.liked
    color $pink
    filter grayscale(0)
.like-icon
  width 50px
  height 50px
  display inline-block
  position relative
  background url("../assets/imgs/icons/heart.svg") no-repeat center
  background-size 35%
.liked .like-icon
  background-size 40%
  animation heartPulse 0.25s $bezier both
  [class^="heart-animation-"]
    background: url("../assets/imgs/icons/heart.svg") no-repeat center
    background-size: contain
    display: block
    position: absolute
    top: 0
    left: 20px
    width: 16px
    height: 14px
    opacity: 0
    &::before, &::after
      content: ''
      background: inherit
      background-size: contain
      width: inherit
      height: inherit
      display: inherit
      position: relative
      top: inherit
      left: inherit
      opacity: 0
  .heart-animation-1
    animation: heartFloatMain-1 1s $bezier both
    &::before, &::after
      width: 12px
      height: 10px
      visibility: hidden
    &::before
      opacity: .6
      animation: heartFloatSub-1 1s 0.25s $bezier both
    &::after
      animation: heartFloatSub-2 1s 0.15s $bezier both
      opacity: .75
  .heart-animation-2
    animation: heartFloatMain-2 1s 0.1s $bezier both
    &::before, &::after
      width: 10px
      height: 8px
      visibility: hidden
    &::before
      animation: heartFloatSub-3 1s 0.25s $bezier both
      opacity: .25
    &::after
      animation: heartFloatSub-4 1s 0.15s $bezier both
      opacity: .4
  
// Animations
@keyframes heartPulse
  0%
    transform: scale(1)
  50%
    transform: scale(1.5)
@keyframes heartUnlike
  50%
    transform: scale(0.75)
@keyframes heartFloatMain-1
  0%
    opacity: 0
    transform: translate(0) rotate(0)
  50%
    opacity: 1
    transform: translate(0, -25px) rotate(-20deg)
@keyframes heartFloatMain-2
  0%
    opacity: 0
    transform: translate(0) rotate(0) scale(0)
  50%
    opacity: .9
    transform: translate(-10px, -38px) rotate(25deg) scale(1)
@keyframes heartFloatSub-1
  0%
    visibility: hidden
    transform: translate(0) rotate(0)
  50%
    visibility: visible
    transform: translate(13px, -13px) rotate(30deg)
@keyframes heartFloatSub-2
  0%
    visibility: hidden
    transform: translate(0) rotate(0)
  50%
    visibility: visible
    transform: translate(18px, -10px) rotate(55deg)
@keyframes heartFloatSub-3
  0%
    visibility: hidden
    transform: translate(0) rotate(0)
  50%
    visibility: visible
    transform: translate(-10px, -10px) rotate(-40deg)
  100%
    transform: translate(-50px, 0)
@keyframes heartFloatSub-4
  0%
    visibility: hidden
    transform: translate(0) rotate(0)
  50%
    visibility: visible
    transform: translate(2px, -18px) rotate(-25deg)
</style>
