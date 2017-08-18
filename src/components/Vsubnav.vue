<template lang="jade">
.sub-nav
  .container
    a(href="/column/81") 极客之选
    a(href="/column/85") 产品观察
    a(href="/column/250") 极客出行
    a(href="/column/170") 挖App
    a(href="/column/251") 图赏
    a(href="/column/91") 极客指南
    a(href="/column/217") 极客制造
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

<style lang="stylus" scoped>
@import "../stylus/var.styl";
.sub-nav
  background #F6F6F6
  a
    display inline-block
    margin-right 1.5em
    line-height 48px
    font-size 18px
</style>

