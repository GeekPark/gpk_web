<template lang="pug">
#index
  subnav
  .container
    sponsor(position="top_banner")
  .breaking-news(v-if="!isMobile" data-track-category="home.breaking-news" data-track-item=".item a")
    .container
      .item(v-for='item, index in homepage.slider.posts.slice(0,5)', :key='item.id')
        .responsive-imgs
          a.link(@click="saveClick(item)" :href="item.link || `/news/${item.id}`" :target="$store.state.target" :data-track-title="item.title")
            img.exposure_link(v-if="item.exposure_link", :src="item.exposure_link")
            img(:srcset="`${item.cover_url}?imageView2/1/w/1120/h/800/interlace/1/ 2x`", class="img-cover loaded", :src="`${item.cover_url}?imageView2/1/w/560/h/400/interlace/1/`")
            .info-cover
              h3.multiline-text-overflow(v-if="item.title")
                span {{item.title}}
              p.multiline-text-overflow(v-if="index === 0") {{item.abstract}}
  el-carousel#breakding-news-slider(v-else height="180px" :interval="5000" arrow="always" indicator-position="none" data-track-category="home.breaking-news" data-track-item=".item a")
    el-carousel-item(v-for="item, index in homepage.slider.posts.slice(0,5)" :key="item.id")
      a.link(@click="saveClick(item)" :href="item.link || `/news/${item.id}`" :target="$store.state.target" :data-track-title="item.title")
        .img-cover
          img(:srcset="`${item.cover_url}?imageView2/1/w/750/h/360/interlace/1/ 2x`" :src="`${item.cover_url}?imageView2/1/w/375/h/180/interlace/1/`")
        .info-cover
          h3.multiline-text-overflow
            span {{item.title}}
  .main-content
    .container
      .article-list
        item(v-for="item in homepage_posts_f", :key="item.post.id", :post="item.post")
        recommend(v-once)
        sponsor(position="web_post", v-once)
        item(v-for="item in homepage_posts", :key="item.post.id", :post="item.post")
        .tac
          a.load-more(@click="fetch", :class="{'loading-in': loading}")
            .loading-article
            span 加载更多
      .article-sidebar
        sponsor(position="medium_up", v-once)
        //- newsflash
        hotnews(v-once)
        idlenews(v-once)
        topics(v-once)
        sponsor(position="medium_below", v-once)
  //- vapp
</template>

<script>
import Subnav from '../components/Vsubnav.vue'
import Sponsor from '../components/Sponsor.vue'
import Vapp from '../components/Vapp.vue'
import Item from './posts/Item.vue'
import Newsflash from './posts/Newsflash.vue'
import Hotnews from './posts/Hotnews.vue'
import Idlenews from './posts/Idlenews.vue'
import Recommend from './posts/Recommend.vue'
import Topics from './posts/Topics.vue'
import api from 'store/api'
// import Swiper from 'swiper'

let page = 1
export default {
  components: { Subnav, Vapp, Sponsor, Item, Newsflash, Idlenews, Hotnews, Topics, Recommend },
  data () {
    return {
      page: page,
      loading: false,
      homepage_posts_f: [],
      homepage_posts: [],
      ads: [],
      isMobile: false
    }
  },
  meta () {
    return {}
  },
  asyncData ({ store, route }) {
    return store.dispatch('FETCH_HOME', { page })
  },
  computed: {
    homepage () {
      this.homepage_posts_f = this.$store.state.homepage.homepage_posts.slice(0, 3)
      this.homepage_posts = this.$store.state.homepage.homepage_posts.slice(3)
      if (this.$store.state.ads.post_left) this.$store.state.homepage.slider.posts[3] = this.$store.state.ads.post_left[0].ad
      if (this.$store.state.ads.post_right) this.$store.state.homepage.slider.posts[4] = this.$store.state.ads.post_right[0].ad
      return this.$store.state.homepage
    }
  },
  methods: {
    fetch () {
      this.loading = true
      page += 1
      api.get(`https://mainssl.geekpark.net/api/v2?page=${page}`).then((result) => {
        this.homepage_posts = this.homepage_posts.concat(result.data.homepage_posts)
        this.loading = false
        window.ga('send', 'event', {
          eventCategory: 'Home',
          eventAction: 'loadmore',
          eventLabel: '加载更多',
        });
      }).catch((err) => {
        this.$message.error(err.toString())
      })
    },
    saveClick (ad) {
      if (ad.link) {
        api.get(`ads/${ad.id}/click`)
      }
      return true
    },
    getAds () {
      api.get(`ads`).then((result) => {
        this.ads = result.data
      }).catch((err) => {
        this.$message.error(err.toString())
      })
    },
  },
  mounted () {
    // this.getAds()
    if (this.$device.isMobile()) {
      this.isMobile = true
      // new Swiper('#breakding-news-slider', {
      //   autoplay: 5000,
      //   loop: true
      // })
    }

    window.addEventListener('scroll', () => {
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      let totalPage
      if (this.$device.isMobile()) {
        totalPage = 999999
      } else {
        totalPage = 2
      }
      if (scrollTop + window.innerHeight >= document.querySelector(".article-list").clientHeight &&
          !this.loading && page < totalPage) {
        this.fetch()
      }
    })
  }
}
</script>

