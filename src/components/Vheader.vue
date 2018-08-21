<template lang="pug">
#header
  header.header(class="hidden-xs")
    .container.relative
      .logo
        a.active(href="/" data-track-category="site.logo")
          img.logo-img(src="//imgslim.geekpark.net/image/newgeekpark/copyright.png")
      nav.nav(data-track-category="nav.global" data-track-item="a")
        a.active(href="/") 资讯
        a(href="http://events.geekpark.net" target="_blank") 活动
        a(href="http://f.geekpark.net" target="_blank") 前沿社
      a#search-btn.search-btn(href="javascript:;" :class="showsearch ? 'is-open' : ''" @click="showsearch = !showsearch" data-action="search" data-track-category="site.search")
        i.iconfont.icon-search(v-if="!showsearch" key="search-icon")
        i.iconfont.icon-close(v-else)
      template(v-if="userInfo")
        #js-message.message.dib(:class="{high: num > 0}" @click="messageMenu = !messageMenu" ref='userMessage')
          i.iconfont.icon-notice
          .subpanel.msg-content.js-msg-content(:class="{ expand: messageMenu }")
            .no-message(v-if="message.length < 1" key="message-null") 您还没有消息呢，快去留言互动吧！
            template(v-else)
              .msg-header
                .title 通知
                a.btn.read-all.js-read-all.hidden(href="javascript:;") 标记为已读
              .msg-menu.js-msg-menu
                ul.msg-list
                  li(:class="{new: mg.unread}" v-for="mg in message")
                    a(@click="readMessage(mg.id, `/news/${mg.direct_id}#comment`, mg.unread)") {{mg.content}}
                a.btn.load-more.js-load-more.hidden(href="javascript:;") 加载更多
                span.hidden 没有更多消息了..
        .username.dib#user-avatar(@click="userMenu = !userMenu" ref='userActions')
          img(v-lazy="userInfo.avatar_url" w=40 h=40)
          ul#user_actions.subpanel.usermenu(:class="{ expand: userMenu }")
            li
              a(href="/liked")
                | 我的喜欢
            li
              a(href="https://account.geekpark.net")
                | 用户设置
            li(v-if="userInfo.roles && userInfo.roles.indexOf('admin') > -1")
              a(href="http://www.geekpark.net/admin")
                | 公园后台
            li
              a.logout(@click="logout")
                | 退出登录
      a.signin(v-else, @click="login") 登录

  header.m-header.hidden-notxs(:class="{'hide-header': hideHeader}")
    a.m-button.sidebar-button.open#open(:class="showmenu ? 'opened' : ''", @click="showmenu = !showmenu")
      i.iconfont.icon-menu(v-if="!showmenu")
      i.iconfont.icon-close(v-else)
    .logo
      a(href="/")
        img.logo-img(src="//imgslim.geekpark.net/image/newgeekpark/copyright.png")
    Vmenu(v-if="showmenu", :logout="logout", :login="login")
    a.m-button.search-btn.search-icon-anim(:class="showsearch ? 'opened' : ''", @click="showsearch = !showsearch")
      i.iconfont.icon-search(v-if="!showsearch")
      i.iconfont.icon-close(v-else)
  search(v-if="showsearch")
</template>

<script>
import api from 'store/api'
// import clickAtOutside from 'click-at-outside'
import Vmenu from './Vmenu.vue'
import Search from './Search.vue'

let access_key

