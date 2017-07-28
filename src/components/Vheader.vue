<template lang="jade">
#vheader
  header.header(v-if="!isMobileUA")
    .container.relative.tac
      .logo
        router-link(to="/")
          img.logo-img(src="../assets/imgs/copyright.png")
        //- = render 'shared/v2/doodle'
      .right-col
        nav.nav.dib-middle(data-track-category="nav.global" data-track-item="a.nav-link")
          a.nav-link.active(href="/") 资讯
          a.nav-link(href="//events.geekpark.net" target="_blank") 活动
          a.nav-link(href="http://f.geekpark.net" target="_blank") 前沿社
        .header-right
          //- .search.dib-middle#top-search(data-action=search_path data-track-category="site.search")
          //-   a.search-btn.search-icon-anim(href="javascript:;")
          //-     i.iconfont.icon-search
          .account-action.dib-middle
            .username.dib-top#user-avatar(v-if="userInfo", @click="dropmenu")
              img(:src="userInfo.avatar_url")
              ul#user_actions.subpanel.usermenu
                li
                  a(href="/user/like")
                    i.fa.fa-user
                    | 我喜欢的
                li
                  a(href="https://account.geekpark.net")
                    i.fa.fa-cog
                    | 用户设置
                li(v-if="userInfo.roles.indexOf('admin') > -1")
                  a(href="http://admin.geekpark.net")
                    i.fa.fa-unlock
                    | 公园后台
                li
                  a.logout(@click="logout")
                    i.fa.fa-sign-out
                    | 退出登录
            a.signin(v-else, @click="login") 登录
  
      //- - if current_user
      //-   - notification_collection = current_user.notifications.includes(:content).order(id: :desc).limit(10)
      //-   .message.js-message.dib-top href="javascript:;" class="#{current_user.notifications.unread.present? ? 'high' : ''}"
      //-     i.iconfont.icon-message.did-top
      //-     .subpanel.msg-content.js-msg-content
      //-       - if notification_collection.empty?
      //-         .no-message 您还没有消息呢，快去留言互动吧！
      //-       - else
      //-         .msg-header
      //-           .title 通知
      //-           - if current_user.notifications.unread.present?
      //-             a.btn.read-all.js-read-all href="javascript:;" 标记为已读
      //-         .msg-menu.js-msg-menu
      //-           ul.msg-list
      //-             = render partial: 'notifications/notification', collection: notification_collection
      //-           a.btn.load-more.js-load-more href="javascript:;" 加载更多
      //-           span.hidden 没有更多消息了..
  header.m-header(v-else)
    a.sidebar-button.open#open(@click="showmenu = !showmenu")
      i.fa.fa-bars(v-if="!showmenu")
      i.iconfont.icon-close(v-else)
    .logo
      router-link(to="/")
        img.logo-img(src="../assets/imgs/copyright.png")
    Vmenu(v-if="showmenu", :logout="logout", :login="login")
    //- div.search-btn-wrapper#top-search(href="javascript:;" data-track-category="site.search")
    //-   a.search-btn.search-icon-anim(href="javascript:;")
    //-     i.iconfont.icon-search

</template>

<script>
import api from 'stores/api'
import $   from 'jquery'
import clickAtOutside           from 'click-at-outside'
import { isWechat, isMobileUA } from 'mdetect';
import Vmenu from './Vmenu.vue'

