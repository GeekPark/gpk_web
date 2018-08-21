<template lang="pug">
#vmenu
  dl
    dt 栏目
    dd
      a(href="/column/81") 极客之选
    dd
      a(href="/column/85") 产品观察
    dd
      a(href="/column/250") 极客出行
    dd
      a(href="/column/177") 顶楼TopView
    dd
      a(href="/column/261") Intelligence Plus
    dd
      a(href="/column/170") 挖App
    dd
      a(href="/column/251") 图赏
    dd
      a(href="/column/91") 极客指南
  dl
    dt 关于
    dd
      a(title="关于极客公园" href="/about") 关于极客公园
    dd
      a(title="寻求报道" href="/report") 寻求报道
    dd
      a(title="加入我们" href="/zhuanti/job/") 加入我们
    dd
      a(title="友情链接" href="/about#links") 友情链接
    dd
      a(title="App下载" href="http://a.app.qq.com/o/simple.jsp?pkgname=net.geekpark.geekpark" target="_blank") App下载
  dl
    dt 项目
    dd
      a(href="http://events.geekpark.net" target="_blank") 活动
    dd
      a(href="http://f.geekpark.net" target="_blank") 前沿社
  .users
    .username#user-avatar(v-if="userInfo")
      img(v-lazy="userInfo.avatar_url" w=48 h=48)
      a.logout(@click="logout") 退出登录
    a.signin(v-else, @click="login") 登录/注册
</template>

<script>
export default {
  name: 'vmenu',
  props: ['logout', 'login'],
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
@import "../stylus/var.styl";
#vmenu
  background #5B5B5B
  color #fff
  position fixed
  top 45px
  left 0
  right 0
  bottom 0
  height calc(100vh - 45px)
  display flex
  align-content flex-start
  justify-content center
  flex-wrap wrap
  width 100%
  padding 15px 0
  a
    color #fff
  dl
  .users
    text-align left
    width 28%
    margin 0 5%
    dt
      border-bottom 1px solid #fff
      line-height 3
      font-size 16px
      margin-bottom 15px
    dd
      font-size 14px
      margin 10px 0
      line-height 2
  .users
    display flex
    // justify-content center
    align-items flex-end
  .username
    margin 8px 0 0px 0
    text-align center
    font-size 16px
    img
      width 48px
      height 48px
      border-radius 50%
  .logout
    display block
    margin-top 10px
  a.signin
    color #0185f2
</style>
