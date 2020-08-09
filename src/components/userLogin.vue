<template>
  <div>
    <el-form
      ref="loginForm"
      :model="form"
      :rules="rules"
      class="login-box"
    >
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item prop="name" style="float:left;width:100%" label="账号">
        <el-input type="text" placeholder="请输入账号" v-model="form.name" />
      </el-form-item>
      <br>
      <br>
      <el-form-item prop="password" style="float:left;width:100%" label="密码">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <br>
      <el-form-item style="margin:10% 30% 5% 30%">
        <el-button type="primary" @click="submitForm" >登录</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="温馨提示" width="30%" :before-close="handleClose">
      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api";
import QS from "qs";
//import c from "@/common/js";
//import { mapMutations, mapActions } from "vuex";
export default {
  name: "userLogin",
  data() {
    return {
      form: {
        name: "",
        password: "",
        isRemember: false,
      },
      rules: {
        name: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
      isLoading: false,
      UID:"",
      name:""
    };
  },
  /*created() {
    c.logged();
  },*/
  methods: {
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    // 验证表单
    submitForm() {
          let data = {
            name: this.form.name,
            password: this.form.password,
          };
          this.$axios
            .post("/login", QS.stringify(this.form))
            .then(response => {
              //this.TOGGLE_LOADING_STATUS();
              if (!response.data.validation) {
                return this.$message({
                  message: "登录失败",
                  type: "error",
                  customClass: "c-msg",
                  showClose: true
                });
              }
              else{//登录成功
                this.$message({
                  message:"登录成功，\\(^o^)/~。",
                  type: "success",
                  customClass: "c-msg",
                  showClose:true
                });
                //this.successLogin(response.data.access_token);
                this.$store.commit('changeUserState',true);
                this.$store.commit('changeUID',response.data.UID);
                this.$store.commit('changeUserName',response.data.name);
                this.$router.replace("/");
                console.log("registered="+this.$store.state.isRegister);
              }
              
            })
            .catch(error => {
              //this.TOGGLE_LOADING_STATUS();
              this.$message({
                message:
                  "页面出了点状况11",
                type: "error",
                customClass: "c-msg",
                duration: 0,
                showClose: true
              });
              Promise.reject(error);
            });
        }
        //return false;
      //});
    },
    // 成功登录后的操作
    successLogin(token) {
      // 存储 ACCESS_TOKEN 进 localstorage
      window.localStorage.setItem("ACCESS_TOKEN", token);
      // 更改登录状态
      this.CHECKOUT_LOGIN_STATUS();
      // 加载个人信息
      this.loadProfile();
      // 跳转到首页
      this.$router.replace("/");
    } //,
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
