<template lang="pug">
#post
  section.container(v-show="news.post_type")
    .main-wrap
      template(v-if="!show")
        .preview 此为文章临时预览链接，将在30分钟后失效
      article
        #play-room(:class="{'video-player': news.post_type == 'video'}")
        header.post-header(:class="{'video': news.post_type == 'video'}")
          .label.article-info(v-if="news.post_type !== 'video' && news.column && !promotion[news.column.id]")
            a.category-tag(:href="`/column/${news.column && news.column.id}`" target="_blank")  {{news.column && news.column.title}}
            .article-time {{news.reading_time}}min read
          h1.topic-title {{news.title}}
          .user-info
            a.author(v-for="author in news.authors", :href="`/users/${author.id}`")
              img(:src="author.avatar_url")
              span {{author.nickname}}
            span.release-date {{news.published_timestamp | formatDate}}
            a.edit(v-if="userInfo && userInfo.roles && userInfo.roles.indexOf('admin') > -1", :href="`http://admin.geekpark.net/posts/new?id=${news.id}`") 编辑
        #article-body
          .topic-cover(v-if="news.post_type !== 'video'")
            img#topic-cover(:src="news.cover_url")
            .tips
              i.iconfont.icon-quotes
              span 摘要
            p {{news.abstract}}
          .article-content(v-html="news.content")
        .article-source
        section.tags
          a.article-tag(v-for="tag in news.tags", :href="`/tags/${tag}`") {{tag}}
        .share-wrap
          share(:title="news.title")
      template(v-if="show")
        .like-wrap.hidden-xs
          .like-button(@click="toggleLike(news.id)", :class="{liked: news.liked}")
            span.like-icon
          p(v-if="news.like_count > 0") {{news.like_count}}
        a.hidden-notxs.app-down(href="http://a.app.qq.com/o/simple.jsp?pkgname=net.geekpark.geekpark")
          | 打开极客公园App阅读更多内容
        comment(:postid="$route.params.id")
        related(v-if="news.column && !promotion[news.column.id]", v-once)
        newest(v-once)

    aside.article-sidebar
      sponsor(position="post", v-once)
      hotnews(v-once)
      template(v-if="show")
        nextnews(v-once)
</template>

<script>
import api from 'store/api'
import Sponsor from '../components/Sponsor.vue'
import Hotnews from './posts/Hotnews.vue'
import Related from './posts/Related.vue'
import Newest from './posts/Newest.vue'
import Nextnews from './posts/Nextnews.vue'
import Share from '../components/Share.vue'
import Comment from './Comment.vue'
import mediumZoom from 'medium-zoom'

let access_key

export default {
  components: { Hotnews, Nextnews, Share, Comment, Sponsor, Related, Newest },
  data () {
    return {
      show: true,
      promotion: {
        '2': '行业资讯',
        '248': '业界资讯'
      }
    }
  },
  title () {
    return this.news.title
  },
  asyncData ({ store, route: { params: { id }, query: { key }} }) {
    if (key) {
      return store.dispatch('FETCH_PREVIEW', { id, key })
    } else {
      return store.dispatch('FETCH_NEWS', { id })
    }
  },
  computed: {
    news () {
      return this.$store.state.news.post
    },
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    fetchLike () {
      api.get(`posts/${this.$route.params.id}/status?access_key=${access_key}&roles=dev`).then(result => {
        this.news.like_count = result.data.post.like_count
        this.news.liked = result.data.post.liked
      })
    },
    toggleLike: function(id) {
      if (!this.$store.state.userInfo) {
        if (confirm('喜欢需要登录喔，点击确定去登录')) window.location.href = `${api.account.defaults.baseURL}login?callback_url=${encodeURIComponent(location.href)}`;
        return;
      }
      let like = this.news.liked ? 'unlike' : 'like'
      api.post(`posts/${id}/${like}?access_key=${access_key}`).then((res) => {
        this.news.liked = !this.news.liked;
        this.news.like_count += like === 'unlike' ? -1 : 1
      }).catch((err) => {
        this.$message.error(err.toString())
      })
    },
  },
  mounted () {
    let _this = this
    if (!this.news.published_timestamp) {
      this.show = false
    }

    if (!this.$device.isMobile()) {
      mediumZoom(document.querySelectorAll("#article-body img"))
    } else if (this.$device.isWechat()) {

      api.get(`wechat/js_config?request_url=${encodeURIComponent(window.location.href)}`).then(function(res) {
        wx.config({
          debug: false,
          appId: res.data.appId,
          timestamp: res.data.timestamp,
          nonceStr: res.data.nonceStr,
          signature: res.data.signature,
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
        });
        wx.ready(function() {
          wx.onMenuShareTimeline({ // 分享朋友圈
            title: _this.news.title, // 分享标题
            link: window.location.href, // 分享链接
            imgUrl: _this.news.cover_url, // 分享图标
          });
          wx.onMenuShareAppMessage({ // 分享给好友
            title: _this.news.title, // 分享标题
            desc: _this.news.abstract, // 分享描述
            link: window.location.href, // 分享链接
            imgUrl: _this.news.cover_url, // 分享图标
          });
        })

        const imgs = [];
        $('#article-body img').each(function () {
          imgs.push($(this).attr('src'));
        });

        $('#article-body').on('click', 'img', function () {
          const src = $(this).attr('src');
          if (imgs.indexOf(src) === -1) return;
          // window.ga('send', 'event', 'M.article.pic.zoom', 'zoom', src);
          wx.previewImage({
            current: src,
            urls: imgs,
          });
        });
      }).catch((err) => {
        this.$message.error(err.toString())
      });
    }

    if (this.news.post_type === 'video') {
      const el = document.getElementById('play-room');
      let videoScript = document.createElement('script');
      videoScript.src = `//union.bokecc.com/player?vid=${this.news.extra.video_id}&siteid=99F117B348066991&autoStart=true&playerid=0A25BF740EA51439&playertype=1&width=100%&height=100%`;
      videoScript.type ='text/javascript';
      el.innerHTML = '';
      el.appendChild(videoScript);
    }
  },
  beforeMount () {
    access_key = this.$store.state.access_key || localStorage.getItem('access_key')
    if (access_key) {
      this.fetchLike()
    }
  }
}

</script>

<style lang="stylus">
@import "../stylus/var.styl";
$gray = #EBEBEB
$pink = #f94c8d
$bezier = cubic-bezier(0.175, 0.885, 0.32, 1.275)
.preview
  color #5b5b5b
  background #c4dff6
  padding 0 .5em
  line-height 2
  margin-bottom 1.5em
.app-down
  display block
  background $color-blue
  color #fff
  text-align center
  font-size 16px
  line-height 50px
  margin 30px 0 75px
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
  min-height 60vh
  .container
    text-align center
  .main-wrap
    max-width 700px
    width 100%
    display inline-block
    padding-bottom 50px
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
      color $color-blue
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
      .edit
        margin-left 1em
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
    // b
    //   color #fff
    //   font-weight normal
    //   background #000
    //   padding 2px 0
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
      color #333
      img + i
        color rgba(0, 0, 0, .6)
        font-size 14px
        font-style normal
    a, a:visited
      color #333
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
  min-height 75px
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

// Animations
@keyframes heartPulse
  0%
    transform: scale(1)
  50%
    transform: scale(1.5)
@keyframes heartUnlike
  50%
    transform: scale(0.75)
</style>
