<template>
      <div>
        <div>
          <el-form class="login-box" ref="form" :rules="rules" :model="form">
            <h3 class="login-title">欢迎注册</h3>
            <!--<el-form-item label="用户名" prop="name">
              <el-input
                placeholder="您的昵称"
                v-model="form.name"
                @blur="showPlaceholder"
                @focus="hidePlaceholder"
              ></el-input>
            </el-form-item> -->
            <el-form-item label="邮箱" prop="email">
              <el-input
                v-model="form.email"
                placeholder="请输入您的邮箱"
                @blur="showPlaceholder"
                @focus="hidePlaceholder"
                :validate-event="true"
              ></el-input>
            </el-form-item>
            
            <el-form-item label="密码" prop="password">
              <el-input
                placeholder="密码至少6位"
                type="password"
                v-model="form.password"
                @blur="showPlaceholder"
                @focus="hidePlaceholder"
                :validate-event="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password_confirmation">
              <el-input
                placeholder="请再次输入您的密码"
                type="password"
                v-model="form.password_confirmation"
                @focus="hidePlaceholder"
                @blur="showPlaceholder"
                :validate-event="false"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                :loading="isLoading"
                @click="submitForm"
                >立即注册
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>      
</template>

<script>
//import api from "@/api";
import QS from "qs";
export default {
  name: "userRegister",
  data() {
    return {
      form: {
        // 用户注册信息
        //name: "haoyu",
        email: "",
        password: "",
        password_confirmation: "",
        protocol: true,
      },
      rules: {
        // 表单验证规则
        email: [
          {
            //required: true,
            message: "此处不能为空。",
            trigger: "blur"
          },
          {
            max: 50,
            message: "此处不能大于50个字符。",
            trigger: "blur"
          },
          {
            type: "string",
            pattern: /(^(\w-*\.*)+@(\w-?)+(\.\w{2,})+)|(1\d{10})$/,
            message: "格式不正确。",
            trigger: "blur"
          },
          {
            required:true,
            validator: this.validateEmail,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空。",
            trigger: "blur"
          },
          {
            min: 6,
            max: 20,
            message: "密码必须介于6-20个字符之间。",
            trigger: "blur"
          },
          {
            type: "string",
            pattern: /^[a-zA-Z0-9_-]{6,20}$/,
            message: "格式不正确。",
            trigger: "blur"
          }
        ],
        password_confirmation: [
          {
            validator: this.validatePassword,
            trigger: "blur",
            required:true
          }
        ]
      },
      UID: "",
      name:"",
      dialogVisible: false, // 协议对话框可视度
      alertVisible: false, // 警告框可视度
      emailVisible: true, // email输入框可视度
      lastPlaceholder: "",
      isLoading: false, //  注册按钮是否正在加载
      isSuccess: null, // 是否注册成功
      info:null
    };
  },
  methods: {
    validateEmail(r, v, cb) {
      this.$axios
        .post("/checkemail", QS.stringify(this.form))
        .then(response => {
          response.data.email ? cb(new Error("邮箱可能已经存在。")) : cb();
        })
        .catch(error => {
          this.$message({
            message: "该页面出了点状况11",
            type: "error",
            customClass: "c-msg",
            duration: 0,
            showClose: true
          });
          Promise.reject(error);
        });
    },
    validatePassword(rule, value, cb) { 
      if (value === "") {
        cb(new Error("请再次输入密码。"));
      } else if(value !== this.form.password) {
        cb(new Error("两次输入密码不一致。"));
      } else cb();
    },
    // 提交表单
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          // 指定请求为正式提交表单
          this.form.is_submit = true;
          this.isLoading = true;
          this.$axios
            .post("/register", QS.stringify(this.form))
            .then(response => {
              this.isLoading = false;
              if (response.data.registered) {
                // 注册成功
                this.isSuccess = true;
                this.$store.commit('changeUID',response.data.uid);
                this.$store.commit('changeUserName',response.data.username);
                this.$router.replace("/");
                this.$message({
                    message:"注册成功，完成邮箱验证之后即可登录",
                    type: "success",
                    customClass: "c-msg",
                    showClose: true
                  }); 
              } else {
                // 注册失败
                this.isSuccess = false;
                  this.$message({
                    message: response.data.error,
                    type: "error",
                    customClass: "c-msg",
                    showClose: true
                  }); 
              }
              this.alertVisible = true;
            })
            .catch(error => {
              this.isLoading = false;
              this.$message({
                message: "该页面出了点状况44",
                type: "error",
                customClass: "c-msg",
                duration: 0,
                showClose: true
              });
              Promise.reject(error);
            });
        }
        return false;
      });
    },
    showDialog() {
      this.dialogVisible = !this.dialogVisible;
    },
    toggleEmail() {
      this.emailVisible = !this.emailVisible;
    },
    showPlaceholder(e) {
      e.target.placeholder = this.lastPlaceholder;
    },
    hidePlaceholder(e) {
      this.lastPlaceholder = e.target.placeholder;
      e.target.placeholder = "";
    }
  }
};
</script>
<style scoped>
.login-box {
  width: 90%;
  padding: 5% 5% 5% 5%;
  margin: 0% 0% 0% 0%;
}
.login-title {
  text-align: center;
  margin: 5% 20% 10%;
  color: #000000;
}
</style>
