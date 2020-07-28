<template>
  <div class="hello">
    <!--顶栏-->
    <div style="height:90px;width:100%">
      <myHeader></myHeader>
    </div>
    <!--模式选择-->
    <div v-if="(aid==-1||uid==author_id) && this.uid!=null &&this.uid!=''">
      <el-button  type="primary" @click="changeMode(true)"><h2>编辑模式</h2></el-button>
      <el-button type="primary" @click="changeMode(false)"><h2>浏览模式</h2></el-button>
    </div>
    <!--编辑模式-->
    <div class="edit" v-if="(aid==-1||uid==author_id)&&isEditting">
      <!--左边：编辑区域-->
      <div class="left">
        <div class="left_one">
          <el-input placeholder="请输入标题" 
            v-model="title" 
            class="input-with-select" >
          </el-input>               
        </div>
        <div class="left_two">
          <div class="body">
            <mavon-editor 
              v-model=content  
              ref=md
              @imgAdd="$imgAdd" 
              :navigation="false"
              :scrollStyle="true"
              :ishljs = true
              :toolbars="toolbars"
              :toolbarsFlag="true"
              :subfield="true"
            >
            </mavon-editor>
          </div>
        </div>          
      </div>
      <!--编辑区域完结-->
      <!--右边栏-->
      <div class="right">
        <!--分区-->
        <div class="right_one">
          <div>分区与版块</div>
          <input type="checkbox" v-model="partitions" value=1>Java
          <input type="checkbox" v-model="partitions" value=2>Python
          <input type="checkbox" v-model="partitions" value=3>前端
          <input type="checkbox" v-model="partitions" value=4>数据库
        </div>
        <!--标签-->
        <!--标签列表的标题-->
        <div class="right_two">
          <h1 style="font-size:30px;color:#6495ED">标签列表</h1>
        </div>
        <!--标签列表的展示-->
        <div class="right_three">
          <div v-if="tags.length==0">
            这篇文章还没有标签
          </div>
          <div v-else
            :key="index"
            v-for="(g,index) in tags"  
          >
            <div class="df-subPoem" style=" height:45px; min-height:20px"  >
              <div id="rank" style="float:left; margin-top:10px">
                <h1 style="font-size:18px;color:black">标签{{index+1}}:{{g}}</h1>
              </div>
              <div class="main-right" style="float:right;margin-top: 5px;">
                <blog-button @click="delItem(index)" type="small">删除</blog-button>
              </div>
            </div>
          </div>
        </div> 
        <!--添加标签的地方-->
        <div class="right_four">
          <div class="right_four_1">
            <el-input 
              placeholder="请输入新增标签" 
              v-model=label 
              class="input-with-select">  
            </el-input>
          </div>
          <div class="right_four_2">
            <blog-button @click="addItem()">
              增加
            </blog-button>
          </div>
        </div>
      </div>
    <!--右侧区域完结-->
    <!--底部：发布文章-->
      <div class="push-article">
        <blog-button 
          @click="this.submitForm" 
          type="primary">
          发布文章
        </blog-button>
      </div>
    </div>
    <!--浏览模式-->
      <!--左栏：所属分区列表、包含标签列表-->
      <!--右栏：作者信息（personInfo）-->
      <!--底部：社交区域，评论区-->
    <div v-else class="view">
      <!--作者信息展示-->
      <div>
        <Personalnavigation :uid='this.author_id' :name='this.author_name' :tags='this.tags' :partitions='this.partitions'/>
      </div> 
      <h1>{{title}}</h1>
      <div>
        <mavon-editor 
          :navigation="true"
          :scrollStyle="true"
          :boxShadow="false"
          v-model="content"
          :ishljs = "true"
          defaultOpen="preview"
          :toolbarsFlag="false"
          :subfield="false"
          :editable="false" 
        />
      </div>
    </div>
    <!--社交区域-->
    <div v-if="aid!=-1 && this.uid!='' &&  this.uid!=null" style="float:left; margin-top:100px">
      <blog-button v-if="this.blogInfo.isLiked" @click="changeArticleLike(false)" type="primary">已赞同{{this.blogInfo.LikeNum}}</blog-button>
      <blog-button v-else  @click="changeArticleLike(true)" type="primary">赞同{{this.blogInfo.LikeNum}}</blog-button>
      <blog-button v-if="this.blogInfo.isCollected" @click="changeArticleCollect(false)" type="primary" >已收藏</blog-button>
      <blog-button v-else  @click="changeArticleCollect(true)" type="primary">收藏</blog-button>
      <blog-button v-if="this.blogInfo.isFollow" @click="changeAuthorFollowed(false)" type="primary">已关注</blog-button>
      <blog-button v-else @click="changeAuthorFollowed(true)" type="primary">关注</blog-button>
    </div>
    <!--评论区-->
    <div v-if="aid!=-1 &&this.uid!=null && this.uid!='' " style="margin-top:100px;">
      <Comment :AID='this.aid' :myuid='this.$store.state.userProfile.UID'  />
    </div>
  </div>
