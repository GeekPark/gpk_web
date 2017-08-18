<template lang="jade">
#index
  .header-banner(:class="'bg-' + Math.floor(Math.random()*(5))")
  .users-content(v-if="users")
    .container.relative
      .avatar
        img(:src="users.avatar_url")
      .bio
        {{users.bio}}
      .user-info
        h4 {{users.nickname}}
        p
          a(:href="'mailto:' + users.email") {{users.email}}
  .main-content
    .container
      .article-list
        item(v-for="post in posts", :key="post.id", :post="post")
        .tac
          a.load-more(@click="fetch", :class="{'loading-in': loading}")
            .loading-article
            span 加载更多
      .article-sidebar
        hotnews
</template>

<script>
import Item from './posts/Item.vue'
import Hotnews from './posts/Hotnews.vue'
import api from 'stores/api'

export default {
  components: { Item, Hotnews },
  data () {
    return {
      page: 0,
      loading: true,
      posts: [],
      users: null
    }
  },

  methods: {
    fetch () {
      this.loading = true;
      this.page += 1;
      api.get(`posts/author/${this.$route.params.id}?page=${this.page}`).then((result) => {
        console.log(result);
        this.posts = this.posts.concat(result.data.posts);
        this.loading = false;
      }).catch((err) => {
        console.log(err);
        this.$message.error(err.toString())
      })
    },
    fetchUser () {
      api.account.get(`api/v1/users/brief?user_id=${this.$route.params.id}`).then((result) => {
        console.log(result)
        this.users = result.data.shift()
      }).catch((err) => {
        console.log(err);
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
  for $num in (0..4)
    {'&.bg-' + $num}
      background-image url('../assets/imgs/author_bg_' + $num + '.jpg')
.users-content
  border-bottom 1px solid #ccc
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
    p
      a
        color #9B9B9B
</style>
