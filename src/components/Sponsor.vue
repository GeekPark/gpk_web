<template lang="jade">
.sponsor(v-if="adShow && ads.length", :class="'ads-' + position")
  .ads-container.swiper-container(:class="position")
    .swiper-wrapper
      .swiper-slide(v-for="item in ads")
        a(@click="saveClick(item.ad.id)", :href="item.ad.link", target="_blank")
          img(:src="item.ad.cover_url")
  i.icon-ad 广告
  i.iconfont.icon-close(@click="closeAd", title="不再显示")
    span 不再显示
</template>

<script>
require('swiper/dist/css/swiper.min.css');
import Swiper from 'swiper';
import api from 'stores/api'

export default {
  name: 'sponsor',
  props: ['position'],
  data () {
    return {
      adShow: true,
      ads: []
    }
  },
  watch: {
    'ads': function(val, oldVal) {
      if (val[this.position] && val[this.position].length > 1) {
        setTimeout(()=>{
          let se = `.ads-container.${this.position}`
          new Swiper(se, {
            // effect: 'fade',
            autoplay: 5000,
          })
        }, 500);
      }
    }
  },
  methods: {
    fetch () {
      api.get(`ads`).then((result) => {
        let data = result.data[this.position] || []
        this.ads = data.filter(item => !localStorage.getItem(`ad_${item.ad.id}`))
      }).catch((err) => {
        this.$message.error(err.toString())
      })
    },
    saveClick (id) {
      api.get(`ads/${id}/click`)
      return true
    },
    closeAd: function () {
      this.adShow = false
      localStorage.setItem(`ad_${this.ads[0].ad.id}`, "1")
    }
  },
  beforeMount () {
    this.fetch()
  }
}
</script>

<style lang="stylus" scoped>
@import "../stylus/var.styl"
.sponsor
  border 1px solid #ececec
  width 100%
  background-color #ececec
  height 0px
  padding-bottom 10.619469%
  overflow hidden
  position relative
  display block
  transform scale(1)
  &:hover
    filter brightness(102%) contrast(115%)
    i.icon-close
      opacity 1
  img
    width 100%
  i
    position absolute
    right 0
    color #FFF
    font-size 10px
    font-style normal
    line-height 1.5
    transition all $trans-dura
    transform-origin right top
    z-index 8
    &::after
      vertical-align top
  i.icon-ad
    bottom 0
    padding 0 .5em
    background rgba(0,133,242,.2)
  i.icon-close
    background rgba(0,0,0,.2)
    cursor pointer
    margin 0
    padding 0 .5em
    top 0
    opacity 0
    span
      padding-left .5em
      display none
    &:hover
      span
        display inline
  &.ads-top_banner
    margin-bottom 10px
  &.ads-medium_up,
  &.ads-medium_below,
  &.ads-post
    // padding-bottom 87.3%
    margin-bottom 50px
    padding 0
    height auto
    .swiper-container
      position static
      height auto
  .swiper-container
    position absolute
    top 0
    width 100%
    height 100%
  @media screen and (max-width: 767px)
    display none
</style>

