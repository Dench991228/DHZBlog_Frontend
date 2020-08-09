<template>
  <!--整个页面-->
  <div class="home" style="width=100%;min-height:1000px;background:#f0f0f0;margin:0 auto 0 auto;height:100%">
    <!--顶栏区域-->
    <!--最顶上的顶栏-->
    <div 
      class="df-header" 
      id="navigator" 
      style="position:fixed;
        width:100%;height:90px;
        text-align:left;
        background:#fff;
        border-bottom:1px solid #cccccc;
        z-index:0;
        min-wdith:1200px;
        "
    >
      <!--logo-->
      <div
        id="buttonOfTopline"
        style="display:inline-block;
        width:15%;
        margin-left:5%;
        vertical-align:middle;
        cursor:default
        "
      >
        <h1 style="text-align:center"><span style="color:#5599ff">0</span><span style="color:#ff0000">1</span> Cafe</h1>
      </div>
      <!--按钮区：主页、动态、创作、个人-->
      <div 
        style="margin-left:1px;
          display:inline-block;
          width:5%;cursor:pointer;
          height:100%;
          vertical-align:middle
          " 
        @click="toHome"
        :class="getHeaderClass('main')"
        @mouseover="setHeaderHovered('main')"
        @mouseout="setHeaderHovered('')"
      >
        <h3 style="width:100%;text-align:center;height:100%;margin:0px auto 0px auto;"
          @click="toHome"
          :class="getHeaderClass('main')"
          @mouseover="setHeaderHovered('main')"
          @mouseout="setHeaderHovered('')"
        >
          <p style="display:inline-block;height:100%;margin:0 auto 0 auto;vertical-align:middle"></p>
          <p style="display:inline-block;vertical-align:middle">主页</p>
        </h3>
      </div>
      <div style="display:inline-block;width:5%;vertical-align:middle;margin-left:0px;height:100%">
        <h3 
          v-if="this.$store.state.isRegister" 
          :class="getHeaderClass('dynamic')" 
          @click="getDynamicData" 
          style="width:100%;
            height:100%;
            text-align:center;
            cursor:pointer;
            margin:0 auto 0 auto" 
          @mouseover="setHeaderHovered('dynamic')"
          @mouseout="setHeaderHovered('')"
        >
          <p style="display:inline-block;height:100%;margin:0 auto 0 auto;vertical-align:middle"></p>
          <p style="display:inline-block;vertical-align:middle">动态</p>
        </h3>
        <p v-else></p>
      </div>
      <!--搜索区-->
      <div
        id="searchOfTopline"
        style="
          display:inline-block;
          width:25%;
          vertical-align:middle;
          padding:0px 0px;
          height:100%;
          margin-left:40%;
          text-align:center;
          min-width:320px"
      >
        <div style="height:30%"></div>
        <form style="width:100%;height:40%;text-align:center">
          <input
            type="text"
            id="search"
            placeholder="请输入内容"
            v-model="search.Value"
            @change="changeEvent"
            style="width:50%;display:inline-block;height:100%;vertical-align:middle;padding-left:5px;text-align:left"
          />
          <button
            slot="append"
            icon="el-icon-search"
            @click="Search(2)"
            style="width:20%;display:inline-block;margin-left:0px;padding:0px 0px;height:100%;vertical-align:middle;text-align:center"
          >
            <img :src="this.src_search" width="20%" style="vertical-align:middle;display:inline-block">
            <p style="display:inline-block;width=60%;margin-top:5%;margin-bottom:5%;height=30%;font-size:100%">全文</p>
          </button>
          <button
            slot="append"
            icon="el-icon-search"
            @click="Search(1)"
            style="width:20%;display:inline-block;margin-left:0px;padding:0px 0px;vertical-align:middle;height:100%"
          >
            <img :src="this.src_search" width="20%" style="vertical-align:middle;display:inline-block">
            <p style="display:inline-block;width=50%;margin-top:5%;margin-bottom:5%;height=30%;font-size:100%">标签</p>
          </button>
        </form>
      </div>
    </div>
    <!--顶栏完结-->
    <!--顶栏区域完结-->

    <!--顶栏之下-->
    <div style="width:100%;text-align:center;vertical-align:top">
      
      <!--左边栏-->
      <!--分区列表-->

      <div
        id="leftOfMain"
        style="width:15%;
          display:inline-block;
          margin-top:95px;
          background:#f8f8f8;
          vertical-align:middle;
          border:1px solid #dddddd;
          position:fixed;
          margin-left:-16%;
          padding:0px 0px 0px 0px;
        ;"
      >
        <div style="width:100%;border-bottom:1px solid #dddddd;vertical-align:middle;margin-bottom:0px">
          <h2 >分区列表</h2>
        </div>
        <ul style="list-style:none;padding-left:0px;margin-top:0px;margin-bottom:0px">
          <li class="selectedPartition" style="padding-top:5px;padding-bottom:5px" id="partition0">
            <img :src="this.src_all" width="15%" style="display:inline-block;vertical-align:middle">
            <span 
              slot="title" 
              @click="getLocalData('-1')"  
              @mouseover="setHovered('-1')"
              @mouseout="setHovered('')" 
              style="display:inline-block;
                verticle-align:middle;
                width:40%;
                cursor:pointer;"
            >
              全部分区
            </span>
          </li>
          <li v-for="(item,i) in getpart" :key="i" class="partitions" style="padding-top:5px;padding-bottom:5px" :id="'partition'+(i+1)">
            <img :src= "geturl(item.partition_icon_url)" width="15%" style="display:inline-block;vertical-align:middle">
            <span 
              slot="title" 
              @click="PIDSummit(item.partition_pid)" 
              @mouseover="setHovered(item.partition_pid)" 
              @mouseout="setHovered('')" 
              style="
                display:inline-block;
                verticle-align:middle;
                width:40%;cursor:pointer"
              >
                {{item.partition_name}}
              </span>
          </li>
        </ul>
      </div>
      <!--左边栏完结-->
      <!--文章列表/动态列表区域-->
      <!--全部/分区/动态列表-->
      <div style="
        width:60%;
        display:inline-block;
        margin-top:95px;
        background:#ffffff;
        vertical-align:top;
        border:1px solid #dddddd
      ">
        <div v-if="this.$store.state.isCurrentBlog && this.isDynamic!=true" 
        style="height:auto;">
          <ArticleList :Articles11="this.localData"></ArticleList>
        </div>
        <!--搜索结果-->
        <div v-else-if="this.isDynamic!=true" 
        style="height:auto;">
          <ArticleList :Articles11="this.localData"></ArticleList>
        </div>
        <!--动态列表-->
        <div v-if="this.isDynamic" 
        style="height:auto;">
          <Dynamic :DynamicInfo="this.Movement"></Dynamic>
        </div>
      </div>
      <!--右边栏-->
      
      <div style="
        width:15%;
        min-height=80px;
        margin-top:95px;
        display:inline-block;
        vertical-align:top;
        background:#f8f8f8;
        position:fixed;
        margin-left:1%
        "
      >
        <!--注册登录模块（只在未登陆时显示，默认是登录）-->
        <div v-if="!this.$store.state.isRegister">
          <el-menu
              default-active="1-1"
              class="el-menu-demo"
              mode="horizontal"
              text-color="#000000"
              active-text-color="#000000"
              style="border:1px solid #dddddd;background:#f8f8f8"
            >
            <el-menu-item index="1-1" style="width:50%" @click="toLogin" >登录</el-menu-item>
            <el-menu-item index="1-2" style="width:50%" @click="toRegister">注册</el-menu-item>
          </el-menu>
          <userLogin v-if="this.showLogin" style="margin-top:1px;border:1px solid #dddddd"></userLogin>
          <userRegister v-else style="margin-top:1px;border:1px solid #dddddd"></userRegister>
        </div>
        <!--个人信息/信息修改模块（只在登陆时显示，默认是个人信息）-->
        <div v-else>
          <el-menu
              default-active="1-1"
              class="el-menu-demo"
              mode="horizontal"
              text-color="#000000"
              active-text-color="#000000"
              style="border:1px solid #dddddd;background:#f0f0f0"
            >
            <el-menu-item index="1-1" style="width:50%" @click="showInfo" >个人信息</el-menu-item>
            <el-menu-item index="1-2" style="width:50%" @click="showModification">修改信息</el-menu-item>
          </el-menu>
          <userModify v-if="this.showModify"></userModify>
          <div id="mine" v-if="!this.showModify">
            <personInfo :isMine="true"></personInfo>
            <hr style="width:70%">
            <div id="buttons">
              <div 
                style="vertical-align:middle;margin-top:0px;padding:10px 0 10px 0" 
                :class="'partitions'" 
                @mouseover="setHovered('new_article')" 
                @mouseout="setHovered('')"
              >
                <img :src="this.src_write" style="display:inline-block;width:10%;height:width;vertical-align:middle">
                <span v-if="this.$store.state.isRegister" style="
                  display:inline_block;
                  text-align:center;
                  cursor:pointer;
                  font-size:18px;
                  font-weight:bold;
                  vertical-align:middle" 
                  @click="toArticle($store.state.userProfile.UID,-1)"
                >
                  创作博文
                </span>
              </div>
              <div 
                style="vertical-align:middle;margin-top:0px;padding:10px 0 10px 0"
                :class="'partitions'"
                @mouseover="setHovered('profile')"
                @mouseout="setHovered('')"
              >
                <img :src="this.src_profile" style="display:inline-block;width:10%;height:width;vertical-align:middle">
                <span v-if="this.$store.state.isRegister" style="
                  display:inline_block;
                  text-align:center;
                  cursor:pointer;
                  font-size:18px;
                  font-weight:bold;
                  vertical-align:middle" 
                  @click="toProfile"
                >
                  个人主页
                </span>
              </div>
              <div 
                style="vertical-align:middle;margin-top:0px;padding:10px 0 10px 0"
                :class="'partitions'"
                @mouseover="setHovered('logout')"
                @mouseout="setHovered('')"
              >
                <img :src="this.src_logout" style="display:inline-block;width:10%;height:width;vertical-align:middle">
                <span v-if="this.$store.state.isRegister" style="
                  display:inline_block;
                  text-align:center;
                  cursor:pointer;
                  font-size:18px;
                  font-weight:bold;
                  vertical-align:middle" 
                  @click="logout"
                >
                  退出登录
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--顶栏之下完结-->
  </div>
