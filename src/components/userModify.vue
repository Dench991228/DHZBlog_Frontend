<template>
  <div>
    <el-form class="login-box" ref="form" :rules="rules" :model="form">
      <h3 class="login-title">修改信息</h3>
      <el-form-item  prop="name" label="用户名">
        <el-input
          :placeholder="setPlaceholdername()"
          v-model="form.name"
          :blur="showPlaceholder"
          :focus="hidePlaceholder"
          :validate-event="true"
        ></el-input>
      </el-form-item> 

      <el-form-item label="邮箱" prop="email" >
        <el-input
          v-model="form.email"
          :placeholder="setPlaceholderemail()"
          :blur="showPlaceholder"
          :focus="hidePlaceholder"
          :validate-event="false"
        ></el-input>
      </el-form-item>

      <el-form-item label="旧密码" prop="old_password">
        <el-input
          placeholder="密码至少6位"
          type="password"
          v-model="form.old_password"
          :validate-event="false"
          @focus="hidePlaceholder"
          @blur="showPlaceholder"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_password">
        <el-input
          placeholder="密码至少6位"
          type="password"
          v-model="form.new_password"
          :validate-event="false"
          @focus="hidePlaceholder"
          @blur="showPlaceholder"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="new_password_confirmation" class = "item">
        <el-input
          placeholder="请再次输入您更改的密码"
          type="password"
          v-model="form.new_password_confirmation"
          :validate-event="false"
          @focus="hidePlaceholder"
          @blur="showPlaceholder"
        ></el-input>
      </el-form-item>
      <el-form-item size="mini">
        <el-button
          type="primary"
          :disabled="isRegistered"
          @click="submitForm"
          >确认更改
        </el-button>
      </el-form-item>
    </el-form>
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
        // 用户更改信息
        need_name: "",
        need_email: "",
        need_mobile: "",
        name: "",
        email: "",
        old_password: "",
        new_password: "",
        new_password_confirmation: "",
        protocol: true,
      },
      rules: {
        // 表单验证规则
        name: [
          {
            validator: this.validateName,
            trigger: "blur"
          }
        ],
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
            validator: this.validateEmail,
            trigger: "blur"
          }
        ],
        old_password: [
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
        new_password: [
          {
            //required: true,
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
        new_password_confirmation: [
          {
            validator: this.validatePassword,
            trigger: "blur"
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
      isRegistered: false, // 是否已注册
      isSuccess: null, // 是否注册成功
      info:null
    };
  },
  // 预加载
  mounted: function() {
    var uid=this.$store.state.userProfile.UID;
    var param_data = {UID: uid};
    this.$axios.post("/profile", QS.stringify(param_data))
    .then(response => {
        // post 成功，response.data 为返bai回的数据
        this.form.need_name=response.data.username;
        this.form.need_email=response.data.email;
        //this.form.need_mobile=response.data.mobile;
        /*console.log(response.data.email)
        console.log(response.data.mobile)
        console.log(this.form.need_name)*/
    })
    .catch(error => {
        // 请求失败du
        console.log(error)
    })
  },
  methods: {
    setPlaceholdername(){
      return this.form.need_name
    },
    setPlaceholderemail(){
      return this.form.need_email
    },
    setPlaceholdermobile(){
      return this.form.need_mobile
    },
    validateName(r, v, cb) {
      this.$axios
        .post("/checkname", QS.stringify(this.form))
        .then(response => {
          response.data.name&&this.form.name!=="" ? cb(new Error("用户名可能已经存在。")) : cb();
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
      if (value === "" && this.form.new_password !=="") {
        cb(new Error("请再次输入密码。"));
      } else if(value !== this.form.new_password) {
        cb(new Error("两次输入密码不一致。"));
      } else cb();
    },
    submitForm() {
    this.$refs["form"].validate(valid => {
        if (valid) {
          var param_data = {
            UID: this.$store.state.userProfile.UID,
            username: "",
            email: "",
            password_old: "",
            password_new: "",
          }
          /*param_data.username=this.form.name===""?this.form.need_name:this.form.name;
          param_data.email=this.form.email===""?this.form.need_email:this.form.email;
          param_data.mobile=this.form.mobile===""?this.form.need_mobile:this.form.mobile;*/
          param_data.username=this.form.name;
          console.log(this.form.name)
          param_data.email=this.form.email;
          param_data.password_old=this.form.old_password;
          param_data.password_new=this.form.new_password;
          // 指定请求为正式提交表单
          this.form.is_submit = true;
          this.isLoading = true;
          this.$axios
            .post("/changeinfo", QS.stringify(param_data))
            .then(response => {
                //this.$router.go(0)
                //this.$router.replace("/");
                console.log(response.data);
                if(response.data.validation===true){
                  this.form.need_name=response.data.username_new;
                  console.log(response.data.username_new);
                  this.form.need_email=response.data.email_new;
                  this.form.name= "";
                  this.form.email="";
                  this.form.old_password="";
                  this.form.new_password="";
                  this.form.new_password_confirmation="";
                  this.$message({
                  message:
                    "修改成功，\\(^o^)/~。",
                  type: "success",
                  customClass: "c-msg"
                  });
                }
                else{
                    this.$message({
                    message: "密码错误",
                    type: "error",
                    customClass: "c-msg",
                    showClose: true
                  }); 
                }
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
        return true;
        }
      });
    }
  }
};
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