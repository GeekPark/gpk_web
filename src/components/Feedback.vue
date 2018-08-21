<template lang="pug">
#feedback
  .container.clear
    .wr-fx
      .fixed-tools(:class="{'show': tools}")
        //- .if2018-entry(v-show="!if_session" :class="{'hide': if_entry}")
          a.if2018-gif(href="http://if.geekpark.net" target="_blank")
            img(src='../assets/imgs/if2018.gif')
          .entry-close(@click="hideIf")
            i.iconfont.icon-close
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
                img(src='//imgslim.geekpark.net/image/newgeekpark/qr_geekpark.jpg', alt='极客公园')
                p 用极客视角，追踪你最不可错过的科技圈。
            .panel(:class="{active: qrindex == 2}")
              .img
                img(src='//imgslim.geekpark.net/image/newgeekpark/qr_geekchoice.jpg', alt='极客之选')
                p 新鲜、有趣的硬件产品，第一时间为你呈现。
            .panel(:class="{active: qrindex == 3}")
              .img
                img(src='//imgslim.geekpark.net/image/newgeekpark/qr_topview.jpg', alt='顶楼')
                p 关注前沿科技，发表最具科技的商业洞见。
        a.tools-item(@click="dialogFormVisible = true", data-tooltip="意见反馈")
          i.iconfont.icon-feedback
        a.tools-item.gotop(@click="pageScroll", data-tooltip="返回顶部")
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
import api from 'store/api'

export default {
  name: 'feedback',
  data () {
    return {
      qrindex: 1,
      dialogFormVisible: false,
      nowPanel: false,
      fb_content: '',
      fb_email: '',
      if_entry: false,
      tools: false,
      if_session: false
    }
  },
  mounted(){
    this.if_session = sessionStorage && sessionStorage.getItem('if_entry')
    window.addEventListener('scroll', () => {
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      this.tools = scrollTop > 800
    })
  },
  methods: {
    hideIf () {
      this.if_entry = true
      window.sessionStorage.setItem('if_entry', true)
    },
    changeTab (index) {
      this.qrindex = index
    },
    pageScroll () {
      $("html, body").animate({scrollTop:0}, '500')
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
  beforeMount () {
  }
}
</script>

<style lang="stylus">
[data-tooltip]
  position relative
  z-index 2
  cursor pointer

[data-tooltip]:before,
[data-tooltip]:after
  visibility hidden
  opacity 0
  pointer-events none

[data-tooltip]:before
  position absolute
  right 45px
  top 2px
  padding 7px 12px
  background-color #F6F6F6
  color #000
  content attr(data-tooltip)
  text-align center
  font-size 14px
  line-height 1.2
  font-weight 500
  width 60px

[data-tooltip]:after
  position absolute
  right 38px
  top 8px
  width 0
  border-top 10px solid transparent
  border-bottom 10px solid transparent
  border-left 10px solid #F6F6F6
  content " "
  font-size 0
  line-height 0

[data-tooltip]:hover:before,
[data-tooltip]:hover:after
  visibility visible
  opacity 1

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

.if2018-entry
  position absolute
  right 45px
  top 10px
  width 100px
  transition all .2s ease
  &.hide
    transform translateY(150%) scale(0)
  .if2018-gif
    width 100%
    height 100px
    display block
    border-radius 50%
    box-shadow 1px 5px 5px rgba(0,0,0,.3)
    img
      width 100%
  .entry-close
    background #ccc
    position absolute
    left -20px
    width 22px
    height 22px
    top 0
    border-radius 50%
    color #fff
    line-height 22px
    text-align center
    font-size 10px
    cursor pointer
.wr-fx
  float right
  margin-right -15px
  @media screen and (max-width: 1024px)
    display none
.fixed-tools
  position fixed
  top 60%
  z-index 50
  display none
  opacity 0
  transition all .3s
  &.show
    opacity 1
    display block
  .tools-item
    margin 12px 0
    color #5B5B5B
    border 2px solid rgba(91,91,91,.6)
    border-radius 50%
    background #fff
    font-size 15px
    display block
    width 32px
    height 32px
    line-height 32px
    text-align center
    cursor pointer
    transition all .3s
    z-index 2
    position relative
    &:hover
      color #333
    .icon-feedback
      vertical-align -2px
  .tools-erweima:hover + .qr-group, .qr-group:hover
    visibility visible
    opacity 1
    transform translate(0, 0px)
  .qr-group
    position absolute
    right 35px
    top -60px
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
</style>
