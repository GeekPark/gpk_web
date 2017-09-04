<template lang="jade">
#index
  subnav
  .container
    sponsor(position="top_banner")
  .breaking-news(v-if="!isMobileUA")
    .container
      .item(v-for='item, index in slider.posts', :key='item.id')
        .responsive-imgs
          a(class="link", :href="item.link || `/news/${item.id}`", target="_blank")
            img(:alt="item.title", class="img-cover loaded", :src="item.cover_url")
            .info-cover
              h3.multiline-text-overflow
                span {{item.title}}
              p.multiline-text-overflow(v-if="index == 0") {{item.abstract}}
  .swiper-container#breakding-news-slider.breakding-news-slider(v-else)
    .swiper-wrapper
      .news-item.swiper-slide(v-for='item, index in slider.posts', :key='item.id')
        a.link(:href="`/news/${item.id}`")
          .img-cover
            img(:src="item.cover_url")
          .info-cover
            h3.multiline-text-overflow
              span {{item.title}}
  .main-content
    .container
      .article-list
        template(v-for="posts in homepage_posts")
          .time
            i.iconfont.icon-arrow-left
            | {{posts.date | formatDate}}
            i.iconfont.icon-arrow-right
          item(v-for="item in posts.data", :key="item.post.id", :post="item.post")
        .tac
          a.load-more(@click="fetch", :class="{'loading-in': loading}")
            .loading-article
            span 加载更多
      .article-sidebar
        sponsor(position="medium_up")
        hotnews
        idlenews
        topics
        sponsor(position="medium_below")
  .container.clear
    .wr-fx
      .fixed-tools
        a.tools-item.tools-erweima
          i.iconfont.icon-qrcode
        .qr-group
          .tabs
            a.tab(:class="{active: qrindex == 1}", @mouseenter="qrindex=1") 极客公园
            a.tab(:class="{active: qrindex == 2}", @mouseenter="qrindex=2") 极客之选
            a.tab(:class="{active: qrindex == 3}", @mouseenter="qrindex=3") 顶楼TopView
          .panels
            .panel(:class="{active: qrindex == 1}")
              .img
                img(src='../assets/imgs/qr_geekpark.jpg', alt='极客公园')
                p 用极客视角，追踪你最不可错过的科技圈。
            .panel(:class="{active: qrindex == 2}")
              .img
                img(src='../assets/imgs/qr_geekchoice.jpg', alt='极客之选')
                p 新鲜、有趣的硬件产品，第一时间为你呈现。
            .panel(:class="{active: qrindex == 3}")
              .img
                img(src='../assets/imgs/qr_topview.jpg', alt='顶楼')
                p 关注前沿科技，发表最具科技的商业洞见。
        a.tools-item(@click="dialogFormVisible = true")
          i.iconfont.icon-feedback
        a.tools-item.gotop(@click="pageScroll")
          i.iconfont.icon-gotop
  el-dialog(:title="nowPanel ? '提交成功' : '意见反馈'", :visible.sync="dialogFormVisible")
    .feedback(v-if="nowPanel")
      p.success-desc 感谢您提交反馈和对于极客公园的支持，我们会重视每一条用户提交的反馈意见，竭力改善极客公园的产品使用体验。
      .dialog-footer
        el-button(type="primary", @click="dialogFormVisible = false") 完成
    .feedback(v-else)
      p 通过反馈您可以向极客公园发送对我们产品的建议。我们欢迎您反馈产品使用中遇到的问题或提出您对于我们产品的功能和体验的改善创意。
      form(@submit.prevent="submitForm")
        textarea.form-control(rows="3", v-model.trim="fb_content")
        p 可以选择留下您的邮箱，方便我们与您联系，针对问题详细沟通。
        input.form-control(type="email", v-model.trim="fb_email")
      .dialog-footer(slot="footer")
        el-button(@click="dialogFormVisible = false") 取消
        el-button(type="primary", @click="submitForm") 提交
</template>

<script>
require('swiper/dist/css/swiper.min.css')
import Subnav from '../components/Vsubnav.vue'
import Sponsor from '../components/Sponsor.vue'
import Item from './posts/Item.vue'
import Hotnews from './posts/Hotnews.vue'
import Idlenews from './posts/Idlenews.vue'
import Topics from './posts/Topics.vue'
import api from 'stores/api'
import moment from 'moment'
import Swiper from 'swiper'
import { isWechat, isMobileUA } from 'mdetect'

