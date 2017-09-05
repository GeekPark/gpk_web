<template lang="jade">
.more-news(v-if="posts.length > 0")
  h4
    i.iconfont.icon-double-slash
    | 你可能感兴趣
  article.news-item(v-for='post, index in posts', :key='post.id')
    a(:href="`/news/${post.id}`", target="_blank")
      .news-cover
        img(alt="", :src="post.cover_url")
      p.multiline-text-overflow {{post.title}}
</template>

<script>
import api from 'stores/api'

export default {
  data () {
    return {
      loading: true,
      posts: [],
    }
  },
  methods: {
    fetch () {
      this.loading = true;
      api.get(`posts/${this.$route.params.id}/related`).then((result) => {
        this.posts = result.data.posts;
        this.loading = false;
      }).catch((err) => {
        console.log(err);
        // this.$message.error(err.toString())
      })
    },
  },
  beforeMount () {
    this.fetch()
  }
}
</script>