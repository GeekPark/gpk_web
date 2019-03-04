<template lang="pug">
#column
  subnav
  .header-banner(:style="{'backgroundImage': column.banner_url ? `url(${column.banner_url})` : ''}")
    template(v-if="column.column_banner && column.column_banner.template == 'template_one'")
      h3 {{column.title}}
      .desc {{column.description}}
  .swiper-container.column-carousel(v-if="column.column_banner && column.column_banner.template == 'template_two' && column.column_banner.banners.length")
    .swiper-wrapper
      .item.swiper-slide(v-for="item, index in column.column_banner.banners" :key="`people_${index}`")
        a(:href="`/news/${item.id}`" :target="$store.state.target")
          .img-cover
            img(:src="`${item.cover_url}?imageView2/1/w/1130/h/400/interlace/1/`")
          .info-cover
            h3.multiline-text-overflow
              span {{item.title}}
            p.multiline-text-overflow {{item.abstract}}
    .swiper-pagination
  .main-content
    .container
      .article-list
        item(v-for="post in posts", :key="post.id", :post="post", :columnTitle="column.title", :columnId="column.id")
        .tac(v-if="!nomore")
          a.load-more(@click="fetch", :class="{'loading-in': loading}")
            .loading-article
            span 加载更多
        .tac(v-else) 没有更多内容了
      .article-sidebar
        hotnews(v-once)
</template>

<script>
import Subnav from '../components/Vsubnav.vue'
import Item from './posts/Item.vue'
import Hotnews from './posts/Hotnews.vue'
import api from 'store/api'
require('swiper/dist/css/swiper.min.css')
import Swiper from 'swiper/dist/js/swiper.js'

let page = 1

export default {
  components: { Subnav, Item, Hotnews },
  meta () {
    return {
      title: this.column.title
    }
  },
  data () {
    return {
      loading: false,
      posts: [],
      nomore: false
    }
  },
  asyncData ({ store, route: { params: { id } } }) {
    return store.dispatch('FETCH_COLUMN', { id, page })
  },
  computed: {
    column () {
      this.posts = this.$store.state.column.column.posts
      return this.$store.state.column.column
    }
  },
  mounted () {
    window.scroll(0, 0)
    var mySwiper = new Swiper('.swiper-container', {
      speed: 500,
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      loop: true,
      breakpoints: {
        767: {
        }
      }
    })
  },
  methods: {
    fetch () {
      this.loading = true
      page += 1
      api.get(`columns/${this.$route.params.id}?page=${page}`).then((result) => {
        this.nomore = !result.data.column.posts.length
        this.posts = this.posts.concat(result.data.column.posts)
        this.loading = false
        window.ga('send', 'event', {
          eventCategory: 'Column',
          eventAction: 'loadmore',
          eventLabel: `columns/${this.$route.params.id} 加载更多`,
        });
      }).catch((err) => {
        this.$message.error(err.toString())
      })
    },
  }
}

</script>

<style lang="stylus">
#column
  .sub-nav
    margin-bottom 0
  .column-carousel
    margin 0 auto
    max-width 1130px
    .swiper-wrapper
      margin-top 20px
    .swiper-pagination
      width 100%
      bottom 3%
    .swiper-pagination-bullet
      border-radius 0
      opacity .3
      background #fff
      width 25px
      height 5px
      margin 0 5px
    .swiper-pagination-bullet-active
      background #fff
      opacity 1
    .item
      position relative
      .img-cover
        width 100%
        height 0
        padding-bottom 35.4%
        box-sizing border-box
        overflow hidden
        border 1px solid #efefef
        position relative
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
        left 5%
        bottom 12%
        width 500px
        max-width 90%
      h3
        font-size 20px
        color #fff
        line-height 2
        margin 0
        font-weight 400
        span
          background #000
          padding .3em 10px
          box-decoration-break clone
      p
        background rgba(0, 0, 0, .5)
        color #fff
        font-size 14px
        line-height 1.5
        padding 6px 10px
        margin 10px 0 0 0
    @media screen and (max-width: 767px)
      margin-top -220px
      .swiper-wrapper
        margin-top 0px
      .item
        .img-cover
          padding-bottom 65%
        .info-cover
          bottom 9%
        h3
          font-size 14px
        p
          display none
.header-banner
  background #666 url('//imgslim.geekpark.net/image/newgeekpark/column_bg.jpg') center center no-repeat
  background-size auto 100%
  color #fff
  text-align center
  padding 20px 0
  height 180px
  h3
    margin 40px 0 40px
    font-size 50px
    font-weight 300
    letter-spacing .5em
    text-indent 0.25em
  .desc
    font-size 14px
    font-weight 300
    letter-spacing .5em
    padding 0 60px
    line-height 1.5
  @media screen and (max-width: 767px)
    h3
      font-size 40px
      letter-spacing 0
      text-indent 0
    .desc
      letter-spacing 0
</style>