export default {
  components: { Subnav, Sponsor, Item, Idlenews, Hotnews, Topics },
  computed: {
    isMobileUA () {
      return isMobileUA()
    }
  },
  data () {
    return {
      page: 0,
      qrindex: 1,
      loading: true,
      homepage_posts: [],
      dialogFormVisible: false,
      slider: {
        posts: [],
      },
      ads: [],
      nowPanel: false,
      fb_content: '',
      fb_email: ''
    }
  },
  watch: {
    'slider.posts': function (val, oldVal) {
      if (isMobileUA()) {
        setTimeout(()=>{
          new Swiper('#breakding-news-slider', {
            autoplay: 5000,
            loop: true
          })
        }, 100)
      } else {
        if (this.ads.post_left) val[3] = this.ads.post_left[0].ad
        if (this.ads.post_right) val[4] = this.ads.post_right[0].ad
      }
    }
  },
  mounted(){
    window.addEventListener('scroll', () => {
      let scrollTop = document.body.scrollTop
      let totalPage
      if (isMobileUA()) {
        totalPage = 999999
      } else {
        totalPage = 3
        scrollTop > 800 ? 
          document.querySelector(".fixed-tools").classList.add("show") :
          document.querySelector(".fixed-tools").classList.remove("show")
      }
      if (scrollTop + window.innerHeight >= document.querySelector(".article-list").clientHeight && 
          !this.loading && this.page < totalPage) {
        this.fetch()
      }
    })
  },
  methods: {
    fetch () {
      this.loading = true
      this.page += 1
      api.get(`?page=${this.page}`).then((result) => {
        console.log('homepage data: ', this.page, result)
        this.page < 2 ? this.slider = result.data.slider : ''
        this.homepage_posts = this.homepage_posts.concat(result.data.homepage_posts)
        this.loading = false
      }).catch((err) => {
        this.$message.error(err.toString())
      })
    },
    getAds () {
      api.get(`ads`).then((result) => {
        this.ads = result.data
      }).catch((err) => {
        this.$message.error(err.toString())
      })
    },
    changeTab (index) {
      this.qrindex = index
    },
    pageScroll () {
      $("body").animate({scrollTop:0}, '500')
    },
    submitForm () {
      if (!this.fb_content || this.loading) return;
      const note = `path: \`${window.location.pathname},\`,email: \`${this.fb_email}\`,browser: \`${window.navigator.userAgent}\``
      api.post('feedback/new', {
          type: 'feedback',
          content: this.fb_content,
          note,
        }).then((result) => {
        this.nowPanel = 'success'
        this.loading = false
      }).catch((err) => {
        this.loading = false
        this.$message.error(err.toString())
      })
    }
  },
  filters: {
    formatDate: function (value) {
      if (!value) return ''
      let str
      const time = moment.unix(value)
      str = time.format(`ddd.`)
      return time.calendar(null, {
        sameDay: '今天',
        lastDay: '昨天',
        lastWeek: 'MM.DD',
        sameElse: 'MM.DD'
      }) + ' \\ ' + str
    }
  },
  beforeMount () {
    if (!isMobileUA()) {
      this.getAds()
    }
    this.fetch()
  }
}
</script>

<style lang="stylus">
.feedback
  line-height 1.5
  .dialog-footer
    text-align center
  textarea, input
    width 100%
    margin-bottom 10px
  .form-control
    box-sizing border-box
    width 100%
    padding 6px 12px
    font-size 14px
    line-height 1.428571429
    color #555555
    background-color white
    background-image none
    border 1px solid #ccc
    border-radius 4px
    box-shadow inset 0 1px 1px rgba(0,0,0,0.075)
    transition border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s
.wr-fx
  float right
  margin-right -15px
  @media screen and (max-width: 1024px)
    display none
