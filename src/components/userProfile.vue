<template>
  <div style="background:#f0f0f0;padding:0px 0px 0px 0px">
    
    <!--顶栏区-->
    <div style="width:100%;min-height:90px;margin:0 auto;vertical-align:top">
      <myHeader></myHeader>
      <!--顶部信息板-->
      <div style="background:#ececff;margin:0 auto 0 auto;vertical-align:top;padding:10px 0 10px 0;">
        <div>
          <h1 class="name">{{ this.userProfile1.nickname }}</h1>
        </div>
        <div style="width:100%;text-align:left">
          <div style="width:20%;display:inline-block;margin-left:15%;text-align:center">
            <h2>文章</h2>
            <h2>{{ this.userProfile1.likeNum }}</h2>
          </div>
          <div style="width:20%;margin-left:5%;display:inline-block;text-align:center">
            <h2>关注</h2>
            <h2>{{ this.userProfile1.follow }}</h2>
          </div>
          <div style="width:20%;margin-left:5%;display:inline-block;text-align:center">
            <h2>粉丝</h2>
            <h2>{{ this.userProfile1.fans }}</h2>
          </div>
            <!--<el-button slot="append" icon="el-icon-upload2"  v-if="isOwns">上传资源</el-button>-->
        </div>
      </div>

      <!--个人信息板之下-->
      <div 
        id="main" 
        style="width:100%;
          vertical-align:top;
          text-align:center;min-height:700px"
      >
        <!--左栏：选择模式（个人收藏还是个人创作）-->
        <ul 
          style="width:15%;
            display:inline-block;
            border:1px solid #dddddd;
            margin-top:10px;
            background:#f8f8f8;
            list-style:none;
            padding-left:0px"
        >
          <li 
            :class="getClass('written')" 
            @click="getUserArticles($route.query.UID)" 
            @mouseover="hoveron('written')"
            @mouseout="mouseout('written')"
            style="width:100%;
            border-bottom:1px solid #dddddd;margin-top:0px;padding-bottom:15px;padding-top:15px;cursor:pointer"
          >
            <span style="vertical-align:middle">&nbsp;{{call}}&nbsp;的&nbsp;文&nbsp;章&nbsp;</span>
          </li>
          <li 
            :class="getClass('collected')" 
            @click="getCollectedArticles()" 
            @mouseover="hoveron('collected')"
            @mouseout="mouseout('collected')"
            style="width:100%;margin-top:0px;vertical-align:middle;padding-bottom:15px;padding-top:15px;cursor:pointer"
          >
            <span style="vertical-align:middle">&nbsp;{{call}}&nbsp;的&nbsp;收&nbsp;藏&nbsp;</span>
          </li>
        </ul>
        <!--中栏：粉丝，关注的人，收藏的文章，自己的文章-->
        <div class="body" style="border:1px solid #dddddd;display:inline-block;width:60%; height:auto;vertical-align:top;margin-top:10px;background:#ffffff">
          <ArticleList :Articles11="this.userArticles"></ArticleList>
        </div>
        <!--右边栏：资源列表-->
        <div id="rightOfMain" style="border:1px solid #dddddd;display:inline-block;vertical-align:top;width:15%;margin-top:10px;background:#f8f8f8 ">
          <resourceboard :tar_uid="parseInt(this.$route.query.UID)" :cur_uid="this.$store.state.userProfile.UID"></resourceboard>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
