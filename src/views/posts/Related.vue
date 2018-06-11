<template lang="pug">
.more-news(v-if="posts && posts.length > 0")
  h4
    i.iconfont.icon-double-slash
    | 你可能感兴趣
  .news-list(data-track-category="related-news" data-track-item=".news-item")
    article.news-item(v-for='post, index in posts', :key='post.id')
      .img-cover-wrap
        a(:href="`/news/${post.id}`", :target="$store.state.target" data-event-action="view" data-event-category="related-list.cover" :data-event-label="`${post.title} /news/${post.id}`")
          .news-cover
            img(v-lazy="post.cover_url" w=158 h=100)
      div
        a.category-tag(:href="`/column/${post.column.id}`", :target="$store.state.target" data-event-action="view" data-event-category="related-list.column" :data-event-label="`${post.column.title} /column/${post.column.id}`") {{post.column.title}}
        a(:href="`/news/${post.id}`", :target="$store.state.target" data-event-action="view" data-event-category="related-list.title" :data-event-label="`${post.title} /news/${post.id}`")
          p.multiline-text-overflow {{post.title}}
</template>

<script>
import api from 'store/api'

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