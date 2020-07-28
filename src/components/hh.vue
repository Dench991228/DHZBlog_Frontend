<template>
  <div class="df-header" id="navigator" style="width: 100%; height:70px;">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#ffffff"
      text-color="#000000"
      active-text-color="#FF6600"
    >
      <div
        id="buttonOfTopline"
        style="float:left; padding-left:100px;padding-right:100px"
      >
        <h3>Let's Share</h3>
      </div>
      <div
        id="searchOfTopline"
        style="float:left; height: 50px; padding-top:8px"
      >
        <el-input
          placeholder="请输入内容"
          v-model="search.Value"
          class="input-with-select"
          @change="changeEvent"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="Search(1)"
          >全局</el-button>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="Search(2)"
          >分区</el-button>-
        </el-input>
        {{this.search.Value}}
      </div>
      <div style="float:left;margin-left:50px; padding-top:8px;" v-if="this.$store.state.isRegister">
        <el-button @click="toArticle(xiba,-1)" icon="el-icon-circle-plus-outline">创作</el-button>
      </div>
      <div  style=" margin-left:50px; margin-right:50px; margin-top:8px;"  v-if="this.$store.state.isRegister">
        <el-dropdown>
          <el-button type="primary">
            我的<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toProfile"
              ><i class="el-icon-user-solid"></i>个人</el-dropdown-item
            >
            <el-dropdown-item @click.native="toUserModify"
              ><i class="el-icon-s-tools"></i>修改</el-dropdown-item
            >
            <el-dropdown-item  @click.native="logout"
              ><i class="el-icon-s-release"></i>注销</el-dropdown-item
            >
          </el-dropdown-menu>
          <el-button v-if="this.$store.state.isRegister" style="margin-left:30px" 
        type="primary" icon="el-icon-message-solid" @click="changeToDynamic"></el-button>
        </el-dropdown>
      </div>
        <el-menu-item style="float:right; margin-right:50px" @click="toHome" >主页</el-menu-item>
        <el-menu-item  style="float:right" @click="toRegister" v-if="!this.$store.state.isRegister">注册</el-menu-item>
        <el-menu-item  style="float:right;" @click="toLogin" v-if="!this.$store.state.isRegister">登录</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import QS from "qs";
import axios from 'axios';
import ArticleEditor from "@/components/ArticleEditor.vue"
export default {
  name: "Navigator",
  components: {
        ArticleEditor
    },
  data() {
    return {
      activeIndex: "1",
      search: {
        Type:"Tag",//,"All"
        Value:""
      },
      xiba: this.$store.state.userProfile.UID
    };
  },
  methods: {
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
        if(_type==1){
          this.search.Type="Tag";
        }
        if(_type==2){
          this.search.Type="All";
        }
        this.$axios
        .post("/Search", QS.stringify(this.search))
        .then(response => {
          console.log(response.data);
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
      this.$router.push({ path: "/home" });
    },
    toRegister() {
      this.$router.push({ path: "/user/register" });
    },
    toLogin() {
      this.$router.push({ path: "/user/login" });
    },
    /*toProfile() {
      this.$router.push({ 
        path: "/user/profile"
      });
    },*/
    toProfile() {
      this.$router.push({ 
        path : "/user/profile",
        query: {
          UID : parseInt(this.$store.state.userProfile.UID ),
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

<style scoped lang="stylus">
Blue = #42b983
Light-Blue = #87d86b
White = #FFF
Dark-White = #F9FAFC
Green = #FF7352
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
.df-header
  font-weight bold
  background-color White !important
  .el-menu-item
    font-size 1em
    transition all .2s ease
    &:hover
      border-bottom 3px solid Blue
      bc(White !important,Blue)
      transform translateY(-10px)
    &.is-active
      border-bottom-left-radius 80%
      border-bottom-right-radius 10%
      border-bottom 3px solid Blue
      color Blue
  .searchbar-wrapper
    padding-top 15px
    .searchbar-act
      width 100% !important
      transition all .5s
      &+button
        position absolute
        zoom .001
        transform scale(0)
        transition all .5s
    .searchbar
      width 70%
      &>i
        &:focus,&:hover
          color Blue !important
    .create
      margin-left 10px
      color Silver
      text-align center
      &:hover, &:focus
        bdco(Blue,Blue)
  .actions
    fj()
    .menu
      border 0
      .el-submenu__title
        &:hover
          background-color White
        .avatar
          wh(40px,40px)
          margin-top 10px
          border-radius 40px
        &>i
          display none
      .el-menu-item
        border 0
        font(.8em,Light-Silver)
        text-align center
        &>i
          padding-right 5px
          color Light-Blue
          &:hover
            color Blue
        &:hover
          border-bottom 0
          transform translateY(-3px)
    .inbox
      z-index 999
      .el-badge
        &>sup
          top 20px
          background-color Blue
        &>i
          font-size 1.8em
    .is-active
      .el-submenu__title
        border-bottom-left-radius 70%
        border-bottom-right-radius 70%
        border-bottom 3px solid Blue
        color Blue
        transition all .2s
      i
        color Blue
 .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
