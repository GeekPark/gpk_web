<template lang="pug">
#comment
  template(v-if="$store.state.access_key")
    textarea.heights(placeholder="你有什么看法...", name="textarea-io", :value="message", @input="updateValue")
    .input-box
      button.submit-comment(@click="submitComment") 发表评论
  template(v-else)
    textarea.heights(placeholder="请登录后发表评论", disabled="disabled")
    .input-box
      a.submit-comment(:href="loginURL") 马上登录

  .comment-wrap(v-if="comments.length")
    h4
      i.iconfont.icon-double-slash
      | 热门评论
    template(v-for="(item, itemIndex) in comments")
      .comment-item(:id="'comment-' + item.id", v-if="item.commenter_info && item.commenter_info.length > 0")
        .c-header
          .avatar-box
            img(v-lazy="item.commenter_info[0].avatar_url" w=40 h=40)
            | {{item.commenter_info[0].nickname}}
          .like-box(@click="toggleLike(item, itemIndex)", :class="{'liked animated bounceIn': item.liked}")
            i.iconfont(:class="item.liked ? 'icon-thumbs-up' : 'icon-thumbs-o-up'")
            | {{item.like_count}}
        .c-body {{item.content}}
        .c-rp
          .time {{item.created_at | fromNow}}
          .from-type {{item.device | fromDevice}}
          span(@click="toggleReplyForm(item.commenter_info[0].nickname, item.id)")
            | {{ replyid == item.id ? '取消' : '回复'}}
        form.reply-form(@submit.prevent="submitReply($event, itemIndex)", v-show="replyid == item.id")
          .textarea-wrap
            textarea(name="comment", :id="'textarea-' + item.id")
          input(type="hidden", name="comment_id", :value="item.id")
          .input-box
            button(class="submit-comment") 回复
        template(v-for="reply in item.childrens")
          .comment-item.sub-comment(:id="'comment-' + reply.id", v-if="reply.commenter_info && reply.commenter_info.length > 0")
            .c-body
              | {{reply.commenter_info[0].nickname}}:
              span @{{reply.parent_commenter_info[0].nickname}}
              | {{reply.content}}
            .c-rp
              .time {{reply.created_at | fromNow}}
              .from-type {{reply.device | fromDevice}}
              span(@click="toggleReplyForm(reply.commenter_info[0].nickname, reply.id)")
                | {{ replyid == reply.id ? '取消' : '回复'}}
          form.reply-form(@submit.prevent="submitReply($event, itemIndex)", v-show="replyid == reply.id")
            .textarea-wrap
              textarea(name="comment", :id="'textarea-' + reply.id")
            input(type="hidden", name="comment_id", :value="reply.id")
            .input-box
              button(class="submit-comment") 回复
</template>

<script>
import api from 'store/api'

let access_key