<style lang="stylus">
.breaking-news
  margin-bottom -10px
  .info-cover
    position absolute
    bottom 0
    padding 0 8% 4% 4%
    text-align left

  .item
    width 24%
    margin 0 0 1% 1%
    background #efefef
    display inline-block
    vertical-align top
    text-align center
    .link
      position absolute
      top 0
      left 0
      right 0
      bottom 0
    .responsive-imgs
      width 100%
      height 0
      padding-bottom 72%
      box-sizing border-box
      overflow hidden
      border 1px solid #efefef
      position relative
    img
      height 100%
      display inline
      margin 0 -100%
      transition transform 0.5s ease
      &.exposure_link
        position absolute
        width 1px
        height 1px
        left 0
        top 0
    &:hover
      img
        transform scale3d(1.05, 1.05, 1)
    h3
      font-size 16px
      color #fff
      line-height 2
      margin 0
      font-weight 400
      span
        background #000
        padding .3em 10px
        box-decoration-break clone
    &:first-child
      float left
      width 50%
      margin 0
      .responsive-imgs
        padding-bottom 71.5%
      h3
        font-size 20px
        // linear-gradient (transparent, transparent 0.1em, #000 0px, #000 1.85em, transparent 0)
        background linear-gradient(to bottom, transparent 0.1em, black 0.1em, black 1.85em, transparent 1.85em)
      p
        background rgba(0, 0, 0, .5)
        color #fff
        font-size 14px
        line-height 1.5
        padding 6px 10px
        margin 10px 0 0 0
  @media screen and (max-width: 1023px)
    .item
      .responsive-imgs
        h3
          font-size 12px
      &:first-child
        h3
          font-size 16px
        p
          font-size 12px
  @media screen and (max-width: 767px)
    margin-top 20px
    margin-bottom 0px
    .item
      width 49.5%
      margin 1% 0 0 1%
      &:nth-child(even)
        margin-left 0
      &:first-child
        width 100%
#breakding-news-slider
  overflow hidden
  position relative
  .swiper-slide
    width 100%
    position relative
  .img-cover
    padding-bottom 48%
    background-color #c3c3c3
    position relative
    overflow hidden
    text-align center
    img
      position absolute
      top 50%
      left 50%
      transform translate3d(-50%, -50%, 0)
      height 100%
      width auto
      min-width 100%
  .info-cover
    position absolute
    bottom 0
    left 0
    padding 0 28% 3% 4%
    transform translate3d(0%, 0%, 0)
    text-align left
    h3
      font-size 16px
      color #fff
      line-height 2
      margin 0
      font-weight normal
      span
        background #000
        display inline
        line-height 1.5
        padding 3px 10px
        box-decoration-break clone
  .swiper-pagination
    bottom 0
  .swiper-pagination-bullet
    margin 0
    height 4px
    border-radius 0
    width 20%
    vertical-align bottom
    background-color #000
    transition all 0.3s
  .swiper-pagination-bullet-active
    background-color $color-blue
</style>