</template>


<script>
import QS from "qs";
import BlogButton from "@/components/commons/button/BlogButton.vue";
import Personalnavigation from "@/components/Personalnavigation.vue";
import Comment from "@/components/Comment.vue";
import axios from 'axios';
import myHeader from "@/components/header/header.vue";
  export default {
    name: "ArticleEditor",
    components: {
      BlogButton,
      Personalnavigation,//,BlogInput    TagInputer
      Comment,
      myHeader
    },
    data () {
      return{
        isEditting:true,
        isNewBlog:false,
        blogInfo:{
        LikeNum: 0,
        isLiked: false,
        isCollected:false,
        isFollow: false
      },
      author_id:Number,
      author_name:"",
      aid:Number,//文章ID
      content: '这是内容',
      title: '这是文章题目',
      partitions:[],
      tags: [],
      radioIschecked: "0",
      checkboxData: [],
      checkList: [],
      label:"",
      dialogVisible: false,
      hostKey: "",
      toolbars: {
        bold: true, // 粗体
        ishljs: true,
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        //table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        //htmlcode: true, // 展示html源码
        help: true, // 帮助
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
    }
  },
    created: function(){
      var param_data = {UID:this.$store.state.userProfile.UID ,AID:this.$route.params.AID};
      this.author_id=this.$route.params.Author_ID;
      this.aid=this.$route.params.AID;
      this.uid=this.$store.state.userProfile.UID;
      //console.log(this.$route.params.AID)
      //this.getArticleInfo(this.$route.params.AID);
      if(this.$route.params.AID!=-1){
        this.$axios.post("/ArticleGet", QS.stringify(param_data))
        /*axios({
              url: 'http://182.92.223.226/ArticleGet',
              method: 'post',
              data: form,
      })*/.then(response => {
              console.log("!!!!");
              this.author_name=response.data.AuthorName;
              this.content=response.data.Content;
              this.partitions=response.data.Partitions;
              this.tags=response.data.Tags;
              this.title=response.data.Title;
      }).catch(error => {
          console.log("错误");
          this.$message({
            message: "ArticleGet出了点状况",
            type: "error",
            customClass: "c-msg",
            duration: 0,
            showClose: true
            });
         });
        if(this.uid!=null&&uid!=""){
          this.getArticleInfo(this.$route.params.AID);
        }
        
        
        
      }
      else{
        //this.submitForm();
      }
    },
    methods: {
        changeMode(mode){
            this.isEditting=mode;
        },
        getArticleInfo(){
            var UserInfo = {
                UID: this.uid,
                AID: this.aid
            };
            this.$axios
                .post("/ArticleInfo",QS.stringify(UserInfo))
                .then(response => {
                    this.blogInfo.LikeNum=response.data.NumLikes,
                    this.blogInfo.isLiked=response.data.IsLiked,
                    this.blogInfo.isCollected=response.data.IsCollected,
                    this.blogInfo.isFollow=response.data.IsSubscribed
                })
                .catch(error => {
                    this.$message({
                        message: "getArticleInfo出了点状况",
                        type: "error",
                        customClass: "c-msg",
                        duration: 0,
                        showClose: true,
                        duration: 1000
                    });
                Promise.reject(error);
                });
        },
        changeArticleLike(isLike){
          if(!this.blogInfo.isLiked && isLike)
            this.blogInfo.LikeNum++;
          if(this.blogInfo.isLiked && !isLike)
            this.blogInfo.LikeNum--;
            this.blogInfo.isLiked=isLike;
            var TheData1 = {
                UID: this.uid,
                AID: this.aid,
                IsLike: isLike
            };
            this.$axios
                .post("/ArticleLike",QS.stringify(TheData1))
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    this.$message({
                        message: "changeArticleLike出了点状况",
                        type: "error",
                        customClass: "c-msg",
                        duration: 0,
                        showClose: true,
                        duration: 1000
                    });
                Promise.reject(error);
                });
        },
        changeArticleCollect(_isCollect){
            this.blogInfo.isCollected=!this.blogInfo.isCollected;
            var TheData2 = {
                UID: this.uid,
                AID: this.aid,
                IsCollect: _isCollect
            };
            this.$axios
                .post("/ArticleCollect",QS.stringify(TheData2))
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    this.$message({
                        message: "changeArticleCollect出了点状况",
                        type: "error",
                        customClass: "c-msg",
                        duration: 0,
                        showClose: true,
                        duration: 1000
                    });
                Promise.reject(error);
                });
        },
        changeAuthorFollowed(_isFollowed){
            this.blogInfo.isFollow=!this.blogInfo.isFollow;
            var TheData3 = {
                UID: this.uid,
                AID: this.aid,
                IsFollow: _isFollowed
            };
            this.$axios
                .post("/AuthorFollowed",QS.stringify(TheData3))
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    this.$message({
                        message: "changeAuthorFollowed出了点状况",
                        type: "error",
                        customClass: "c-msg",
                        duration: 0,
                        showClose: true,
                        duration: 1000
                    });
                Promise.reject(error);
                });
        },
        delItem(index) {
            this.tags.splice(index, 1)
        },
        addItem () {
            for(let i=0;i<this.tags.length;i++){
              if(this.tags[i]==this.label){

                console.log(1);
                return;
              }
            }
            this.tags.push(this.label)
            this.label=""
        },
        // 绑定@imgAdd event
        $imgAdd(pos, $file){
            // 第一步.将图片上传到服务器.
           var formdata = new FormData();
           formdata.append('image', $file);
           console.log("121");
           axios({
              url: '/picSave',
              method: 'post',
              data: formdata,
              headers: { 'Content-Type': 'multipart/form-data' },
           }).then((response) => {
               // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
               console.log(response.data.url);
               //* $vm 指为mavonEditor实例，可以通过如下两种方式获取
               //* 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
               //* 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
               this.$refs.md.$img2Url(pos,response.data.url);
           })
        },
          submitForm() {
                if(this.content==""||this.title=="")
                {
                  this.$message({
                    message: "标题或内容为空！",
                    type: "error",
                    customClass: "c-msg",
                    showClose: true,
                    duration: 1000
                });
                  return;
                }
                var param_data2 = {
                  UID: this.uid,
                  AID: this.aid,
                  Content: this.content,
                  Partitions:this.partitions,
                  Tags :this.tags,
                  Title:this.title,
                }
                let form=new FormData();
                form.append("UID",this.uid);
                form.append("AID",this.aid);
                
                form.append("Partitions",this.partitions);
                
                form.append("Tags",this.tags);
                form.append("Content",this.content);
                form.append("Title",this.title);
                 this.$axios
                    .post("/ArticleSubmit", form)
                    .then((response) =>{
                      console.log(this.content);
                      if(response.data.Status){
                          console.log("4399999");
                          this.uid=null;
                          this.author_id=null;
                          this.aid=null;
                          this.content="";
                          this.partitions=[];
                          this.tags=[];
                          this.title="";
                          this.$message({
                          message:
                            "文章发布成功",
                          type: "success",
                          customClass: "c-msg",
                          duration: 1000
                        });
                      }
                      else{
                          this.$message({
                          message: "文章发布失败",
                          type: "error",
                          customClass: "c-msg",
                          showClose: true,
                          duration: 1000
                        }); 
                      }
                  })
                  .catch(error => {
                    console.log("!!!")
                    this.isLoading = false;
                    this.$message({
                      message: "SubmitForm出了点状况",
                      type: "error",
                      customClass: "c-msg",
                      duration: 0,
                      showClose: true,
                      duration: 1000
                    });
                    Promise.reject(error);
                  });
              },
              delArticle(){
              let form=new FormData();
              form.append("AID",this.aid);
              this.$axios
                    .post("/DeleteArticle", form)
                    .then((response) =>{
                      console.log(this.content);
                      if(response.data.Status){
                          console.log("4399999");
                          this.uid=null;
                          this.author_id=null;
                          this.aid=null;
                          this.content="";
                          this.partitions=[];
                          this.tags=[];
                          this.title="";
                          this.$message({
                          message:
                            "文章删除成功",
                          type: "success",
                          customClass: "c-msg",
                          duration: 1000
                        });
                      }
                      else{
                          this.$message({
                          message: "文章删除失败",
                          type: "error",
                          customClass: "c-msg",
                          showClose: true,
                          duration: 1000
                        }); 
                      }
                  })
                  .catch(error => {
                    console.log("!!!")
                    this.isLoading = false;
                    this.$message({
                      message: "删除文章出了点状况",
                      type: "error",
                      customClass: "c-msg",
                      duration: 0,
                      showClose: true,
                      duration: 1000
                    });
                    Promise.reject(error);
                  });
            },
              
          }
  }</script>