</template>




<script>
// @ is an alias to /src
import Navigator from "@/components/Navigator.vue";
import axios from "axios";
import ArticleList from "@/components/ArticleList.vue"
import Dynamic from "@/components/Dynamic.vue"
import userRegister from "@/components/userRegister.vue"
import QS from "qs";
import userLogin from "@/components/userLogin.vue";
import userModify from "@/components/userModify.vue";
import personInfo from "@/components/personInfo.vue";
import icon_search from "@/static/icon_search.png";
import icon_logout from "@/static/icon_logout.png";
import icon_write from "@/static/icon_write.png";
import icon_profile from "@/static/icon_profile.png";
import icon_all from "@/static/icon_all.png";
export default {
  name: "Home",
  components: {
    Navigator,
    ArticleList,
    Dynamic,
    userRegister,
    userLogin,
    userModify,
    personInfo
  },
  data() {
    return {
      showLogin:true,//现在展示的是登录还是注册
      showModify:false,//现在是展示个人信息修改还是个人信息
      isDynamic:false,
      src_search:icon_search,
      src_write:icon_write,
      src_profile:icon_profile,
      src_logout:icon_logout,
      src_all:icon_all,
      hoveredPartition:"",//鼠标漂浮的分区
      selectedPartition:"",//当前选中的分区
      selectedHeader:"main",//顶栏善选中的项，默认是主页
      hoveredHeader:"",//鼠标在顶栏上的项
      localData: {
        Titles: [],
        Likes: [],
        NumComments:[],
        Times:[],
        WriterNames:[]
      },
      Movement:{
        UID: [],
        AID: [],
        Titles: [],
        Time :[],
        Username : [],
        Type : []
      },
      form: {
        UID: this.$store.state.userProfile.UID,
        Type:"Sector",//,"User"
        Value:-1
      },
      activeIndex: "1",
      search: {
        Type:"Tag",//,"All"
        Value:""
      },
      xiba: this.$store.state.userProfile.UID,
      getpart: []
    };
  },
  props: ['Article'],
  created() {
    console.log("current uid:"+this.$store.state.userProfile.UID);
    this.getPartition();
    this.getLocalData(-1)
  },
  methods: {
    /*样式相关*/
    /*分区列表的样式相关 */
    getPartitionClass(p){
      if(p==this.selectedPartition){
        console.log("selected:"+p);
        return "selectedPartition";
      }
      else if(p==this.hoveredPartition) return "hoveredPartition";
      else return "calmPartition";
    },
    setHovered(p){
      console.log("hover:"+p)
      this.hoveredPartition=p;
    },
    setSelected(p){
      this.selectedPartition=p;
    },
    /*顶栏的样式相关 */
    getHeaderClass(p){
      if(this.selectedHeader==p)return "selectedHeader";
      else if(this.hoveredHeader==p)return "hoveredHeader";
      else return "calmHeader";
    },
    setHeaderHovered(p){
      this.hoveredHeader=p;
    },
    setHeaderSelected(p){
      this.selectedHeader=p;
    },
    geturl(url){
      return "http://182.92.223.226"+url;
    },
    PIDSummit(_sectorID) {
      this.isDynamic=false;
      this.form.Value=_sectorID;
      this.form.UID=this.$store.state.userProfile.UID;
      let selected = document.getElementsByClassName("selectedPartition");
      var i;
      for(i=0;i<selected.length;i++){
        selected[i].setAttribute("class","partitions");
      }
      document.getElementById("partition"+_sectorID).setAttribute("class","selectedPartition");
      this.$axios
        .post("/getArticle", QS.stringify(this.form))
        .then(response => {
          this.localData.Titles = response.data.Titles
          this.localData.Likes = response.data.Likes
          this.localData.NumComments = response.data.NumComments
          this.localData.Times = response.data.Times
          this.localData.WriterNames = response.data.WriterNames
          this.localData.WriterIDs=response.data.WriterIDs
          this.localData.AIDs=response.data.AIDs
          this.$store.commit('changeCurrentBlog',true);
        })
        .catch(error => {
          this.$message({
            message: "该页面出了点状况",
            type: "error",
            customClass: "c-msg",
            duration: 0,
            showClose: true,
            duration: 1000
          });
          Promise.reject(error);
        });
    },
    getPartition(){
      this.isDynamic=false;
      this.$axios
      .post("/getPartition", QS.stringify(this.form))
      .then(response => {
        this.getpart=response.data.partition_data;
        console.log(this.getpart);
      })
      .catch(error => {
        this.$message({
          message: "该页面出了点状况",
          type: "error",
          customClass: "c-msg",
          duration: 0,
          showClose: true,
          duration: 1000
        });
        Promise.reject(error);
      });
    },
    getLocalData(_sectorID) {
      this.isDynamic=false;
      this.form.UID=this.$store.state.userProfile.UID;
      this.form.Value=_sectorID;
      this.selectedPartition="-1";
      let selected = document.getElementsByClassName("selectedPartition");
      var i;
      for(i=0;i<selected.length;i++){
        selected[i].setAttribute("class","partitions");
      }
      if(document.getElementById("partition0")!=null)document.getElementById("partition0").setAttribute("class","selectedPartition");
      this.$axios
      .post('/getArticle',QS.stringify(this.form)).then(response => {
        this.localData.Titles = response.data.Titles
        this.localData.Likes = response.data.Likes
        this.localData.NumComments = response.data.NumComments
        this.localData.Times = response.data.Times
        this.localData.WriterNames = response.data.WriterNames
        this.localData.WriterIDs=response.data.WriterIDs
        this.localData.AIDs=response.data.AIDs
        console.log(this.localData)
      }).catch(error => {
        this.$message({
          message: '页面出了一点问题dgdf',
          type: 'error',
          customClass: 'c-msg',
          duration: 0,
          showClose: true,
          duration: 1000
        })
        Promise.reject(error)
      })
    },
    getDynamicData() {
      if(this.selectedHeader!="dynamic"){
        console.log(this.isDynamic);
        this.isDynamic=true;
        console.log(this.isDynamic);
        var movePara={
          UID:this.$store.state.userProfile.UID
        }
        this.selectedHeader="dynamic";
        this.$axios
        .post('/MovementList',QS.stringify(movePara)).then(response => {
          this.Movement.UID=response.data.UID
          this.Movement.AID=response.data.AID
          this.Movement.Titles = response.data.TargetTitle
          this.Movement.Time = response.data.Time
          this.Movement.Username = response.data.Username
          this.Movement.Type = response.data.Type
        }).catch(error => {
          this.$message({
            message: 'Dynamic页面出了一点问题',
            type: 'error',
            customClass: 'c-msg',
            duration: 0,
            showClose: true,
            duration: 1000
          })
          Promise.reject(error)
        })
      }
    },
    logout(){
      this.$store.commit('changeUserState',false);
      this.$store.commit('changeUID','');
      return this.$message({
        message: "注销成功",
        type: "success",
        customClass: "c-msg",
        showClose: true,
        duration: 1000
      });
    },
    Search(_type){
      this.isDynamic=false;
        if(_type==1){
          this.search.Type="Tag";
        }
        if(_type==2){
          this.search.Type="All";
        }
        this.$axios
        .post("/Search", QS.stringify(this.search))
        .then(response => {
          this.localData.Titles = response.data.Titles
          this.localData.Likes = response.data.Likes
          this.localData.NumComments = response.data.NumComments
          this.localData.Times = response.data.Times
          this.localData.WriterNames = response.data.WriterNames
          this.localData.WriterIDs=response.data.WriterIDs
          this.localData.AIDs=response.data.AIDs
        })
        .catch(error => {
          this.$message({
            message: "该页面出了点状况",
            type: "error",
            customClass: "c-msg",
            duration: 0,
            showClose: true,
            duration: 1000
          });
          Promise.reject(error);
        });
    },
    changeToDynamic(){
      this.$store.commit('changeCurrentBlog',false);
    },
    changeToBlog(){
      this.$store.commit('changeCurrentBlog',true);
    },
    changeEvent() {
      this.$forceUpdate();
    },
    toHome() {
      if(this.selectedHeader!='main'){
        this.getLocalData(-1);
        this.selectedHeader="main";
        this.$router.push({ path: "/home" });
      }
    },
    toRegister() {
      this.showLogin=false;
    },
    toLogin() {
      this.showLogin=true;
    },
    showModification(){
      this.showModify=true;
    },
    showInfo(){
      this.showModify=false;
    },
    toProfile() {
      this.$router.push({ 
        path : "/user/profile",
        query: {
          UID : parseInt(this.$store.state.userProfile.UID ),
          Judge:1
        }
      });
    },
    toUserModify() {
      this.$router.push({ path: "/user/modify"});
    },
    toArticle(_Author_ID,_AID){
      this.$router.push({
        path:`/ArticleEditor/${_Author_ID}/${_AID}`,
        params:{
          Author_ID:_Author_ID,
          AID:_AID,
        }
      })
    },
  }
};
</script>
<style>
/*关于分区列表的种种，右边栏也用同样的一套*/
.partitions{
  font-weight:bold;
  color:black;
  background:#f8f8f8;
}
.partitions:hover{
  font-weight:bolder;
  color:blue;
  background:#f0f0f0;
}
.selectedPartition{
  font-weight:bolder;
  color:black;
  background:#e8e8e8;
}
/*关于顶栏的种种*/
.selectedHeader{
  font-weight: bolder;
  background: #f0f0f0;
  color:black;
}
.hoveredHeader{
  font-weight: bolder;
  color:blue;
  background: #f8f8f8;
}
.calmHeader{
  font-weight: bold;
  color:black;
  background: #ffffff;
}