export default {
  name: 'vheader',
  components: { Vmenu, Search },
  data () {
    return {
      userInfo: null,
      showmenu: false,
      showsearch: false,
      activeIndex: "1",
      message: [],
      num: 1,
      hideHeader: false,
      userMenu: false,
      messageMenu: false
    }
  },
  methods: {
    cleanUser() {
      localStorage.removeItem('userInfo')
      localStorage.removeItem('access_key')
      this.$store.state.access_key = null
      this.$store.state.userInfo = null
      this.userInfo = null
    },

    getUser() {
      api.get(`admin/info?access_key=${access_key}&roles=dev`).then((result) => {
        this.$store.state.userInfo = result.data
        this.userInfo = result.data
        localStorage.setItem('userInfo', JSON.stringify(result.data))
      }).catch((err) => {
        // this.$message.error(err.toString())
      })
    },

    logout() {
      try {
        api.account.delete(`logout`)
      }
      finally {
        this.cleanUser()
      }
    },

    login() {
      const url = `${api.account.defaults.baseURL}login?callback_url=${encodeURIComponent(location.href)}`
      window.location.href = url
    },
    getMessage() {
      let num = 0
      api.account.get(`api/v1/notifications/all?access_key=${access_key}`).then((result) => {
        this.message = result.data.filter(item => ['comment_post', 'comment'].indexOf(item.content_type) > -1 && item.parent_type !== 'question')
        this.num = this.message.filter(item => item.unread).length
      }).catch((err) => {
        // this.$message.error(err.toString())
      })
    },
    readMessage(id, url, unread) {
      api.account.post(`api/v1/notifications/${id}/read?access_key=${access_key}`).then((result) => {
        if (unread) {
          this.num--
        }
        window.location.replace(url);
      }).catch((err) => {
        // this.$message.error(err.toString())
      })
    },
    readAllMessage() {
      api.account.post(`api/v1/notifications/read_all?access_key=${access_key}`).then((result) => {
        console.log('readAllMessage', result.data)
      }).catch((err) => {
        // this.$message.error(err.toString())
      })
    }
  },
  mounted () {
    let _this = this
    if (this.$device.isMobile()) {
      let beforeT = 0, afterT = 0
      window.addEventListener('scroll', () => {
        afterT = document.body.scrollTop || document.documentElement.scrollTop
        this.hideHeader = afterT > 80 && beforeT < afterT
        beforeT = afterT
      })
    }
    api.account.get('/my/access_key?roles=dev').then((result) => {
      if (result.status === 200 && result.data.access_key) {
        // console.log(result.data)
        this.$store.state.access_key = result.data.access_key
        access_key = result.data.access_key
        localStorage.setItem('access_key', result.data.access_key)
        if (result.data.access_key) {
          this.getUser()
          this.getMessage()
          if (!this.$device.isMobile()) {
            document.addEventListener('click', function(e) {
              if (e && e.target) {
                if (!_this.$refs.userActions.contains(e.target)) {
                  _this.userMenu = false
                }
                if (!_this.$refs.userMessage.contains(e.target)) {
                  _this.messageMenu = false
                }
              }
            })
          }

        } else {
          this.cleanUser()
        }
      }
    }).catch((err) => {
    })
  }
}

function notification() {
  const $message = $('.js-message');
  const $msgContent = $message.find('.js-msg-content');
  const $msgMenu = $message.find('.js-msg-menu');
  const $allReadBtn = $message.find('.js-read-all');
  const $loadMoreBtn = $message.find('.js-load-more');
  const $msgList = $message.find('.msg-list');
  // 未读消息数量
  let num = $msgMenu.find('.new').length;
  // 请求页
  let loadPage = 2;

  // prevent body scroll when $msgMenu scroll
  lockScroll($msgMenu);

  clickAtOrigin($message, () => $msgContent.removeClass('active'));

  $message.on('click', () => {
    $msgContent.toggleClass('active');
  });

  $msgMenu.on('click', 'li.new a', function (e) {
    e.preventDefault();
    const $elem = $(this).parents('li');
    const url = $(this).attr('href');
    read($elem, url);
  });

  $allReadBtn.on('click', function () {
    readAll();
  });

  $loadMoreBtn.on('click', function () {
    loadMoreMsg($(this));
  });

  // 单个消息标记已读
  function read($elem, url) {
    const id = $elem.data('id');

    ajax({
      url: `/notifications/${id}/read`,
      type: 'PUT',
    }).done(() => {
      $elem.removeClass('new');
      num--;
      if (num === 0) $message.removeClass('high');
      window.location.replace(url);
    });
  }

  // 全部消息标记已读
  function readAll() {
    ajax({
      url: '/notifications/read_all',
      type: 'PUT',
    }).done(() => {
      $message.removeClass('high');
      $msgMenu.find('.new').removeClass('new');
    });
  }

  // 加载更多消息
  function loadMoreMsg($this) {
    ajax({
      url: '/notifications',
      data: { page: loadPage },
    }).done((data) => {
      loadPage++;
      if (data) {
        $msgList.append(data);
      } else {
        $this.addClass('hidden').siblings('span').removeClass('hidden');
      }
    });
  }
}
</script>

<style lang="stylus">
@import "../stylus/var.styl";
$headerHeight = 60px
$msg-w = 390px
$colorBlue = #0185F2

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
.subpanel
  padding 5px 0
  opacity 0
  visibility hidden
  line-height 35px
  background-color #fff
  list-style-type none
  padding-left 0
  position absolute
  top 100%
  right 0
  margin 0
  z-index 40
  width 120px
  box-shadow 0 0 8px rgba(0, 0, 0, 0.3)
  transform translateY(10px)
  transition all 0.3s ease
  triangleDown()
  &::after
    left auto
    right 0
    bottom auto
    top -7px
    transform rotate(180deg)

