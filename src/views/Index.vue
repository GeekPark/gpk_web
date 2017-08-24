<template lang="jade">
#index
  subnav
  sponsor
  .breaking-news(v-if="!isMobileUA")
    .container
      .item(v-for='item, index in slider.posts', :key='item.id')
        a(class="link", :href="`/news/${item.id}`", target="_blank")
          img(:alt="item.title", class="img-cover loaded", :src="item.cover_url")
          .info-cover
            h3.multiline-text-overflow
              span {{item.title}}
            p.multiline-text-overflow(v-if="index == 0") {{item.abstract}}
  .swiper-container#breakding-news-slider.breakding-news-slider(v-else)
    .swiper-wrapper
      .news-item.swiper-slide(v-for='item, index in slider.posts', :key='item.id')
        a.link(:href="`/news/${item.id}`")
          img.img-cover(:src="item.cover_url")
          .info-cover
            h3.multiline-text-overflow
              span {{item.title}}
  .main-content
    .container
      .article-list
        template(v-for="posts in homepage_posts")
          .time
            i.iconfont.icon-arrow-left
            | {{posts.date | formatDate}}
            i.iconfont.icon-arrow-right
          item(v-for="item in posts.data", :key="item.post.id", :post="item.post")
        .tac
          a.load-more(@click="fetch", :class="{'loading-in': loading}")
            .loading-article
            span 加载更多
      .article-sidebar
        .ad-index
        hotnews
        idlenews

</template>

<script>
require('swiper/dist/css/swiper.min.css');
import Subnav from '../components/Vsubnav.vue'
import Sponsor from '../components/Sponsor.vue'
import Item from './posts/Item.vue'
import Hotnews from './posts/Hotnews.vue'
import Idlenews from './posts/Idlenews.vue'
import api from 'stores/api'
import moment from 'moment'
import Swiper from 'swiper';
import { isWechat, isMobileUA } from 'mdetect';

export default {
  components: { Subnav, Sponsor, Item, Idlenews, Hotnews },
  computed: {
    isMobileUA () {
      return isMobileUA()
    }
  },
  data () {
    return {
      page: 0,
      loading: true,
      homepage_posts: [],
      slider: {
        posts: [],
      }
    }
  },
  methods: {
    fetch () {
      this.loading = true;
      this.page += 1;
      api.get(`?page=${this.page}`).then((result) => {
        console.log(result);
        this.slider = result.data.slider;
        this.homepage_posts = this.homepage_posts.concat(result.data.homepage_posts);
        this.loading = false;
        setTimeout(toM, 1500);
      }).catch((err) => {
        console.log(err);
        this.$message.error(err.toString())
      })
    },

    get_User() {
      setTimeout(() => {
        api.getUser().then(({
          data
        }) => {
          if (data.code == 401) {
            console.log('token')
            this.$router.push('/login')
            this.$store.dispatch('UserLogout')
            console.log(localStorage.token)
          } else {
            this.user = data
          }
        })
      }, 100)
    },

    logout() {
      this.$store.dispatch('UserLogout')
      if (!this.$store.state.token) {
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '登出成功'
        })
      } else {
        this.$message({
          type: 'info',
          message: '登出失败'
        })
      }
    },
  },
  filters: {
    formatDate: function (value) {
      if (!value) return ''
      let str;
      const time = moment.unix(value);
      str = time.format(`ddd.`);
      return time.calendar(null, {
        sameDay: '今天',
        lastDay: '昨天',
        lastWeek: 'MM.DD',
        sameElse: 'MM.DD'
      }) + ' \\ ' + str
    }
  },
  beforeMount () {
    this.fetch()
  }
}

function toM(){
  if (isMobileUA) {
    console.log('toM');
    new Swiper('#breakding-news-slider', {
      // pagination: '.swiper-pagination',
      autoplay: 5000,
      loop: true,
      // onInit: () => {
      //   remount($('#breakding-news-slider'));
      // },
    });
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
    height 195px
    width 275px
    background #E4E4E4
    border 1px solid #F0F0F0
    box-sizing border-box
    margin 0 0 10px 10px
    display inline-block
    vertical-align top
    position relative
    overflow hidden
    text-align center
    img
      height 100%
      display inline
      margin 0 -100%
      transition transform 0.5s ease
    h3
      font-size 18px
      color #fff
      line-height 2
      margin 0
      font-weight 400
      span
        background #000
        padding .3em 10px
        box-decoration-break clone
    &:hover
      img
        transform scale3d(1.05, 1.05, 1)
    &:first-child
      width 560px
      height 400px
      background #eee
      margin 0 0 10px 0
      float left
      h3
        font-size 20px
        // linear-gradient (transparent, transparent 0.1em, #000 0px, #000 1.85em, transparent 0)
        background linear-gradient(to bottom, transparent 0.1em, black 0.1em, black 1.85em, transparent 1.85em)
      p
        background rgba(0, 0, 0, .5)
        color #fff
        font-weight 300
        font-size 14px
        line-height 1.5
        padding 6px 10px
        margin 10px 0 0 0
.breakding-news-slider
  height 180px
  overflow: hidden
  position relative
  .swiper-slide
    width 100%
  img
    width 100%
    display inline
    transition transform 0.5s ease
  .info-cover
    position absolute
    bottom 0
    padding 0 28% 3% 4%
    text-align left
    z-index 2
    h3
      font-size 16px
      color #fff
      line-height 1.8
      margin 0
      font-weight normal
      span
        background #000
        display inline
        line-height 1.5
        padding 4px 10px
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