.fixed-tools
  position fixed
  top 60%
  z-index 50
  // display none
  opacity 0
  &.show
    opacity 1
  .tools-item
    margin 12px 0
    color #5B5B5B
    border 2px solid rgba(91,91,91,.6)
    border-radius 50%
    background #fff
    font-size 18px
    display block
    width 40px
    height 40px
    line-height 40px
    text-align center
    cursor pointer
    transition all .3s
    z-index 2
    position relative
    &:hover
      color #333
  .tools-erweima:hover + .qr-group, .qr-group:hover
    visibility visible
    opacity 1
    transform translate(0, 0px)
  .qr-group
    position absolute
    right 45px
    top -50%
    background #F6F6F6
    // box-shadow 0 1px 2px rgba(0, 1px, 11px, 0.1)
    visibility hidden
    opacity 0
    z-index 0
    transform translate(0, 20px)
    width 300px
    height 187px
    transition all .5s
    border-right 10px solid #fff
    &::after
      position absolute
      top 45%
      right -8px
      display block
      content ''
      width 0px
      border-top 10px solid transparent
      border-bottom 10px solid transparent
      border-left 10px solid #F6F6F6
    .tabs
      padding-top 5px
      text-align center
      .tab
        display inline-block
        font-size 14px
        line-height 2
        padding 2px 6px
        margin 0 10px
      .tab:hover, .tab.active
        color #0185F2
        border-bottom 2px solid #0185F2
    .panel
      display none
      padding 20px
      &.active
        display block
      img
        width 105px
        height 105px
        display inline-block
        margin-right 15px
        vertical-align top
      p
        display inline-block
        width calc(100% - 120px)
        line-height 1.5
        color rgba(0,0,0,.5)

.breaking-news
  margin-bottom -10px
  .info-cover
    position absolute
    bottom 0
    padding 0 8% 4% 4%
    text-align left

  .item
    width 24%
    margin 0 0 1% 1%
    background #efefef
    display inline-block
    vertical-align top
    text-align center
    .link
      position absolute
      top 0
      left 0
      right 0
      bottom 0
    .responsive-imgs
      width 100%
      height 0
      padding-bottom 72%
      box-sizing border-box
      overflow hidden
      border 1px solid #efefef
      position relative
    img
      height 100%
      display inline
      margin 0 -100%
      transition transform 0.5s ease
    &:hover
      img
        transform scale3d(1.05, 1.05, 1)
    h3
      font-size 16px
      color #fff
      line-height 2
      margin 0
      font-weight 400
      span
        background #000
        padding .3em 10px
        box-decoration-break clone
    &:first-child
      float left
      width 50%
      margin 0
      .responsive-imgs
        padding-bottom 71.5%
      h3
        font-size 20px
        // linear-gradient (transparent, transparent 0.1em, #000 0px, #000 1.85em, transparent 0)
        background linear-gradient(to bottom, transparent 0.1em, black 0.1em, black 1.85em, transparent 1.85em)
      p
        background rgba(0, 0, 0, .5)
        color #fff
        font-weight 300
        font-size 14px
        line-height 1.5
        padding 6px 10px
        margin 10px 0 0 0
  @media screen and (max-width: 1023px)
    .item
      .responsive-imgs
        h3
          font-size 12px
      &:first-child
        h3
          font-size 16px
        p
          font-size 12px
  @media screen and (max-width: 767px)
    margin-top 20px
    margin-bottom 0px
    .item
      width 49.5%
      margin 1% 0 0 1%
      &:nth-child(even)
        margin-left 0
      &:first-child
        width 100%
.breakding-news-slider
  overflow: hidden
  position relative
  .swiper-slide
    width 100%
  .img-cover
    padding-bottom 60%
    background-color: #c3c3c3;
    border 1px solid #efefef
    position: relative;
    overflow hidden
    text-align center
    img
      position absolute
      top 50%
      left 50%
      transform translate3d(-50%, -50%, 0)
      height 100%
      width auto
      min-width 100%
  .info-cover
    position absolute
    bottom 0
    padding 0 28% 3% 4%
    text-align left
    z-index 2
    h3
      font-size 16px
      color #fff
      line-height 1.8
      margin 0
      font-weight normal
      span
        background #000
        display inline
        line-height 1.5
        padding 4px 10px
        box-decoration-break clone
  .swiper-pagination
    bottom 0
  .swiper-pagination-bullet
    margin 0
    height 4px
    border-radius 0
    width 20%
    vertical-align bottom
    background-color #000
    transition all 0.3s
  .swiper-pagination-bullet-active
    background-color $color-blue
</style>
