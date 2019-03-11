<template lang="pug">
footer.page-footer#footer(v-once)
  .footer-wrap
    .container
      section.contact
        h4 联系我们
        p 联系电话：8610-84599761
        p 联系邮箱：
          a.normal-link(href="mailto:contact@geekpark.net") contact@geekpark.net
        p
          | 公司地址：北京市朝阳区酒仙桥路4号751 D·Park
          br
          | 　　　　　正东集团院内 C8座105室 极客公园
        div(data-track-category="follow" data-track-item="a.share-btn")
          span(style="color: #DCD900") 关注我们：
          a.share-btn.weibo(href="//weibo.com/geekpark" target="_blank" data-track-label="weibo")
            .iconfont.icon-weibo
          a.share-btn.zhihu(href="https://www.zhihu.com/org/geekpark-16" target="_blank" data-track-label="zhihu")
            .iconfont.icon-zhihu
          a.share-btn.wechat.relative(href="javascript:;" data-track-label="wechat")
            .iconfont.icon-wechat
            .wechat-qr.triangle-down
              img(src='//imgslim.geekpark.net/image/newgeekpark/qr_geekpark.jpg' alt="极客公园微信公众平台" width="120" height="120")
          a.share-btn.rss(href="http://feed.geekpark.net" target="_blank" data-track-label="rss")
            .iconfont.icon-rss

      section.about
        h4 关于
        p
          a(title="关于极客公园" href="/about") 关于极客公园
        p
          a(title="寻求报道" href="/report") 寻求报道
        p
          a(title="加入我们" href="/zhuanti/job/") 加入我们
        p
          a(title="友情链接" href="/about#links") 友情链接

      section.sponsor
        h4 云服务支持
        ul.list
          li
            a(href="http://www.qiniu.com/" target="_blank" rel="nofollow")
              img(height="30" src='//imgslim.geekpark.net/image/newgeekpark/qiniu.png')
          li
            a(href="https://www.qingcloud.com/" target="_blank" rel="nofollow")
              img(height="25" src='//imgslim.geekpark.net/image/newgeekpark/qingyun.png')
          li
            a(href="http://www.bokecc.com/" target="_blank" rel="nofollow")
              img(height="25" src='//imgslim.geekpark.net/image/newgeekpark/cc.png')

      section.down
        h4 APP下载
        p(style="text-align:center")
          img(height="100" src='//imgslim.geekpark.net/image/newgeekpark/qr_app.gif')
          br
          | iOS & Android
  .footer-copyright
    .container
      .info-icp
        a(href="http://www.miitbeian.gov.cn/" target="_blank" rel="nofollow") 京ICP备13016923号-2
        | &nbsp;&nbsp;|&nbsp;&nbsp;
        a(href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502034250" target="_blank" rel="nofollow") 京公网安备11010502034250号
      .info-copyright
        | 北京传奇极客管理咨询有限公司 &nbsp; Copyright ©&nbsp;
        span.hidden-sm 2009 - {{year}}
</template>

<script>

export default {
  name: 'vfooter',
  computed: {
  },
  data () {
    return {
      year: new Date().getFullYear()
    }
  },
  methods: {
  }
}
</script>


<style lang="stylus" scoped>
@import "../stylus/var.styl";

.page-footer
  position relative
  clear both
  z-index 50
.footer-wrap
  background-color #1e1e1e
  padding 60px 0 40px
  color rgba(255,255,255,.6)
  line-height 1.7
  text-align center
  section
    display inline-block
    vertical-align top
    margin-right 100px
    font-size 14px
    text-align left
    .normal-link
      color #0185F2
  .contact
    width 350px
  @media screen and (max-width: 1100px)
    section
      margin-right 4%
    .contact
      width auto
  h4
    font-size 18px
    font-weight normal
    color #fff
  a
    color rgba(255,255,255,.6)
  a:hover
    color #fff
  ul
    padding-left 0
  li
    list-style-type none
  .sponsor li
    margin 15px 0
    opacity: 0.7
    transition: all $trans-dura
    &:hover
      opacity: 1
  .share-btn
    display inline-block
    width 40px
    height 40px
    text-align center
    margin-left 0px
    margin-right 10px
    background-color rgba(255, 255, 255, 0.3)
    border-radius 100%
    opacity 0.5
    transition opacity 0.3s
    .iconfont
      font-size 18px
      color #fff
      line-height 40px
    &:hover
      opacity 1
  .share-btn.wechat:hover
    background-color #00D10D
  .share-btn.weibo:hover
    background-color #DF2029
  .share-btn.zhihu:hover
    background-color #0F88EB
  .share-btn.twitter:hover
    background-color #049FF6
  .share-btn.rss:hover
    background-color #F99726
  .share-btn.linkedin:hover
    background-color #0077B7
  .wechat-qr
    position absolute
    opacity 0
    top -10px
    left 50%
    transform translate(-50%, -90%) scale(0)
    transform-origin bottom
    transition all 0.2s
    box-shadow 0 5px 5px rgba(0, 0, 0, 0.3)
  .share-btn.wechat:hover
    .wechat-qr
      opacity: 1
      transform: translate(-50%, -100%) scale(1)
.footer-copyright
  color #5B5B5B
  background-color #000
  line-height 55px
  overflow hidden
  a
    color #5B5B5B
    &:hover
      color #dcdcdc
  .info-icp
    float left
  .info-copyright
    float right
</style>