</style>
<style scoped lang="stylus">
.each {
  width: 30%;
  border: 1px solid black;
  margin: 5px;
  cursor: pointer;
}

.df-subPoem
  fj()
  margin 20px 0
  border-bottom 1px solid Extra-Light-Grey
  &:hover
    transform translateY(-3px)
    background-color 	#D8D8D8
  .main-left
    margin-right 20px
    .avatar
      wh(120px,120px)
      border-radius 10px
      box-shadow 0 1px 1px rgba(0,0,0,.2)
  .main-right
    position relative
    margin 0 !important
    width 100%
    .header
      .title
        display inline-block
        font(1.5em,mgreen(.8))
        text-decoration none
        transition all .3s
        &:hover
          transform translateY(-1px)
      .favor,.trash
        float right
    .info
      margin 0px 0
      &>span:first-child
        &>a
          text-decoration none
          color Green
      span
       margin-right 5px
       font(.8em,Silver)
       &>i
         margin-right 5px
    .body
      margin 10px 0 20px 0
      font(.8em,Silver)
      .content
        max-height 120px
        overflow hidden
        padding-bottom 20px
        word-break break-all
        line-height 2em
        cursor pointer
        .ellipsis
          color Green
        *
          display inline-block
          margin 0
     .footer
      fj(space-between)
      position absolute
      bottom 5px
      left 0
      width 100%
      .feedback
        float right
        margin-bottom 5px
        &>a
          margin-left 10px
          font(.7em,Silver)
          text-decoration none
          transition all .2s
          &:hover,&:focus
            color Green
            cursor pointer
          &>i
            margin-right 5px

Green = #42b983
Light-Green = #87d86b
White = #FFF
Dark-White = #F9FAFC
Red = #FF7352
Blue = #64c0ff
Orange = #F7BA2A
Light-Orange = #ffc741
Silver = #8492A6
Light-Silver = #99A9BF
Extra-Light-Silver = #C0CCDA
Grey = #D3DCE6
Light-Grey = #E5E9F2
Extra-Light-Grey = #EFF2F7
Black = #1F2D3D
Light-Black = #324057
Extra-Light-Black = #475669

fj(x=flex-start,y=stretch)
  display flex
  justify-content x
  align-items y

wh(w,h)
  width w
  height h

bc(bgC=Green,c=Write)
  color c
  background-color bgC

bdco(bdc=Green,c=Green)
  border-color bdc
  color c

font(s,c)
  font-size s
  color c

mgreen(o=1)
  rgba(66,185,131,o)

</style>
