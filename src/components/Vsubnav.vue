<template lang="jade">
.sub-nav
  .container
    a(href="/column/81" target="_blank") 极客之选
    a(href="/column/85" target="_blank") 产品观察
    a(href="/column/250" target="_blank") 极客出行
    a(href="/column/170" target="_blank") 挖App
    a(href="/column/251" target="_blank") 图赏
    a(href="/column/91" target="_blank") 极客指南
    a(href="/column/217" target="_blank") 极客制造
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
  border-bottom 1px solid #F6F6F6;
  a
    display inline-block
    margin-right 1em
    line-height 60px
    font-size 18px
</style>

