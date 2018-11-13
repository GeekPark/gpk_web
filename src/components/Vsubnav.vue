<template lang="pug">
.sub-nav(v-once data-track-category="nav.category" data-track-item="a")
  .container
    a(href="/column/81")
      span(data-hover="极客之选") 极客之选
    a(href="/column/85")
      span(data-hover="产品观察") 产品观察
    a(href="/column/250")
      span(data-hover="极客出行") 极客出行
    a(href="/column/177")
      span(data-hover="顶楼TopView") 顶楼TopView
    a(href="/column/261")
      span(data-hover="Intelligence Plus") Intelligence Plus
    a(href="/column/170")
      span(data-hover="挖App") 挖App
    a(href="/column/251")
      span(data-hover="图赏") 图赏
    a(href="/column/91")
      span(data-hover="极客指南") 极客指南
</template>

<script>
export default {
  name: 'vsubnav',
  computed: {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  beforeMount () {
  }
}
</script>

<style lang="stylus">
.sub-nav
  background #F6F6F6
  margin-bottom 10px
  padding 16px 0
  @media screen and (max-width: 767px)
    display none
  a
    position relative
    display inline-block
    outline none
    margin-right 1.5em
    font-size 16px
    height 1em
    overflow hidden
    &:hover span
      transform translateY(-100%)
    span
      position relative
      display inline-block
      transition transform 0.3s
      line-height 1.1em
      &:before
        position absolute
        top 100%
        content attr(data-hover)
        font-weight 500
        transform translate3d(0,0,0)
        box-sizing border-box
        white-space nowrap

</style>