<style lang="scss" scoped>
*{
  margin: 0px;
  padding: 0px;
}
a{
  text-decoration: none;
}
ul{
  list-style: none;
}

header,section,footer{
  width: 1160px;
  margin: 0 auto;
  background-color: rgb(193, 193, 211);
}
footer{
  height: 35px;
}
section{
  margin-top: 5px auto;
  overflow: hidden;
}
section>div{
  //margin-right: 5px;
  float: left;
  //background-color:rgb(161, 161, 231);
  height: 580px;
}
.left{
  width: 880px;
  margin-right: 10px;
  margin-left: 5px;
  margin-top: 10px;
}
.left>div:nth-child(1){
  height: 40px;
  //background-color: black;
  margin-bottom: 10px;
}

.left>div:nth-child(2){
  height: 520px;
  //background-color:rgb(0, 0, 0);
  margin-bottom: 10px;
}

.right{
  width: 260px;
  margin-top: 10px;
}
.right>div:nth-child(1){
  height: 40px;
  background-color:rgb(159, 236, 169);
  margin-bottom: 10px;
}

.right>div:nth-child(2){
  height: 40px;
  background-color:white;
  margin-bottom: 10px;
}

.right>div:nth-child(3){
  height: 420px;
  background-color:white;
}
.right>:nth-child(4){
  height: 40px;
  margin-top: 10px;
  //background-color:black;
}
.right_four>div{
  float:left;
  height: 40px;
}
.right_four_1{
  width: 175px;
}
.right_four_2{
  width:80px;
  margin-left:5px;
  //background-color:rgb(39, 39, 95);
}
.hello {
  height: 100%;
  width: 100%;
  
  .body {
    width: 100%;
    height: 100%;
    .markdown-body {
      width: 100%;
      height: 100%;
    }
  }
}

</style>