export default {
  name: 'vheader',
  components: { Vmenu },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    isMobileUA () {
      return isMobileUA()
    }

  },
  data () {
    return {
      showmenu: false,
      activeIndex: "1",
      routes: [
      ]
    }
  },
  mounted() {
    // this.getToken();
  },
  methods: {
    dropmenu() {
      const $dom = $('#user-avatar');
      $dom.addClass('expand');
      $('body').css('cursor', 'pointer');

      const cancle = clickAtOutside(
        $dom.get(0),
        () => {
          $dom.removeClass('expand');
          cancle();
        }
      );
    },
    getToken() {
      api.account.get('/my/access_key').then((result) => {
        if (result.status === 200 && result.data.access_key) {
          this.$store.state.access_key = result.data.access_key;
          this.getUser();
        } else {
          this.cleanUser();
        }
      }).catch((err) => {
        console.log(err);
      });
    },

    cleanUser() {
      localStorage.removeItem('userInfo');
      this.$store.state.access_key = null;
      this.$store.state.userInfo = null;
    },

    getUser() {
      api.get(`admin/info?access_key=${this.$store.state.access_key}`).then((result) => {
        this.$store.state.userInfo = result.data;
        localStorage.setItem('userInfo', JSON.stringify(result.data));
      }).catch((err) => {
        console.log(err);
      })
    },

    logout() {
      try {
        api.account.delete(`http://192.168.2.5:81/logout`)
      }
      finally {
        this.cleanUser();
      }
      // const url = `${api.account.defaults.baseURL}logout?referrer=${encodeURIComponent(location.href)}&access_token=${this.$store.state.access_key}`;
      // window.location.href = url;
    },

    login() {
      const url = `${api.account.defaults.baseURL}login?callback_url=${encodeURIComponent(location.href)}`;
      window.location.href = url;
    }
  },
  beforeMount () {
    // this.userInfo = localStorage.getItem('userInfo')
    this.getToken();
  }
}
</script>

<style lang="stylus" scoped>
@import "../stylus/var.styl";

$headerHeight = 80px
$msg-w = 390px
$color-header-bg = #F6F6F6
$colorBlue = #0185F2;

scrollbar()
  &::-webkit-scrollbar
    width: 5px

  &::-webkit-scrollbar-track
    background-color: transparent

  &::-webkit-scrollbar-thumb 
    background-color: #efefef
    border-radius: 5px

