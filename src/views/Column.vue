<template lang="jade">
#index
  .main-content
    .container
      .article-list
        item(v-for="post in posts", :key="post.id", :post="post", :columnTitle="column.title", :columnId="column.id")
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
      column: {},
      posts: [],
    }
  },

  methods: {
    fetch () {
      this.loading = true;
      this.page += 1;
      api.get(`columns/${this.$route.params.id}?page=${this.page}`).then((result) => {
        console.log(result);
        this.column = result.data.column;
        this.posts = this.posts.concat(result.data.column.posts);
        this.loading = false;
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
