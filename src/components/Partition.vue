<template lang="html">
  <div class="df-register">
      <div class="main">
        <div class="form-wrapper">
          <el-form class="login-box" ref="form"  label-position="left" label-width="90px":model="form">
            <h3 class="login-title">分区列表</h3>
            <el-col :span="12">
              <el-menu default-active="2" class="el-menu-vertical-demo">
                <el-menu-item index="-1"  @click="PID1Summit(-1)">
                  <i class="el-icon-menu"></i>
                  <span slot="title">推荐</span>
                </el-menu-item>
                <el-menu-item index="1"  @click="PID1Summit(1)">
                  <i class="el-icon-menu"></i>
                  <span slot="title">OOP</span>
                </el-menu-item>
                <el-menu-item index="2" @click="PID1Summit(2)">
                  <i class="el-icon-document"></i>
                  <span slot="title">HTML</span>
                </el-menu-item>
                <el-menu-item index="3" @click="PID1Summit(3)">
                  <i class="el-icon-setting"></i>
                  <span slot="title">VUE</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import api from "@/api";
import QS from "qs";

export default {
  visible: true,
  name: "Partition",
  data() {
    return {
      labelPosition: 'left',
      form: {
        UID: 1,
        Type:"Sector",
        Value:{
          SectorID: 1
        }
      },
      Article: {
        Titles: [],
        Likes: [],
        NumComments:[],
        Times:[],
        WriterNames:[]
      }
    };
  },
  methods: {
    PID1Summit(_sectorID) {
      this.form.Value.SectorID=_sectorID;
      this.$axios
        .post("/ArticleTest", QS.stringify(this.form))
        .then(response => {
          //this.Article.Titles = response.data.Titles
          this.Article.Titles = ["fjldsf","flsdfj","fjlsdfj"]
          this.Article.Likes = response.data.Likes
          this.Article.NumComments = response.data.NumComments
          this.Article.Times = response.data.Times
          this.Article.WriterNames = response.data.WriterNames
        })
        .catch(error => {
          this.$message({
            message: "该页面出了点状况",
            type: "error",
            customClass: "c-msg",
            duration: 0,
            showClose: true
          });
          Promise.reject(error);
        });
    }
  }
};
</script>
<style lang="stylus" scoped>

fj(x=flex-start,y=stretch)
  display flex
  justify-content x
  align-items y

wh(w,h)
  width w
  height h

bc(bgC=Blue,c=Write)
  color c
  background-color bgC

bdco(bdc=Blue,c=Blue)
  border-color bdc
  color c
font(s,c)
  font-size s
  color c
.df-register
  height 100%
  .main-wrapper
    width 100%
    .alert
      margin-top 10px
      text-align center
    .main
      fj(center,center)
      .form-wrapper
        width 33.3%
        .form
          .publish
            width 100%
      .register-dialog
        .about-user,.copyright
          &>span
            display inline-block
            line-height 1em
            color Silver
.login-box {
  label-width: 50px ;
  size: mini;
  border: 1px 
  width: 120px;
  height: 450px;
  margin: 0px auto;
  padding: 10px 25px 10px 25px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
}
.el-menu-vertical-demo{
  height: 40px;
  width: 120px;
}
</style>
