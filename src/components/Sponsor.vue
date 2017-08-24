<template lang="jade">
.container.sponsor-wrapper(v-if="adShow")
  .sponsor
    .sponsor-mult(v-if="ads.length > 1")
      .js-ads-container.ads-container
        .swiper-wrapper
          .swiper-slide(v-for="ad in ads")
            a(v-bind:href="ad.ad.link" target="_blank" v-bind:title="ad.ad.title" data-track-category="ad" v-bind:data-track-label="[name, ad.ad.title, ad.ad.link].join(' ')")
              img(v-bind:src="ad.ad.cover_url" data-vw=vw v-bind:alt="ad.ad.title")
    template(v-else v-for="ad in ads")
      a(v-bind:href="ad.ad.link" target="_blank" v-bind:title="ad.ad.title" data-track-category="ad" v-bind:data-track-label="[name, ad.ad.title, ad.ad.link].join(' ')")
        img(v-bind:src="ad.ad.cover_url" data-vw=vw v-bind:alt="ad.ad.title")
    i.icon-ad
    i.icon-ad-close.js-ad-close(data-track-category="ads[0].ad.close" v-bind:data-track-label="[name, ads[0].ad.title]" v-on:click="closeAd")
</template>

<script>
import Swiper from 'swiper';

export default {
  name: 'sponsor',
  data () {
    return {
      adShow: true,
      name: "时间线上方",
      ads: [{
        ad: {
          "id": 8,
          "title": "topbanner",
          "position": "top_banner",
          "link": "http://www.geekpark.net/",
          "cover_url": "http://main_test.geekpark.net/uploads/image/file/88/e1/88e174406880ad97dd13450fb583f5cd.png",
          "active_at": "2017-08-24T11:38:33.593+08:00",
          "active_through": "2017-08-25T15:38:34.000+08:00",
          "is_active": true,
          "video_link": "",
          "ad_type": "ad",
          "views": 0
        }
      }]
    }
  },
  computed () {
    const adswiper = new Swiper('.js-ads-container', {
      effect: 'fade',
      autoplay: 5000,
    });
  },
  methods: {
    fetch () {
      api.get(`ads`).then((result) => {
        console.log(result);
        this.ads = result.data.topbanner
      }).catch((err) => {
        this.$message.error(err.toString())
      })
    },
    closeAd: function () {
      this.adShow = false;
    }
  },
  beforeMount () {
    this.fetch()
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