export default {
  props: ['postid'],
  data () {
    return {
      comments: [],
      message: "",
      nickname: "",
      replyid: "",
      commentLoaded: false,
      loginURL: ''
    }
  },
  mounted() {
    this.loginURL = `${api.account.defaults.baseURL}login?callback_url=${encodeURIComponent(location.href + '#comment')}`
    this.$store.watch(this.$store.getters.getAccessKey, access_key => {
      this.fetch()
    })
  },
  methods: {
    fetch () {
      access_key = this.$store.state.access_key
      let query_access_key = access_key ? `?access_key=${access_key}` : ''
      api.get(`posts/${this.postid}/comments${query_access_key}`).then(result => {
        this.comments = result.data.comments
        this.commentLoaded = true;

        if (location.hash) {
          setTimeout(()=>{this.goToComment(location.hash)}, 1000)
        }
      }).catch((err) => {
        this.$message.error(err.toString())
      })
    },
    checkLogin() {
      if (!this.$store.state.userInfo) {
        if (confirm('评论需要登录喔，点击确定去登录')) window.location.href = loginURL;
        return true
      }
    },
    updateValue: function (e) {
      if (this.checkLogin()) {
        e.target.value = ''
      } else {
        this.message = e.target.value.trim()
      }
    },
    submitComment() {
      if (this.checkLogin()) return
      if (!this.message) {
        this.$message.error('请填写评论内容')
        return
      }
      let query_access_key = access_key ? `?access_key=${access_key}` : ''
      api.post(`posts/${this.postid}/comments${query_access_key}`, {
        content: this.message
      }).then(result => {
        var comment = result.data
        comment.commenter_info = [this.$store.state.userInfo]
        comment.like_count = 0
        comment.childrens = []
        comment.content = this.message
        comment.created_at = Math.round(new Date().getTime()/1000)
        this.comments.unshift(comment);
        this.$message({
          message: '评论成功！',
          type: 'success'
        });
        // $('#replyForm-' + _this.comments[i].id).find('textarea').val('');
        this.message = ''
      }).catch((err) => {
        if (err.response.data.error == 'banned') {
          this.$message.error('因为不当内容，你已被禁言')
        } else {
          this.$message.error(err.toString())
        }
      })
    },
    toggleReplyForm: function(nickname, repId) {
      if (this.checkLogin()) return
      if (this.replyid == repId) {
        this.replyid = ''
      } else {
        this.replyid = repId
        this.nickname = nickname
        setTimeout(()=>{$('#textarea-' + repId).val(`@${nickname}:`).focus()}, 100)
      }
    },
    submitReply: function(e, i) {
      var fd = $(e.target).serializeArray()
      var commentId
      var commentContent
      let re = new RegExp(`^@${this.nickname}:`, "im")
      fd.forEach(function(item) {
        if (item.name === 'comment_id') {
          commentId = item.value;
        }
        if (item.name === 'comment') {
          commentContent = item.value;
        }
      });

      commentContent = commentContent.replace(re, '')
      if (!commentContent) {
        this.$message.error('请填写评论内容')
        return
      }
      // var loadingMask = this.$loading({
      //   fullscreen: false,
      //   target: e.target,
      // });
      api.post(`posts/${this.postid}/comments?access_key=${access_key}`, {
        content: commentContent,
        parent_id: commentId
      }).then(result => {
        var reply = result.data
        reply.commenter_info = [this.$store.state.userInfo]
        reply.content = commentContent
        reply.parent_commenter_info = [{nickname: this.nickname}]
        reply.created_at = Math.round(new Date().getTime()/1000)
        this.comments[i].childrens.push(reply);
        this.$message({
          message: '回复成功！',
          type: 'success'
        });
        $('#textarea-' + commentId).val('');
        this.replyid = null
      }).catch((err) => {
        if (err.response.data.error == 'banned') {
          this.$message.error('因为不当内容，你已被禁言')
        } else {
          this.$message.error(err.toString())
        }
      })
    },
    toggleLike: function(item, index) {
      if (!this.$store.state.userInfo) {
        if (confirm('点赞需要登录喔，点击确定去登录')) window.location.href = this.loginURL;
        return;
      }
      let like = item.liked ? 'unlike' : 'like'
      api.post(`posts/${this.postid}/comments/${item.id}/${like}?access_key=${access_key}`).then((result) => {
        if (item.liked) {
          item.liked = false;
          item.like_count--;
        } else {
          item.liked = true;
          item.like_count++;
        }
      }).catch((err) => {
        this.$message.error(err.toString())
      })
    },
    goToComment: function(id) {
      var $target = $(id)
      var targetOffset = $target.offset().top - 50
      $('html,body').animate({
        scrollTop: targetOffset
      }, 500)
      $target.css({
        'background-color': '#fffbdd',
        'transition': '0.8s'
      });
      setTimeout(function() {
        $target.css('background-color', '');
      }, 1000);
    },
  },
  filters: {
    fromDevice: function(device) {
      var text = '来自 '
      switch (device) {
        case 'ios':
          text += 'iPhone 客户端'
          break;
        case 'android':
          text += 'Android 客户端'
          break;
        default:
          text = ''
      }
      return text
    }
  },
  beforeMount () {
    this.fetch()
  }
}

</script>

<style lang="stylus">
@import "../stylus/var.styl"
#comment
  box-sizing border-box
  background #F6F6F6
  width 100%
  padding 30px
  margin 0 auto
  textarea
    box-sizing border-box
    background-color #EBEBEB
    border none
    padding 10px
    width 100%
    min-height 60px
    max-width 100%
    font-size 14px
    &.heights
      min-height 100px
  .input-box
    text-align right
    .submit-comment
      margin-top 20px
      border none
      background-color #0185F2
      color #fff
      display inline-block
      outline 0
      transition background-color .3s
      cursor pointer
      line-height 1.5
      padding 5px 15px
      border-radius 0

  .icon-thumbs-up
    color #F84B8D
  .comment-wrap
    clear both
    h4
      padding 10px 0
      font-size 14px
  .comment-item
    margin 20px 0 20px 50px
    padding 20px 0
    &:not(:last-child)
      border-bottom 1px solid rgba(0,0,0,.1)
    &.sub-comment
      border none
      margin-left 0px
      background #EBEBEB
      padding 0 15px 1px
      margin-right -15px
  .avatar-box
    margin-left -50px
    img
      display inline
      margin-right 10px
      vertical-align middle
      border-radius 50%
      width 40px
      height 40px
      border 1px solid #efefef
  .from-type
    display inline-block
    padding-left 1em
    // color #999
  .like-box
    float right
    margin-top -30px
    cursor pointer
    color rgba(0,0,0,.4)
    &.liked
      color #000
    .like-icon
      display inline-block
      vertical-align middle
      width 18px
      height 18px
      background-size auto 100%
      margin-right 3px
  .c-body
    padding 10px 0 15px
    font-size 16px
    font-weight 400
    word-break break-all
    line-height 1.5
    span
      color #F84B8D
      padding 0 .3em
  .c-rp
    text-align left
    margin-bottom 15px
    font-size 12px
    .time
      display inline-block
    span
      float right
      cursor pointer
  .reply-form
    margin-right -15px
  @media screen and (max-width: $screen-xs-max)
    // padding 10px
    .comment-wrap
      width 100%
    .from-type
      display none
</style>
