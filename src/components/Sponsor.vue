<template lang="pug">
.sponsor(v-if="adShow && ads.length", :class="'ads-' + position")
  .ads-container.swiper-container(:class="position")
    .swiper-wrapper
      .swiper-slide(v-for="item, ad_ind in ads", :key="`ad_${position}_${ad_ind}`")
        a(@click="saveClick(item.ad.id)" :href="item.ad.link" target="_blank" data-track-category="ad" :data-track-label="`${position} ${item.ad.title} ${item.ad.link}`")
          img.exposure_link(v-if="item.ad.exposure_link", :src="item.ad.exposure_link")
          img(:src="item.ad.cover_url")
        i.iconfont.icon-close(@click="closeAd(item.ad.id)" title="不再显示" data-track-category="ad.close" :data-track-label="`${position}`")
          span 不再显示
  //- i.icon-ad 广告
</template>

<script>
require('swiper/dist/css/swiper.min.css')
import Swiper from 'swiper/dist/js/swiper.js'
import api from 'store/api'

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
      if (val && val.length > 1) {
        setTimeout(()=>{
          var adSwiper = new Swiper(`.ads-container.${this.position}`, {
            // effect: 'fade',
            autoplay: {
              delay: 3000,
              stopOnLastSlide: false,
              disableOnInteraction: true
            },
            loop: true
          })

          $(".swiper-container").mouseenter(function() {
            adSwiper.autoplay.stop();
          });

          $(".swiper-container").mouseleave(function() {
            adSwiper.autoplay.start();
          });
        }, 500)
      }
    }
  },
  methods: {
    fetch () {
      api.get(`ads`).then((result) => {
        let data = result.data[this.position] || []
        this.ads = data.filter(item => !localStorage.getItem(`ad_${item.ad.id}`))
      }).catch((err) => {
        // this.$message.error(err.toString())
      })
    },
    saveClick (id) {
      api.get(`ads/${id}/click`)
      return true
    },
    closeAd: function (id) {
      this.adShow = false
      localStorage.setItem(`ad_${id}`, "1")
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
    // filter brightness(102%) contrast(115%)
    i.icon-close
      opacity 1
  .swiper-slide
    position relative
  .exposure_link
    position absolute
    width 1px
    height 1px
    left 0
    top 0
  img
    width 100%
    position relative
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
  &.ads-web_post
    padding-bottom 26.38%
    margin-bottom 50px
  &.ads-post_under
    padding-bottom 17.15%
    margin-bottom 30px
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

