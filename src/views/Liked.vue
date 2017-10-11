<template lang="jade">
#index
  .header-banner
    h3 我的喜欢
    .desc 共{{total_count}}篇文章
  .main-content
    .container
      .article-list(v-if="total_count > 0")
        item(v-for="post in posts", :key="post.id", :post="post")
        .tac(v-if="!end")
          a.load-more(@click="fetch", :class="{'loading-in': loading, 'no-more': nomore}")
            .loading-article
            span 加载更多
      p(style="text-align:center; padding: 50px 0", v-else)
        | 您还没有喜欢的文章
</template>

<script>
import Item from './posts/Item.vue'
import api from 'stores/api'

let access_key

export default {
  components: { Item },
  data () {
    return {
      page: 0,
      loading: true,
      nomore: false,
      total_count: 0,
      posts: [],
    }
  },

  methods: {
    fetch () {
      this.loading = true;
      this.page += 1;
      api.get(`posts/favorite_posts?access_key=${access_key}&page=${this.page}`).then((result) => {
        this.total_count = result.data.meta.total_count
        if (result.data.posts) this.posts = this.posts.concat(result.data.posts)
        this.loading = false
        if (result.data.meta.total_pages <= this.page) this.nomore = true
      }).catch((err) => {
        this.$message.error(err.toString())
      })
    },
  },

  mounted () {
    access_key = this.$store.state.access_key
    this.fetch()
  }
}

</script>

<style lang="stylus" scoped>
.header-banner
  .desc
    letter-spacing 0
</style>
