<template lang="jade">
#index
  .header-banner(:style="{backgroundImage: 'url(' + topic.banner_url + ')'}")
    h3 # {{topic.title}} #
    .desc 共{{topic.post_count}}篇文章
  .main-content
    .container
      .article-list
        item(v-for="post in topic.posts", :key="post.id", :post="post")
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
      loading: true,
      topic: {},
    }
  },

  methods: {
    fetch () {
      this.loading = true;
      api.get(`topics/${this.$route.params.id}`).then((result) => {
        console.log(result)
        this.topic = result.data.topic
        this.loading = false
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
.header-banner
  .desc, h3
    letter-spacing 0
</style>
