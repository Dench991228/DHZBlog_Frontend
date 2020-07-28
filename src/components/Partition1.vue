<template lang="html">
  <div class="df-register">
      <div class="main">
        <div class="form-wrapper">
          <el-form class="login-box" ref="form"  label-position="left" label-width="90px":model="form">
            <h3 class="login-title">分区列表</h3>
            <el-col :span="12">
              <el-menu default-active="2" class="el-menu-vertical-demo">
                <div v-for="(item,i) in getpart" :key="i" >
                  <el-menu-item index=item.partition_pid  @click="PIDSummit(item.partition_pid)">
                    <img :src= "geturl(item.partition_icon_url)" width="25" height="25"></img>
                    <span slot="title">{{item.partition_name}}</span>
                  </el-menu-item>
                </div>
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
  name: "userModify",
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
      getpart: []    
      };
  },
  // 预加载
  mounted: function() {
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
          showClose: true
        });
        Promise.reject(error);
      });
  },
  methods: {
    geturl(url){
      return url;
    },
    PIDSummit(_sectorID) {
      this.form.Value.SectorID=_sectorID;
      this.$axios
        .post("/ArticleTest", QS.stringify(this.form))
        .then(response => {
          console.log(response.data);
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
      },
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
