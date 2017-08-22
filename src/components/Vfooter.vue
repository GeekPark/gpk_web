<template lang="jade">
footer.page-footer#footer
  .footer-wrap
    .container
      section.contact
        h4 联系我们
        p 联系电话：8610-84599761
        p 联系邮箱：
          a.normal-link(href="mailto:contact@geekpark.net") contact@geekpark.net
        p 公司地址：北京市朝阳区酒仙桥路4号751 D·Park 正东集团院内 C8座105室 极客公园
        p 关注我们
          a.weibo.share-btn(href="//weibo.com/geekpark" target="_blank" data-track-label="weibo")
            .iconfont.icon-weibo
          a.twitter.share-btn(href="//twitter.com/geekparknet" target="_blank" data-track-label="twitter")
            .iconfont.icon-twitter
          a.wechat.relative.share-btn(href="javascript:;" data-track-label="wechat")
            .iconfont.icon-wechat
            .wechat-qr.triangle-down
              img(src='../assets/imgs/qrcode_wechat.jpg' alt="极客公园微信公众平台" width="120" height="120")
          a.rss.share-btn(href="/rss" target="_blank" data-track-label="rss")
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
            a(href="http://www.qiniu.com/" target="_blank")
              img(height="30" src='../assets/imgs/qiniu.png')
          li
            a(href="https://www.qingcloud.com/" target="_blank")
              img(height="25" src='../assets/imgs/qingyun.png')
          li
            a(href="http://www.bokecc.com/" target="_blank")
              img(height="25" src='../assets/imgs/cc.png')
      
      section.down
        h4 APP下载
        p
          img(height="100" src='../assets/imgs/qrcode_app.jpg')

  .footer-copyright
    .container
      .info-icp
        | 京ICP备 13016923号-2 &nbsp;&nbsp;京公网安备 110105001682号
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
.footer-wrap
  background-color #1e1e1e
  padding 60px 0 40px
  color #fff
  line-height 1.7
  section
    display inline-block
    vertical-align top
    margin-right 100px
    font-size 14px
  .contact
    width 350px
  h4
    font-size 18px
    font-weight normal
  a
    color #fff
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
    display: inline-block
    width: 40px
    height: 40px
    text-align: center
    margin-left: 10px
    background-color: rgba(255, 255, 255, 0.3)
    border-radius: 100%
    opacity: 0.5
    transition: opacity 0.3s
    .iconfont
      font-size: 2.4rem
      color: rgba(255, 255, 255, 1)
      line-height: 40px
    &:hover
      opacity: 1
  .wechat-qr
    position absolute
    opacity: 0
    top: -5px
    left: 50%
    transform: translate(-50%, -90%) scale(0)
    transform-origin: bottom
    transition: all 0.2s
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3)
  .wechat.share-btn:hover
    .wechat-qr
      opacity: 1
      transform: translate(-50%, -100%) scale(1)
.footer-copyright
  color: #5B5B5B
  background-color: #000
  line-height: 55px
  overflow hidden
  .info-icp
    float left
  .info-copyright
    float right

.trademark
  display: block
  .old-logo
    margin-left: 5px
  .detail
    top: -100px
    left: 50%
    width: 245px
    text-align: center
    opacity: 0
    padding: 10px
    border: 1px solid #efefef
    transform: scale(0) translateY(0)
    background-color: #fff
    color: #222
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.3)
    transform-origin: bottom center
    transition: all 0.2s
  &:hover .detail
    opacity: 1
    transform: scale(1) translateY(-10%)
</style>
