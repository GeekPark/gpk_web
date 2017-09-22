<template lang="jade">
#index
  .header-banner(:style="{backgroundImage: 'url(' + topic.banner_url + ')'}")
    h3 # {{topic.title}} #
    .desc 共{{topic.post_count}}篇文章
  .main-content
    .container
      .article-list
        item(v-for="post in topic.posts", :key="post.id", :post="post")
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
      loading: true,
      topic: {},
    }
  },

  methods: {
    fetch () {
      this.loading = true;
      api.get(`topics/${this.$route.params.id}`).then((result) => {
        this.topic = result.data.topic
        document.title = result.data.topic.title + ' | 极客公园'
        this.loading = false
      }).catch((err) => {
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