triangleDown($color = #fff)
  &::after
    position absolute
    left 50%
    transform translate(-50%, 100%)
    bottom 0
    display block
    content ''
    border-left 10px solid transparent
    border-right 10px solid transparent
    border-top 10px solid $color

dib-middle()
  display inline-block
  vertical-align middle


.header
  background-color: $color-header-bg
  height: $headerHeight
  position: relative
  z-index: 200
  .logo
    position: absolute
    top: 0
    left: 0
    .logo-img
      margin: (($headerHeight - 40px) / 2) 0
      height: 40px
  .right-col
    float right
    margin-top 27px
  .nav
    position: relative
    z-index: 2
    .nav-link
      font-size 1.6rem
      line-height 30px
      font-weight bold
      color #000
      padding 20px
      position relative
      transition: $trans-dura
      text-decoration: none
      &::after
        position: absolute
        content: ''
        bottom: 0
        left: 0
        width: 100%
        height: 4px
        background-color: $colorBlue
        transform: scaleY(0)
        transform-origin: bottom
      &:hover,
      &.active
        color: $colorBlue
        &::after
          transform: scaleY(1)
    .nav-link.gif-link
      color: #ffcd02
      font-size: 1.8rem
      &::after
        background-color: #ffcd02
  .header-right
    display: inline-block
    color: #000
    line-height 30px


  .message
    position: relative
    display: inline-block
    margin-right: 12px
    cursor: pointer
    color: #fff
    .subpanel.active
      opacity: 1
      visibility: visible
      transform: translateY(0)
      transition: all 0.3s ease
    .icon-message
      position: relative
      top: -1px
      font-size: 1.8rem
      margin: 0 12px
    .count
      font-size: 1.5rem
    .msg-content
      width: $msg-w
      padding: 0
      color: #000
      cursor: default
      &::after
        right: 15px
  .message.high
    .icon-message::after
      content: ''
      width: 6px
      height: 6px
      position: absolute
      top: -3px
      right: -3px
      background-color: #f00
      border-radius: 100%
  .msg-header
    text-align: left
    padding: 10px 8px
    border-bottom: 1px solid rgba(0, 0, 0, 0.12)
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.12)
    line-height: 1.5
    .title
      display: inline-block
      font-weight: bold
  .no-message
    margin: 10px 0
  .btn
    display: inline-block
    padding: 2px 10px
    border: 1px solid #a1a1a1
    letter-spacing: 1px
    font-size: 1.4rem
    border-radius: 25px
    color: #666
    background-color: #fff
    transition: all 0.3s
    &.read-all
      float: right
      transform: translateY(-2px)
    &:hover
      color: #444
      border-color: #444
  .msg-menu
    position: relative
    padding: 12px
    margin: 0
    max-height: 400px
    overflow: auto
    scrollbar()
    li
      position: relative
      min-height: 40px
      border-bottom: 1px solid #efefef
      padding-bottom: 8px
      margin-bottom: 8px
    .avatar
      width: 35px
      position: absolute
      top: 0
      left: 0
    img
      width: 100%
      border-radius: 8px
      border: 1px solid #f0f0f0
    div
      line-height: 1.5
      text-align: left
      padding-left: 50px
      a
        color: #7d7d7d
    li.new
      .avatar::after
        content: ''
        width: 6px
        height: 6px
        position: absolute
        top: -3px
        right: -3px
        background-color: #f00
        border-radius: 100%
    .load-more
      line-height: 1.7
  ul
    list-style-type: none
    padding: 0
    margin: 0
  .msg-content::before
    content: ''
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    height: 20px
    background: linear-gradient(rgba(255, 255, 255, 0), white)
    z-index: 10
  .account-action
    margin-left 1em
  .signin
    background #000
    display inline-block
    height 100%
    color #fff
    padding 0 1em
    &:hover
      color #fff

  .subpanel
    padding: 5px 0
    opacity: 0
    visibility: hidden
    line-height: 35px
    background-color: #fff
    list-style-type: none
    padding-left: 0
    position: absolute
    top: 100%
    right: 0
    margin: 0
    z-index: 40
    width: 120px
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3)
    transform: translateY(10px)
    transition: all 0.3s ease
    triangleDown()
    &::after
      left: auto
      right: 8px
      bottom: auto
      top: -7px
      transform: rotate(180deg)


  .username
    cursor: pointer
    position: relative
    img
      border-radius: 100%
      width: 35px
      height: 35px
    .usermenu
      padding 10px 20px
      width 70px
      &::after
        right: 8px
      a
        color: #000
      a:hover
        color: $colorBlue
      li
        border-bottom 1px solid rgba(0,0,0,.1)
        &:last-child
          border none
    &.expand
      .subpanel
        opacity: 1
        visibility: visible
        transform: translateY(0)
        transition: all 0.3s ease


  // search btn
  .search-btn
    position: relative
    width: 32px
    height: 32px
    display: inline-block
    vertical-align: middle
    text-align: center
    line-height: 32px
    cursor: pointer
    padding: 0 12px
    &,
    &:hover,
    &:focus
      color: #000
    .icon-search
      font-size: 2rem
    .iconfont
      position: absolute
      right: 20%
    .icon-close::before
      position: relative
      right: 3px
      top: 1px
  .search-icon-anim
    .iconfont
      transition: all $trans-dura
      transform: scale(0) rotate(180deg)
  .search-btn.is-open .icon-close,
  .search-btn:not(.is-open) .icon-search
    transform: scale(1) rotate(0)
</style>

<style lang="stylus" scoped>
@import "../stylus/var.styl";
$header-h = 45px
.m-header
  border 1px solid rgba(0,0,0,0.1)
  position fixed
  top 0
  z-index: 101
  width: 100%
  will-change: transform
  transition: transform 0.4s
  background-color: #fff
  transform: translate3d(0, 0, 0)
  height: $header-h
  display: flex
  justify-content: center
  align-items: center
  color #000
  .logo
    display: inline-block
    z-index: 1
  .logo-img
    height: 25px
  a
    color: #000
  .iconfont
    font-size: 2rem

.sidebar-button
  position: absolute
  line-height: $header-h
  transform: scale(1) rotate(180deg)
  transition: all $trans-dura
  width: 30px
  left: 0
  z-index: 2

</style>