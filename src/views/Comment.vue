<template lang="jade">
#comment
  textarea.min-heights(placeholder="你有什么看法...", name="textarea-io", v-model.trim="message")
  .input-box
    input.submit-comment(type="button", value="发表评论", @click="submitComment")
  .comment-wrap(v-if="comments.length")
    h4
      i.iconfont.icon-double-slash
      | 热门评论
    template(v-for="(item, itemIndex) in comments")
      .comment-item(:id="'comment-' + item.id", v-if="item.commenter_info && item.commenter_info.length > 0")
        .c-header
          .avatar-box
            img(:src="item.commenter_info[0].avatar_url")
            | {{item.commenter_info[0].nickname}}
          .like-box(@click="toggleLike(item, itemIndex)", :class="{'liked animated bounceIn': item.liked}")
            i.iconfont(:class="item.liked ? 'icon-thumbs-up' : 'icon-thumbs-o-up'")
            | {{item.like_count}}
        .c-body {{item.content}}
        .c-rp
          .time {{item.created_at | formatDate}}
          span(@click="toggleReplyForm(item.commenter_info[0].nickname, item.id)")
            | {{ replyid == item.id ? '取消' : '回复'}}
        template(v-for="reply in item.childrens")
          .comment-item.sub-comment(:id="'comment-' + reply.id", v-if="reply.commenter_info && reply.commenter_info.length > 0")
            .c-body
              | {{reply.commenter_info[0].nickname}}:
              span @{{reply.parent_commenter_info[0].nickname}}
              | {{reply.content}}
            .c-rp
              .time {{reply.created_at | formatDate}}
              span(@click="toggleReplyForm(reply.commenter_info[0].nickname, item.id, reply.id)")
                | {{ replyid == reply.id ? '取消' : '回复'}}
        form.reply-form(@submit.prevent="submitReply($event, itemIndex)", style="display:none", :id="'replyForm-' + item.id")
          .textarea-wrap
            textarea(name="comment")
          input(type="hidden" name="comment_id")
          .input-box
            button(class="submit-comment") 回复
</template>

<script>
import api from 'stores/api'
import moment from 'moment'

let loginURL
const access_key = localStorage.getItem('access_key')

export default {
  props: ['postid'],
  data () {
    return {
      comments: [],
      message: "",
      nickname: "",
      replyid: "",
      commentLoaded: false,
    }
  },
  mounted() {
    loginURL = `${api.account.defaults.baseURL}login?callback_url=${encodeURIComponent(location.href)}`
  },
  methods: {
    fetch () {
      api.get(`posts/${this.postid}/comments?access_key=${access_key}`).then(result => {
        console.log(result, location.hash);
        this.comments = result.data.comments
        this.commentLoaded = true;

        if (location.hash) {
          this.goToComment(location.hash)
        }
      }).catch((err) => {
        console.log(err);
        this.$message.error(err.toString())
      })
    },
    commentFocusHandler() {
      if (!this.$store.state.userInfo) {
        if (confirm('评论需要登录喔，点击确定去登录')) window.location.href = loginURL;
        return;
      }
    },
    submitComment() {
      if (!this.$store.state.userInfo) {
        if (confirm('评论需要登录喔，点击确定去登录')) window.location.href = loginURL;
        return;
      }
      if (!this.message) {
        this.$message.error('请填写评论内容')
        return
      }
      api.post(`posts/${this.postid}/comments?access_key=${access_key}`, {
        content: this.message
      }).then(result => {
        console.log(result);
        var comment = result.data
        comment.commenter_info = [this.$store.state.userInfo]
        comment.like_count = 0
        comment.childrens = []
        comment.content = this.message
        comment.created_at = new Date()
        this.comments.unshift(comment);
        this.$message({
          message: '评论成功！',
          type: 'success'
        });
        // $('#replyForm-' + _this.comments[i].id).find('textarea').val('');
        this.message = ''
      }).catch((err) => {
        console.log(err);
        this.$message.error(err.toString())
      })
    },
    toggleReplyForm: function(nickname, id, repId) {
      this.nickname = nickname
      if (!this.$store.state.userInfo) {
        if (confirm('回复需要登录喔，点击确定去登录')) window.location.href = loginURL
        return
      }
      var replyForm = $('#replyForm-' + id)
      if (repId !== undefined) {
        replyForm.children('input').val(repId)
        this.replyid = this.replyid == repId ? '' : repId
      } else {
        replyForm.children('input').val(id)
        this.replyid = this.replyid == id ? '' : id
      }
      if (this.replyid) {
        replyForm.show()
      } else {
        replyForm.hide()
      }
      
      if (replyForm.find('textarea').is(':visible')) {
        replyForm.find('textarea').val(`回复${nickname}:`).focus()
      }
    },
    submitReply: function(e, i) {
      var fd = $(e.target).serializeArray()
      var commentId
      var commentContent
      let re = new RegExp(`^回复${this.nickname}:`, "im")
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
        console.log('reply return: ', result)
        var reply = result.data
        reply.commenter_info = [this.$store.state.userInfo]
        reply.content = commentContent
        reply.parent_commenter_info = [{nickname: this.nickname}]
        reply.created_at = new Date()
        this.comments[i].childrens.push(reply);
        this.$message({
          message: '回复成功！',
          type: 'success'
        });
        $('#replyForm-' + this.comments[i].id).hide().find('textarea').val('');
      })
    },
    toggleLike: function(item, index) {
      if (!this.$store.state.userInfo) {
        if (confirm('点赞需要登录喔，点击确定去登录')) window.location.href = loginURL;
        return;
      }
      let like = item.liked ? 'unlike' : 'like'
      console.log(item, index);
      api.post(`posts/${this.postid}/comments/${item.id}/${like}?access_key=${access_key}`).then((result) => {
        console.log('result', result);
        if (item.liked) {
          item.liked = false;
          item.like_count--;
        } else {
          item.liked = true;
          item.like_count++;
        }
      }).catch((err) => {
        console.log(err);
        this.$message.error(err.toString())
      })
    },
    goToComment: function(id) {
      console.log('goToComment', id)
      var $target = $(id)
      var targetOffset = $target.offset().top - $('#header header').height() - 50
      $('html,body').animate({
        scrollTop: targetOffset
      }, 500)
      $target.css({
        'background-color': '#fffbdd',
        'transition': '0.8s'
      });
      setTimeout(function() {
        $target.css('background-color', '');
      }, 3000);
    },
  },
  filters: {
    formatDate: function (value) {
      if (!value) return ''
      let str;
      const time = moment(value);
      const diff = moment().diff(time, 'days');
      if (diff >= 1) {
        str = time.format('YYYY/MM/DD HH:mm');
      } else {
        str = time.locale('zh-cn').fromNow();
      }
      return str
    },
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
    max-width 100%
    min-height 60px
    font-size 14px
    .min-heights
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
    text-align right
    margin-bottom 15px
    font-size 10px
    .time
      float left
    span
      cursor pointer
  .reply-form
    margin-right -15px
  @media screen and (max-width: $screen-xs-max)
    // padding 10px
    .comment-wrap
      width 100%

</style>