//import api from "@/api";
import resourceboard from "@/components/resourceboard.vue"
import ArticleList from "@/components/ArticleList.vue"
import QS from "qs"
import myHeader from "@/components/header/header.vue"
export default {
  name: "userProfile",
  components: {
    resourceboard,
    ArticleList,
    myHeader,
  },
  data() {
    return {
      placeholder: {
        nickname: "行不更名坐不改姓",
        birthday: "生日格式：1996-07-21",
        signature: "私人语录即一句话显逼格，最长为140个字符",
        poet: "想被推荐的博文类型"
      },
      userArticles: {
          Titles: [],
          Likes: [],
          NumComments:[],
          Times:[],
          WriterNames:[],
          AID:[],
          WriterIDs:[]
        },
        // 个人信息 or 用户信息
      userProfile1:{
          nickname: '[ Loading ]',
          likeNum:0,//点赞数
          follow:0,//关注数
          fans:0,//被关注数
      },
      dialogVisible: false,
      isOwns: true,
      selected:"written",
      hover:"",
      call:"Ta",//谁的收藏/文章
    };
  },
  mounted() {
    // 检查是否是个人信息页面
    console.log(this.$route.query.UID);
    var ret=this.checkoutOwns();
    if(ret===true){
      this.call='我'
    }
    this.getUserInfomation(this.$route.query.UID)
    this.getUserArticles(this.$route.query.UID);
  },
  methods: {
    // 检查该页面属于个人信息页面 or 用户信息页面
    checkoutOwns() {
      if(this.$route.query.UID==this.$store.state.userProfile.UID){
        this.isOwns = true;
        return true;
      }
      else{
        this.isOwns=false;
        return false;
      }
    },
    getCollectedArticles(){
      this.selected='collected';
      let uid = this.$route.query.UID;
      let form = new FormData();
      form.append("UID",uid);
      this.$axios.post("/UserCollection", form)
      .then(response=>{
        this.userArticles.AIDs=response.data.AIDs
        this.userArticles.WriterIDs=response.data.WriterIDs
        this.userArticles.Titles = response.data.Titles
        this.userArticles.Likes = response.data.Likes
        this.userArticles.NumComments = response.data.NumComments
        this.userArticles.Times = response.data.Times
        this.userArticles.WriterNames = response.data.WriterNames
      }).catch(error => {
        this.$message({
          message: 'UserCollected页面出了一点问题',
          type: 'error',
          customClass: 'c-msg',
          duration: 0,
          showClose: true
        })
        Promise.reject(error)
      })
    },
    getUserInfomation(_UID) {
      var toSubmit={
        UID:_UID
      };
      this.$axios
      .post('/personInfo',QS.stringify(toSubmit)).then(response => {
        this.userProfile1.nickname = "[  "+response.data.Username+" 的 空 间  ]"
        this.userProfile1.likeNum = response.data.NumArticle
        this.userProfile1.follow = response.data.NumSubscribed
        this.userProfile1.fans = response.data.NumFans
      }).catch(error => {
        this.$message({
          message: 'getUserInfo页面出了一点问题',
          type: 'error',
          customClass: 'c-msg',
          duration: 0,
          showClose: true
        })
        Promise.reject(error)
      })
    },
    getUserArticles(_UID) {
      this.selected='written'
      var from={
        UID: this.$store.state.userProfile.UID,
        Type:"User",
        Value:this.$route.query.UID
      }
      this.$axios
      .post('/getArticle',QS.stringify(from)).then(response => {
        this.userArticles.AIDs=response.data.AIDs
        this.userArticles.WriterIDs=response.data.WriterIDs
        this.userArticles.Titles = response.data.Titles
        this.userArticles.Likes = response.data.Likes
        this.userArticles.NumComments = response.data.NumComments
        this.userArticles.Times = response.data.Times
        this.userArticles.WriterNames = response.data.WriterNames
      }).catch(error => {
        this.$message({
          message: 'getArticle页面出了一点问题',
          type: 'error',
          customClass: 'c-msg',
          duration: 0,
          showClose: true
        })
        Promise.reject(error)
      })
    },
    select(item){
      this.selected=item;
    },
    hoveron(item){
      this.hover=item;
    },
    mouseout(item){
      this.hover="";
    },
    getClass(item){
      if(item==this.selected)return "selected";
      else if(item==this.hover)return "hover";
      else return "calm";
    }
  },

};
</script>
<style lang="css">
.calm{
  color:black;
  text-decoration: none;
  font-weight: normal;
  background:#f8f8f8;
  font-size: 18px;
}
.hover{
  color:blue;
  text-decoration: none;
  font-weight: bold;
  background:#f0f0f0;
  font-size: 18px;
}
.selected{
  color:black;
  text-decoration: none;
  font-weight: bold;
  background:#e8e8e8;
  font-size: 18px;
}
</style>
