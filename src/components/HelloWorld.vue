<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    
    <h2>Ecosystem</h2>
    <input type="button" value="点击我" @click="test333"/>
    {{this.info}}
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import QS from "qs";
export default {
  name: 'HelloWorld',
  data () {
    return {
      form: {
        // 用户注册信息
        name: "hahahah",
        email: "1201811499@qq.com",
        mobile:"13136778573",
        password: "121212",
        password_confirmation: "121212",
      },
      msg: 'Welcome to Your Vue.js App',
      isSuccess: null,
      info: null
    }
  },
  methods: {
    test111() {
       this.$axios.get("/movie/top250").then((res) => {
                  res = res.data
                  if (res.errno === ERR_OK) {
                     this.themeList=res.data;
                  }
                }).catch((error) => {
                  console.warn(error)
                })
    },
    validateEmail() {
      this.$axios.post('/checkemail',QS.stringify(this.form))
      .then(response=>(this.info=response))
      .catch(err=>{console.log(err)})
    },
    test333() {
      this.$axios
      .post('/checkemail')
      .then(response => {this.info = response.data
      console.log(this.info)})
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
