<template lang="jade">
#index
  .header-banner
    h3 # {{$route.params.tag}} #
    .desc 共{{total_count}}篇文章
  .main-content
    .container
      .article-list
        item(v-for="post in posts", :key="post.id", :post="post")
        .tac(v-if="!end")
          a.load-more(@click="fetch", :class="{'loading-in': loading, 'no-more': nomore}")
            .loading-article
            span 加载更多
      .article-sidebar(v-if="!$device.isMobile()")
        hotnews(v-once)
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
      nomore: false,
      total_count: 0,
      posts: [],
      end: false
    }
  },

  methods: {
    fetch () {
      this.loading = true;
      this.page += 1;
      api.get(`posts/by-tag/${this.$route.params.tag}?page=${this.page}`).then((result) => {
        this.total_count = result.data.meta.total_count
        this.posts = this.posts.concat(result.data.posts)
        this.loading = false
        if (result.data.meta.total_pages <= this.page) this.nomore = true
      }).catch((err) => {
        this.$message.error(err.toString())
      })
    },
  },

  beforeMount () {
    document.title = this.$route.params.tag + ' | 极客公园'
    this.fetch()
  }
}

</script>

<style lang="stylus" scoped>
.header-banner
  .desc
    letter-spacing 0
</style>
