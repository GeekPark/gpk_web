<template lang="jade">
.container.sponsor-wrapper(v-if="adShow")
  .sponsor
    .sponsor-mult(v-if="ads.length > 1")
      .js-ads-container.ads-container
        .swiper-wrapper
          .swiper-slide(v-for="ad in ads")
            a(v-bind:href="ad.url" target="_blank" v-bind:title="ad.title" data-track-category="ad" v-bind:data-track-label="[name, ad.title, ad.url].join(' ')")
              img(v-bind:src="ad.cover" data-vw=vw v-bind:alt="ad.title")
    template(v-else v-for="ad in ads")
      a(v-bind:href="ad.url" target="_blank" v-bind:title="ad.title" data-track-category="ad" v-bind:data-track-label="[name, ad.title, ad.url].join(' ')")
        img(v-bind:src="ad.cover" data-vw=vw v-bind:alt="ad.title")
    i.icon-ad
    i.icon-ad-close.js-ad-close(data-track-category="ads[0].close" v-bind:data-track-label="[name, ads[0].title]" v-on:click="closeAd")
</template>

<script>
import Swiper from 'swiper';

export default {
  name: 'sponsor',
  data () {
    return {
      adShow: true,
      name: "时间线上方",
      ads: [
        {
          title: "A3：Rebuild2017",
          cover: "https://ocpk3ohd2.qnssl.com/uploads/ad/cover/6c/08/6c080948020ea4a798a77f5553e0cf05.jpeg",
          url: "http://rebuild.geekpark.net/#ticket"
        }
      ]
    }
  },
  computed () {
    const adswiper = new Swiper('.js-ads-container', {
      effect: 'fade',
      autoplay: 5000,
    });
  },
  methods: {
    closeAd: function () {
      this.adShow = false;
    }
  },
  beforeMount () {
  }
}
</script>

<style lang="stylus" scoped>
@import "../stylus/var.styl";
.sponsor
  border: 1px solid #ececec
  width: 100%
  background-color: #f3f3f3
  height: 0
  padding-bottom: $ad-ratio-list;
  margin 15px auto
  overflow: hidden
  position: relative
  display: block
  transform: scale(1)
  &:hover
    filter brightness(102%) contrast(115%)
  i
    width 32px
    height 15px
    background url("../assets/imgs/icons/ad.png") 0 0 no-repeat
    background-size: 32px 50px
    position: absolute
    right: 0
    top: 0
    transition: all $trans-dura
    transform-origin: right top
    z-index: 8
    &::after
      vertical-align: top
  i.icon-ad
    background-position: 0 -25px
  i.icon-ad-close
    transform: scale(0)
    cursor: pointer
  img
    position: absolute
    top: 0
    width: 100%
    height: 100%
  &:hover
    i.icon-ad-close
      transform: scale(1)
    i.icon-ad
      transform: scale(0)
.home-index
  // 首页时间线上方通栏广告
  .timeline-sponsor .sponsor
    padding-bottom: $ad-ratio-list
    margin-bottom: $global-margin
  .ads-container .swiper-slide
    opacity: 0
    padding-bottom: $ad-ratio-list
  // 右侧悬挂栏广告
  .sidebar .sponsor
    padding-top: $ad-ratio-sidebar
.topics-show
  // 文章页广告
  .sponsor img
    width: 100%
</style>

