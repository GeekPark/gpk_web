<template lang="jade">
#index
  subnav
  .container
    sponsor(position="top_banner", v-once)
  .breaking-news(v-if="!this.$device.isMobile()")
    .container
      .item(v-for='item, index in slider.posts', :key='item.id')
        .responsive-imgs
          a(@click="saveClick(item)", class="link", :href="item.link || `/news/${item.id}`", :target="$store.state.target")
            img(class="img-cover" v-lazy="item.cover_url" w=563 h=404)
            .info-cover
              h3.multiline-text-overflow
                span {{item.title}}
              p.multiline-text-overflow(v-if="index == 0") {{item.abstract}}
  .swiper-container#breakding-news-slider.breakding-news-slider(v-else)
    .swiper-wrapper
      .news-item.swiper-slide(v-for='item, index in slider.posts', :key='item.id')
        a.link(:href="`/news/${item.id}`")
          .img-cover
            img(v-lazy="item.cover_url" w=540 h=260)
          .info-cover
            h3.multiline-text-overflow
              span {{item.title}}
  .main-content
    .container
      .article-list
        template(v-for="posts in homepage_posts")
          .time
            i.iconfont.icon-arrow-left
            | {{posts.date | timeAt}}
            i.iconfont.icon-arrow-right
          item(v-for="item in posts.data", :key="item.post.id", :post="item.post")
        .tac
          a.load-more(@click="fetch", :class="{'loading-in': loading, 'no-more': nomore}")
            .loading-article
            span 加载更多
      .article-sidebar
        sponsor(position="medium_up", v-once)
        hotnews(v-once)
        idlenews(v-once)
        topics(v-once)
        sponsor(position="medium_below", v-once)
</template>

<script>
require('swiper/dist/css/swiper.min.css')
import Subnav from '../components/Vsubnav.vue'
import Sponsor from '../components/Sponsor.vue'
import Item from './posts/Item.vue'
import Hotnews from './posts/Hotnews.vue'
import Idlenews from './posts/Idlenews.vue'
import Topics from './posts/Topics.vue'
import api from 'stores/api'
import Swiper from 'swiper'

export default {
  components: { Subnav, Sponsor, Item, Idlenews, Hotnews, Topics },
  data () {
    return {
      page: 0,
      loading: true,
      homepage_posts: [],
      slider: {
        posts: [],
      },
      ads: [],
      nomore: false
    }
  },
  watch: {
    'slider.posts': function (val, oldVal) {
      if (this.$device.isMobile()) {
        setTimeout(()=>{
          new Swiper('#breakding-news-slider', {
            autoplay: 5000,
            loop: true
          })
        }, 100)
      } else {
        if (this.ads.post_left) val[3] = this.ads.post_left[0].ad
        if (this.ads.post_right) val[4] = this.ads.post_right[0].ad
      }
    }
  },
  mounted(){
    window.addEventListener('scroll', () => {
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      let totalPage
      if (this.$device.isMobile()) {
        totalPage = 999999
      } else {
        totalPage = 3
      }
      if (scrollTop + window.innerHeight >= document.querySelector(".article-list").clientHeight &&
          !this.loading && this.page < totalPage) {
        this.fetch()
      }
    })
  },
  methods: {
    fetch () {
      this.loading = true
      this.page += 1
      api.get(`?page=${this.page}`).then((result) => {
        this.page < 2 ? this.slider = result.data.slider : ''
        this.nomore = !result.data.homepage_posts.length
        this.homepage_posts = this.homepage_posts.concat(result.data.homepage_posts)
        this.loading = false
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
  beforeMount () {
    if (!this.$device.isMobile()) {
      this.getAds()
    }
    this.fetch()
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
