<template>
  <div>
    <!--展示用户名-->
    <div id="username" style="width:100%;cursor:pointer" @click="toPersonalPage">
        <h1>{{this.nickname}}</h1>
    </div>
    <hr style="width:70%">
    <div style="width:100%">
    <!--展示文章数-->
        <div id="num_articles" style="display:inline-block;width:30%">
            <h3>文章</h3>
            <h3>{{this.num_articles}}</h3>
        </div>

        <!--展示关注数-->
        <div id="num_follow" style="display:inline-block;width:30%">
            <h3>关注</h3>
            <h3>{{this.follow}}</h3>
        </div>

        <!--展示粉丝数-->
        <div id="num_fans" style="display:inline-block;width:30%">
            <h3>粉丝</h3>
            <h3>{{this.fans}}</h3>
        </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import QS from "qs";
//import c from "@/common/js";
//import { mapMutations, mapActions } from "vuex";
export default {
    name: "personInfo",
    props:{
        isMine:Boolean, //是不是当前用户自己的信息简报
        cur_uid:"" //当前用户的uid，只在上面的false的时候才有用
    },
    data() {
        return {
            nickname: "loading...", //昵称（用户名）
            num_articles: "", //点赞数量
            follow: "", //关注数量
            fans: "" //粉丝
        };
    },
    mounted() {
        if(this.isMine){
            this.getUserInfomation(this.$store.state.userProfile.UID);
        }
        else{
            this.getUserInfomation(this.cur_uid);
        }
    },
    methods: {
        getUserInfomation(_UID) {
            var toSubmit={
                UID:_UID
            };
            this.$axios
            .post('/personInfo',QS.stringify(toSubmit)).then(response => {
                this.nickname = response.data.Username
                this.num_articles = response.data.NumArticle
                this.follow = response.data.NumSubscribed
                this.fans = response.data.NumFans
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
        toPersonalPage(){
            var uid="";
            if(this.isMine){//去往用户自己的主页
                uid = this.$store.state.userProfile.UID;
            }
            else{
                uid=this.cur_uid;
            }
            this.$router.push({
                path : "/user/profile",
                query: {
                    UID : parseInt(uid),
                    Judge:1
                }
            });
        },
    }
    //...mapMutations(["TOGGLE_LOADING_STATUS", "CHECKOUT_LOGIN_STATUS"]),
    //...mapActions(["loadProfile"])
}
</script>

<style scoped>
.login-box {
  width: 90%;
  padding: 5% 5% 5% 5%;
  margin:0% 0% 0% 0%;
}

.login-title {
  text-align: center;
  margin: 5% 20% 10%;
  color: #000000;
}
</style>
