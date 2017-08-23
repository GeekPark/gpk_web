<template lang="jade">
#index
  .header-banner
    h3 {{column.title}}
    .desc {{column.description}}
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

<style lang="stylus">
.header-banner
  background url('../assets/imgs/column_bg.jpg') center center no-repeat
  background-size cover
  color #fff
  text-align center
  padding 20px 0
  height 180px
  h3
    margin 50px 0 40px
    font-size 50px
    font-weight 300
    letter-spacing .5em
  .desc
    font-size 14px
    font-weight 300
    letter-spacing .5em
</style>
