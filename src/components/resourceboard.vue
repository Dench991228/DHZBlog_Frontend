<template>

    <div id="list" style="width:100%">
      <!--标题-->
      <div>
        <h2>{{this.whose}}&nbsp;的&nbsp;资&nbsp;源</h2>
        <hr style="width:95%">
      </div>
      <!--资源列表-->
      <div v-if="this.resources.length!=0">
        <div
          v-for="(item,index) in this.resources"
          :key="index"
          style="text-align:left;width:100%;vertical-align:middle;color:#555555"
        >
          <p :class="fileName" style="display:inline-block;text-align:left;margin-left:10px;width:65%;vertical-align:middle;height:100%">文件名：<br>{{ item.file_name }}</p>
          <!--下载和删除的连接，下载在上面-->
          <div style="width:25%;display:inline-block;height:100%;vertical-align:middle">
            <!--下载-->
            <div style="text-align:center;width:100%;vertical-align:middle">
              <a :href="item.getUrl" style="text-decoration:none;color:#555555">下载文件</a>
            </div>
            <!--删除-->
            <div v-if="judgeMode()" @click="deleteFile(index)" style="color:#555555;text-align:center;width:100%;margin-bottom:10%;vertical-align:middle;cursor:pointer">
              删除文件
            </div>
          </div>
        </div>
      </div>
      <p v-else>当前没有上传资源</p>
      <!--文件上传区-->
      <div style="float:left; margin-top:20px;margin-bottom:20px;width:100%" v-if="judgeMode()">
        <hr style="width:95%">
        <form action="" method="POST" enctype="multipart/form-data" @submit.prevent="mysubmit"  class="form">
          <input type="file" :value=this.file ref="fileInput" style="display:inline-block;width:70%">
          <input type="submit" style="display:inline-block;width:20%" value="上传">
        </form>
      </div>
    </div>
 
</template>

<script>
// @ is an alias to /src
import Navigator from "@/components/Navigator.vue";
import QS from "qs";
export default {
  name: "resourceboard",
  components: {
    Navigator
  },
  props:{
    cur_uid: Number,   //当前登录用户的UID
    tar_uid: Number,   //资源拥有者的UID
    //如果cur_uid!=tar_uid那就只能查看，不能新增和删除
  },
  data() {
    return {
      isEditable:this.cur_uid+this.tar_uid,
      file: null,
      whose:"",
      resources:[
      ],
      rids:[

      ]
    };
  },
  mounted: function() {
    let data = new FormData();
    data.append("uid",this.tar_uid);
    if(this.cur_uid==this.tar_uid){
      this.whose="我";
    }
    else{
      this.whose="Ta";
    }
    this.$axios.post("/resourceList", data,{
      })
      .then((response) => 
      {
          //console.log("Mounted!");
          let resultList = response.data.list;
          //console.log(resultList);
          //console.log(resultList[0]);
          let i = 0;
          let len = resultList.length;
          console.log("mounted!");
          for(i=0;i<len;i++){
            this.resources.push({file_name:resultList[i].fileName,getUrl:resultList[i].url,deleteUrl:resultList[i].deleteUrl});
            //console.log(this.resources[i].deleteUrl);
            this.rids.push(resultList[i].RID);
          }
          //console.log(this.resources[0]);
      })
      .catch(error => {
          // 请求失败
          console.log(error);
      })
    },
  methods: {
    judgeMode(){
      console.log(this.isEditable);
      console.log("cur_id "+this.cur_uid);
      console.log("tar_id "+this.tar_uid);
      return this.cur_uid==this.tar_uid;
    },
    mysubmit(){
      const data = new FormData();
      data.append("fileInput",this.$refs.fileInput.files[0]);
      data.append("uid",this.tar_uid);
      console.log(this.tar_uid==this.cur_uid);
      this.$axios.post("/resourceCenter", data,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => 
      {
          console.log("entered");
          //this.resources=response.data.list;
          let a=response.data.fileName;
          let b=response.data.url;
          let c=response.data.deleteUrl;
          this.resources.push({file_name:a,getUrl:b,deleteUrl:c});
          let rid = response.data.RID;
          this.rids.push(rid);
      })
      .catch(error => {
          // 请求失败
          console.log(error);
      })
    },
    deleteFile(index){
      let data = new FormData();
      data.append("RID",this.rids[index]);
      this.$axios.post("/deleteResource", data,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => 
      {
          this.resources.splice(index,1);
          this.rids.splice(index,1);
      })
      .catch(error => {
          // 请求失败
          console.log(error);
      })
    }
  }
}
</script>

<style scoped>
</style>