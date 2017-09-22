<template lang="jade">
.more-news(v-if="posts && posts.length > 0")
  h4
    i.iconfont.icon-double-slash
    | 你可能感兴趣
  .news-list
    article.news-item(v-for='post, index in posts', :key='post.id')
      .img-cover-wrap
        a(:href="`/news/${post.id}`", :target="$store.state.target")
          .news-cover
            img(v-lazy="post.cover_url" w=158 h=100)
      div
        a.category-tag(:href="`/column/${post.column.id}`", :target="$store.state.target") {{post.column.title}}
        a(:href="`/news/${post.id}`", :target="$store.state.target")
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