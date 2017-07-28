<template lang="jade">
#index
  .main-content
    .container
      .article-list
        item(v-for="post in posts", :key="post.id", :post="post")
        .tac
          a.load-more(@click="fetch", :class="{'loading-in': loading, 'no-more': nomore}")
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
      nomore: false,
      column: {},
      posts: [],
    }
  },

  methods: {
    fetch () {
      this.loading = true;
      this.page += 1;
      api.get(`posts/by-tag/${this.$route.params.tag}?page=${this.page}`).then((result) => {
        console.log(result);
        this.posts = this.posts.concat(result.data.posts);
        this.loading = false;
        if (result.data.meta.total_pages <= this.page) this.nomore = true;
      }).catch((err) => {
        console.log(err);
        this.$message.error(err.toString())
      })
    },
  },

  beforeMount () {
    this.fetch()
  }
}

</script>

<style lang="stylus" scoped>

</style>
