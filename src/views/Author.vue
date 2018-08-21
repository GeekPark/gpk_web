<template lang="pug">
#author
  .header-banner(:class="'bg-' + Math.floor(Math.random()*(5))")
  .users-content(v-if="users")
    .container.relative
      .bio {{users.bio}}
      .user-info
        h4 {{users.nickname}}
        //- p
          a(:href="'mailto:' + users.email") {{users.email}}
      .avatar
        img(v-lazy="users.avatar_url" w=120 h=120)
  .main-content.gray-bg
    .container
      .article-list
        p.total_count 共发表内容 {{meta.total_count}}篇
        item(v-for="post in posts", :key="post.id", :post="post")
        .tac
          a.load-more(@click="fetch", :class="{'loading-in': loading, 'no-more': nomore}")
            .loading-article
            span 加载更多
      .article-sidebar
        hotnews(v-once)
</template>

<script>
import Item from './posts/Item.vue'
import Hotnews from './posts/Hotnews.vue'
import api from 'store/api'

export default {
  components: { Item, Hotnews },
  data () {
    return {
      loading: false,
      page: 0,
      meta: {},
      posts: [],
      users: null,
      nomore: false
    }
  },
  meta () {
    return {
      title: "作者信息"
    }
  },
  methods: {
    fetch () {
      this.loading = true;
      this.page += 1;
      api.get(`posts/author/${this.$route.params.id}?page=${this.page}`).then((result) => {
        this.meta = result.data.meta
        this.posts = this.posts.concat(result.data.posts)
        if (result.data.meta.total_pages <= this.page) this.nomore = true
        this.loading = false
        window.ga('send', 'event', {
          eventCategory: 'Author',
          eventAction: 'loadmore',
          eventLabel: `author/${this.$route.params.id} 加载更多`,
        });
      }).catch((err) => {
        this.$message.error(err.toString())
      })
    },
    fetchUser () {
      api.account.get(`api/v1/users/brief?user_id=${this.$route.params.id}`).then((result) => {
        this.users = result.data.shift()
        document.title = this.users.nickname + ' | 极客公园'
      }).catch((err) => {
        this.$message.error(err.toString())
      })
    },
  },

  beforeMount () {
    this.fetch()
    this.fetchUser()
  }
}

</script>

<style lang="stylus" scoped>

.header-banner
  background url('//imgslim.geekpark.net/image/newgeekpark/column_bg.jpg') center center no-repeat
  background-size cover
  color #fff
  text-align center
  padding 20px 0
  height 180px
  for $num in (0..4)
    {'&.bg-' + $num}
      background-image url('//imgslim.geekpark.net/image/newgeekpark/author_bg_' + $num + '.jpg')
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
.users-content
  border-bottom 1px solid #DADADA
  padding 50px 0 10px
  .avatar
    position absolute
    top -140px
    img
      width 120px
      height 120px
      border 3px solid #fff
      border-radius 50%
  .bio
    float right
    color #9B9B9B
  .user-info
    h4
      font-size 24px
      margin 10px 0
      width 126px
      text-align center
    p
      a
        color #9B9B9B
@media screen and (max-width: 767px)
  .header-banner
    display none
  .users-content
    padding 25px 0
    border none
    text-align center
    .container
      display flex
      flex-direction column-reverse
      justify-content center
    .avatar
      position static
      img
        width 70px
        height 70px
        border none
        border-radius 50%
    .user-info
      h4
        font-size 20px
        width auto
      p
        display none
    .bio
      float none
      color rgba(0,0,0,.8)
  .gray-bg
    background #F6F6F6
    padding-bottom 50px
    margin-bottom 0
    .total_count
      margin 0
      padding-bottom 10px
      color rgba(0,0,0,.6)
</style>
