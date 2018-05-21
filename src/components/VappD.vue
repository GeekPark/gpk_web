<template lang="pug">
a.OpenInAppButton.linkedme(:href="url" data-track-category="app" data-track-label="App 内打开")
  | App 内打开
</template>

<script>
export default {
  name: 'vapp',
  data () {
    return {
      url: 'http://a.app.qq.com/o/simple.jsp?pkgname=net.geekpark.geekpark'
    }
  },
  mounted() {
    this.getUrl()
  },
  methods: {
    getUrl () {
      var _this = this
      linkedme.init("0bd47e7101366093a027cc6ea662d018", {type: "live"}, null)
      var initData = {}
      initData.type = "live"
      var value1 = this.$route.path === '/' ? 'index' : 'detail'
      var value2 = this.$route.params.id
      initData.params = '{"type":"'+value1+'","topicId":"'+value2+'"}'
      linkedme.link(initData, function(err, response){
        if(err){
          // console.log('linkedme err', err)
        } else {
          _this.url = response.url
          // console.log('linkedme ok', response, response.url)
        }
      }, false)
    }
  }
}
</script>

<style lang="stylus">
  .OpenInAppButton
    display none
  @media screen and (max-width: 767px)
    .OpenInAppButton
      position fixed
      top auto
      bottom 0
      left 50%
      z-index 100
      display block
      width 105px
      font-size 15px
      font-weight 500
      line-height 36px
      color #fff
      text-align center
      background #0084ff
      border-radius 18px
      // transform translate(-50%,200%)
      box-shadow 0 2px 5px rgba(0,0,0,.25)
      transition transform .3s .3s
      border none
      transform translate(-50%,-25px)
</style>
