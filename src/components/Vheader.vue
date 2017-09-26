<template lang="jade">
#header
  header.header(class="hidden-xs")
    .container.relative
      .logo
        router-link(to="/")
          img.logo-img(src="../assets/imgs/copyright.png")
        //- = render 'shared/v2/doodle'
      nav.nav
        a.active(href="/") 资讯
        a(href="//events.geekpark.net" target="_blank") 活动
        a(href="http://f.geekpark.net" target="_blank") 前沿社
      a#search-btn.search-btn(href="javascript:;", :class="showsearch ? 'is-open' : ''", @click="showsearch = !showsearch")
        i.iconfont.icon-search(v-if="!showsearch")
        i.iconfont.icon-close(v-else)
      template(v-if="userInfo")
        #js-message.message.dib(@click="dropmessage")
          i.iconfont.icon-notice
          .subpanel.msg-content.js-msg-content
            .no-message(v-if="message.length < 1") 您还没有消息呢，快去留言互动吧！
            template(v-else)
              .msg-header
                .title 通知
                a.btn.read-all.js-read-all.hidden(v-if="true", href="javascript:;") 标记为已读
              .msg-menu.js-msg-menu
                ul.msg-list
                  li(v-for="mg in message")
                    | {{mg.content}}
                a.btn.load-more.js-load-more.hidden(href="javascript:;") 加载更多
                span.hidden 没有更多消息了..
        .username.dib#user-avatar(@click="dropmenu")
          img(:src="userInfo.avatar_url")
          ul#user_actions.subpanel.usermenu
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

  header.m-header(class="hidden-notxs")
    a.m-button.sidebar-button.open#open(:class="showmenu ? 'opened' : ''", @click="showmenu = !showmenu")
      i.iconfont.icon-menu(v-if="!showmenu")
      i.iconfont.icon-close(v-else)
    .logo
      router-link(to="/")
        img.logo-img(src="../assets/imgs/copyright.png")
    Vmenu(v-if="showmenu", :logout="logout", :login="login")
    a.m-button.search-btn.search-icon-anim(:class="showsearch ? 'opened' : ''", @click="showsearch = !showsearch")
      i.iconfont.icon-search(v-if="!showsearch")
      i.iconfont.icon-close(v-else)
  search(v-if="showsearch")
</template>

<script>
import api from 'stores/api'
import clickAtOutside from 'click-at-outside'
import Vmenu from './Vmenu.vue'
import Search from './Search.vue'

let access_key

export default {
  name: 'vheader',
  components: { Vmenu, Search },
  data () {
    return {
      userInfo: localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')),
      showmenu: false,
      showsearch: false,
      activeIndex: "1",
      message: [],
    }
  },
  methods: {
    dropmenu() {
      const $dom = $('#user-avatar')
      $dom.toggleClass('expand')
      // $('body').css('cursor', 'pointer')
      const cancle = clickAtOutside(
        $dom.get(0),
        () => {
          $dom.removeClass('expand')
          cancle()
        }
      )
    },
    dropmessage() {
      const $dom = $('#js-message')
      $dom.toggleClass('expand')
      // $('body').css('cursor', 'pointer')
      const cancle = clickAtOutside(
        $dom.get(0),
        () => {
          $dom.removeClass('expand')
          cancle()
        }
      )
    },

    cleanUser() {
      localStorage.removeItem('userInfo')
      this.$store.state.access_key = null
      this.$store.state.userInfo = null
      this.userInfo = null
    },

    getUser() {
      api.get(`admin/info?access_key=${access_key}`).then((result) => {
        this.$store.state.userInfo = result.data
        this.userInfo = result.data
        localStorage.setItem('userInfo', JSON.stringify(result.data))
      }).catch((err) => {
        this.$message.error(err.toString())
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
      api.account.get(`api/v1/notifications/all?access_key=${access_key}`).then((result) => {
        this.message = result.data
      }).catch((err) => {
        console.log(err)
        // this.$message.error(err.toString())
      })
    },
    readMessage() {
      api.account.post(`api/v1/notifications/read?access_key=${access_key}`).then((result) => {
        console.log('readMessage', result.data)
      }).catch((err) => {
        this.$message.error(err.toString())
      })
    },
    readAllMessage() {
      api.account.post(`api/v1/notifications/read_all?access_key=${access_key}`).then((result) => {
        console.log('readAllMessage', result.data)
      }).catch((err) => {
        this.$message.error(err.toString())
      })
    }
  },
  beforeMount () {
    access_key = this.$store.state.access_key
    if (access_key) {
      this.getUser()
      this.getMessage()
    } else {
      this.cleanUser()
    }
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
      .subpanel
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
    &.expand
      .subpanel
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
      min-height 40px
      border-bottom 1px solid #efefef
      padding-bottom 8px
      margin-bottom 8px
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
      .avatar::after
        content ''
        width 6px
        height 6px
        position absolute
        top -3px
        right -3px
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