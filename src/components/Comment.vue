<template>
    <div>
        <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply">
            <!--发送评论-->
            <div class="reply-info">
                <div 
                tabindex="0" 
                :contenteditable="this.myuid!=null" 
                id="replyInput" 
                spellcheck="false" 
                :placeholder="this.myuid!=null?'输入评论...':'请先登录'" 
                class="reply-input" 
                @input="onDivInput($event)"
                >
                </div>
            </div>
            <!--发送评论的按钮-->
            <div class="reply-btn-box" v-if="myuid!=null">
                <el-button class="reply-btn" size="medium" @click="sendComment" type="primary" >发表评论</el-button>
            </div>
        </div>
        <!--展示评论-->
        <div v-for="(item,i) in comments" :key="i" class="author-title reply-father" style="text-align:left">
            <!--评论拥有者信息-->
            <div class="author-info">
                <span class="author-name" @click="toProfile(item.uid)">{{item.name}}</span>
                <span class="author-time">{{item.time}}</span>
            </div>
            <!--评论内容展示-->
            <div class="talk-box" style="text-align:left">
                <p style="text-align:left;margin-left:5px">
                    <span class="reply" v-html="item.content" style="text-align:left"></span>
                </p>
            </div>
            <!--回复评论和删除评论-->
            <div class="icon-btn" style="margin-bottom:10px;padding-bottom:5px" v-if="myuid!=null">
                <p @click="showReplyInput(i,item.name,item.cid)" style="display:inline-block;vertical-align:middle;cursor:pointer">
                    <i class="iconfont el-icon-s-comment"></i>
                </p>
                <p @click="deleteComment(item.cid)" style="display:inline-block;vertical-align:middle;cursor:pointer">
                    删除
                </p>
            </div>
            <br>
            <br>
            <!--评论回复区域-->
            <div class="reply-box" >
                <div v-for="(reply,j) in item.reply" :key="j" class="author-title">
                    <!--评论发送者信息-->
                    <div class="author-info">
                        <span class="author-name" @click="toProfile(reply.uid)">{{reply.name}}</span>
                        <span class="author-time">{{reply.time}}</span>
                    </div>
                    <!--回复文本-->
                    <div class="talk-box" style="text-align:left">
                        <p style="text-align:left;margin-left:5px">
                            <span>回复 {{reply.to}}:</span>
                            <span class="reply" v-html="reply.comment"></span>
                        </p>
                    </div>
                    <!--回复按钮-->
                    <div class="icon-btn" v-if="myuid!=null">
                        <span @click="deleteReplyComment(reply.cid,i)">
                            删除
                        </span>
                    </div>
                    <div class="reply-box">
                    </div>
                    <br>
                </div>
            </div>
            <!--评论回复框-->
            <div  v-show="_inputShow(i)" class="my-reply my-comment-reply">
                <div class="reply-info" >
                    <div tabindex="0" contenteditable="true" spellcheck="false" placeholder="输入评论..." @input="onDivInput($event)"  class="reply-input reply-comment-input">

                    </div>
                </div>
                <div class=" reply-btn-box">
                    <el-button class="reply-btn" size="medium" @click="sendCommentReply(i,j)" type="primary">
                        发表评论
                    </el-button>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import Personalnavigation from "@/components/Personalnavigation.vue";