.header
  line-height $headerHeight
  // border-bottom 1px solid #F6F6F6;
  box-shadow 0 1px 2px rgba(0,0,0,.08)
  position relative
  z-index 200
  text-align right
  .logo
    position absolute
    top 0
    left 0
    .logo-img
      margin (($headerHeight - 27px) / 2) 0
      height 27px
      display block
  .nav
    display inline-block
    a
      font-size 1.6rem
      display inline-block
      font-weight bold
      color #000
      padding 0 10px
      margin 0 18px
      position relative
      transition $trans-dura
      text-decoration none
      &::after
        position absolute
        content ''
        bottom 0
        left 0
        width 100%
        height 4px
        background-color $colorBlue
        transform scaleY(0)
        transform-origin bottom
      &:hover,
      &.active
        color $colorBlue
        &::after
          transform scaleY(1)
  .username
    cursor pointer
    position relative
    img
      vertical-align middle
      display inline-block
      border-radius 100%
      width 40px
      height 40px
      border 1px solid #efefef
    .usermenu
      margin-top 0px
      padding 10px 20px
      width 70px
      &::after
        right 10px
      a
        color #000
      a:hover
        color $colorBlue
      li
        border-bottom 1px solid rgba(0,0,0,.1)
        text-align center
        &:last-child
          border none
      &.expand
        opacity 1
        visibility visible
        transform translateY(0)
        transition all 0.3s ease
  .signin
    background #000
    display inline-block
    color #fff
    padding 0 1em
    line-height 30px
    margin-left 1em
    &:hover
      color #fff

  .message
    position relative
    display inline-block
    margin-right 12px
    cursor pointer
    i
      font-size 1.2em
    .subpanel.expand
      opacity 1
      visibility visible
      transform translateY(0)
      transition all 0.3s ease
      text-align left
    .icon-notice
      position relative
      font-size 20px
      margin 0 10px 0 0
    .count
      font-size 1.5rem
    .msg-content
      width $msg-w
      padding 0
      color #000
      cursor default
      &::after
        right 15px
    &.high
      .icon-notice::after
        content: ''
        width: 6px
        height: 6px
        position: absolute
        top: -3px
        right: -3px
        background-color: #f00
        border-radius: 100%
  .msg-header
    padding 10px 8px
    border-bottom 1px solid rgba(0, 0, 0, 0.12)
    box-shadow 1px 1px 5px rgba(0, 0, 0, 0.12)
    line-height 1.5
    .title
      display inline-block
      font-weight bold
  .no-message
    text-align center
    margin 10px 0
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
    text-align center
    position relative
    padding 12px
    margin 0
    max-height 400px
    overflow auto
    scrollbar()
    li
      position relative
      border-bottom 1px solid #efefef
      padding 8px
      line-height 1.5
      text-align left
    .avatar
      width 35px
      position absolute
      top 0
      left 0
    img
      width 100%
      border-radius 8px
      border 1px solid #f0f0f0
    div
      line-height 1.5
      text-align left
      padding-left 50px
      a
        color #7d7d7d
    li.new
      &::before
        content ''
        width 4px
        height 4px
        position absolute
        left -1px
        top 40%
        background-color #f00
        border-radius 100%
    .load-more
      line-height 1.7
  ul
    list-style-type none
    padding 0
    margin 0

  // search btn
  .search-btn
    cursor pointer
    font-size 1.3em
    margin-right 20px
    line-height initial
    display inline-block
    width 1.5em
    text-align center
    i
      transition all $trans-dura
    &.is-open
      i
        transform scale(1) rotate(180deg)
        font-size 0.9em

.m-header
  box-shadow 0 1px 2px rgba(0,0,0,.08)
  position fixed
  top 0
  z-index 101
  width 100%
  line-height 45px
  text-align center
  font-size 18px
  background #fff
  transition all .3s
  &.hide-header
    transform-origin top
    opacity 0
    transform translateY(-100%)
  .logo-img
    height 25px
    display inline-block
    vertical-align middle
  .m-button
    position absolute
    line-height $header-h
    width 50px
    text-align center
    font-size 14px
    transition all $trans-dura
    .icon-search
      font-size 1.2em
    &.opened
      transform scale(1) rotate(180deg)
  .sidebar-button
    left 0
  .search-btn
    top 0
    right 0
</style>