import Navigator from "@/components/Navigator.vue";
import QS from "qs";

Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].cid == val) return i;
    }
    return -1;
};

Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
    function documentHandler(e) {
    // 这里判断点击的元素是否是本身，是本身，则返回
        if (el.contains(e.target)) {
            return false;
        }
    // 判断指令中是否绑定了函数
        if (binding.expression) {
            // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
            binding.value(e);
        }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler;
    document.addEventListener('click', documentHandler);
    },
    update() {},
    unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.vueClickOutside);
    delete el.vueClickOutside;
  },
};
export default {
    props: {
        AID: String,
        myuid:""
    },
    name:'ArticleComment',
    components: {
        Navigator,
        Personalnavigation
    },
    data(){
        return{
            num:0,
            myname: String,
            myemail: String,
            btnShow: false,
            index:'0',
            replyComment:'',
            to:'',
            toId:-1,
            comments:[]
        }
    },
    directives: {clickoutside},
    mounted: function() {
        this.getComment();
        console.log("cur_uid:"+this.myuid);
        var param_data = {UID: this.myuid};
        if(this.myuid!=null){
            this.$axios.post("/profile", QS.stringify(param_data))
                .then(response => {
                  // post 成功，response.data 为返bai回的数据
                    this.myname=response.data.username;
                    this.myemail=response.data.email;
                    /*console.log(response.data.email)
                    console.log(response.data.mobile)
                    console.log(this.form.need_name)*/
                })
                .catch(error => {
                  // 请求失败du
                  console.log(error)
             })
        }
        console.log("comments:"+this.comments);
    },
    methods: {
        getComment(){
            var aid=parseInt(this.AID);
            var param_data = {AID: aid};
            this.$axios
                .post("/CommentList", QS.stringify(param_data))
                .then(response => {
                  this.comments=response.data.comments;
                })
                .catch(error => {
                  this.$message({
                    message: "",
                    type: "error",
                    customClass: "c-msg",
                    duration: 0,
                    showClose: true,
                    duration: 1000
                  });
                  Promise.reject(error);
                });
        },
        toProfile(id){
          this.$message({
            message:
              "【" + id + "】，跳转成功，\\(^o^)/~。",
            type: "success",
            customClass: "c-msg"
          });
          this.$router.push(
              { 
                path: "/user/profile" ,
                query:{
                    UID:id,
                    Judge:1
                }
              }
            );
        },
        inputFocus(){
            var replyInput = document.getElementById('replyInput');
            replyInput.style.padding= "8px 8px"
            replyInput.style.border ="2px solid blue"
            replyInput.focus()
        },  
        showReplyBtn(){
            this.btnShow = true
        },
        hideReplyBtn(){
            this.btnShow = false
            replyInput.style.padding= "10px"
            replyInput.style.border ="none"
        },
        showReplyInput(i,name,id){
            this.comments[this.index].inputShow = false
            this.index =i
            this.comments[i].inputShow = true
            this.to = name
            this.toId = id
        },
        _inputShow(i){
            return this.comments[i].inputShow&&this.myuid!=null
        },
        deleteComment(cid){
                this.comments.remove(cid)
                var param_data = {};
                param_data.CID=cid;
                console.log(param_data);
                this.$axios
                    .post("/DeleteComment", QS.stringify(param_data))
                    .then(response => {
                        console.log(response.data);
                        this.$message({
                            message:"删除回复成功",
                            type:"success",
                            showClose:true,
                            duration:1000
                        })
                    })
                    .catch(error => {
                        this.$message({
                            message: "删除评论失败",
                            type: "error",
                            customClass: "c-msg",
                            duration: 1000,
                            showClose: true
                        });
                        Promise.reject(error);
                    });
        },
        deleteReplyComment(cid,i){
            var param_data = new FormData();
            param_data.append("CID",cid);
            this.comments[i].reply.remove(cid)
            console.log(param_data);
            this.$axios
                .post("/DeleteComment", param_data)
                .then(response => {
                    console.log(response.data);
                    this.$message({
                        message:"删除回复成功",
                        type:"success",
                        showClose:true,
                        duration:1000
                    })
                })
                .catch(error => {
                    this.$message({
                        message: "删除回复失败",
                        type: "error",
                        customClass: "c-msg",
                        duration: 1000,
                        showClose: true
                    });
                    Promise.reject(error);
                });
        },
        sendComment(){
            if(!this.replyComment){
                 this.$message({
                    showClose: true,
                    type:'warning',
                    message:'评论不能为空'
                })
            }else{
                let a ={}
                let input =  document.getElementById('replyInput')
                let time= this.dateStr();
                a.name= this.myname
                a.email=this.myemail
                a.uid=this.myuid
                a.content =this.replyComment
                a.time = time
                a.reply=[]
                this.comments.push(a)
                this.replyComment = ''
                input.innerHTML = '';
                var param_data = {
                    AID: this.AID,
                    UID: a.uid,
                    content: a.content,
                    time: a.time
                };
                console.log(param_data);
                this.$axios
                    .post("/NewComment", QS.stringify(param_data))
                    .then(response => {
                      a.cid=response.data.CID;
                      this.$message({
                          message:"评论成功",
                          type:"success",
                          duration:1000,
                          showClose:true
                      })
                    })
                    .catch(error => {
                      this.$message({
                        message: "",
                        type: "error",
                        customClass: "c-msg",
                        duration: 0,
                        showClose: true
                      });
                      Promise.reject(error);
                    });
            }
        },
        sendCommentReply(i,j){
            if(!this.replyComment){
                this.$message({
                    showClose: true,
                    type:'warning',
                    message:'评论不能为空'
                })
            }else{
                let a ={}
                let time= this.dateStr();
                a.name= this.myname
                a.email=this.myemail
                a.uid=this.myuid
                a.to = this.to
                a.comment =this.replyComment
                a.time = time
                this.comments[i].reply.push(a)
                this.replyComment = ''
                document.getElementsByClassName("reply-comment-input")[i].innerHTML = ""
                let rpid=this.comments[i].cid
                console.log(this.comments[i].cid)
                var param_data = {
                    "RPID": rpid,
                    comment: {
                        AID: this.AID,
                        UID: a.uid,
                        content: a.comment,
                        time: a.time
                    }
                };
                console.log(param_data);
                this.$axios
                    .post("/ReplyComment", QS.stringify(param_data))
                    .then(response => {
                      a.cid=response.data;
                      this.$message({
                          message:"回复成功",
                          type:"success",
                          showClose:true,
                          duration:1000
                      })
                    })
                    .catch(error => {
                      this.$message({
                        message: "",
                        type: "error",
                        customClass: "c-msg",
                        duration: 0,
                        showClose: true
                      });
                      Promise.reject(error);
                    });
            }
        },
        onDivInput: function(e) {
            this.replyComment = e.target.innerHTML;
        },
        dateStr(){
            var dt = new Date();
            return (dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()).replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2');
        }
    },    
}
</script>
<style lang="stylus" scoped>
.my-reply
    padding 10px
    background-color #fafbfc
    .reply-info    
        display inline-block
        margin-left 5px
        width 90%
        @media screen and (max-width:1200px) {
            width 80%
        }
        .reply-input
            min-height 20px
            line-height 22px
            padding 10px 10px
            color #888
            background-color #fff
            border-radius 5px
            &:empty:before
                content attr(placeholder)
            &:focus:before
                content none
            &:focus
                padding 8px 8px
                border 2px solid blue
                box-shadow none
                outline none
    .reply-btn-box
        height 25px
        margin 10px 0
        .reply-btn
            position relative
            float right
            margin-right 15px
.my-comment-reply
    margin-left 50px
    .reply-input
        width flex
.author-title:not(:last-child)
    border-bottom: 1px solid rgba(178,186,194,.3)
.author-title
    padding 10px
    .author-info
      display inline-block
      text-align: left
      margin-left 5px
      width 100%
      height 50px
      line-height 25px
      >span 
        display block
        cursor pointer
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
      .author-name
        color #000
        font-size 20px
        font-weight bold
      .author-info2
        display block
        text-align: left
        margin-left 5px
        width 60%
        height 20px
        line-height 15px
        >span 
          display inline-block
          cursor pointer
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
        .author-uid
          color #999
          font-size 8px
        .author-email
          font-size 8px
        .author-mobile
          font-size 8px
      .author-time
        text-align: left
        font-size 14px
    .icon-btn
        width 30%
        padding 0 !important 
        float right
        @media screen and (max-width : 1200px){
            width 20%
            padding 7px
        }
        >span 
            cursor pointer
        .iconfont 
            margin 0 5px
    .talk-box
        >p
           margin 0
        .reply
            font-size 16px
            color #000
    .reply-box
        margin 10px 0 0 50px
        background-color #efefef
</style>
