import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from "@/components/Home.vue";
import userLogin from "@/components/userLogin.vue";
import userRegister from "@/components/userRegister.vue";
import userModify from "@/components/userModify.vue";
import userProfile from "@/components/userProfile.vue"
import ArticlePage from "@/components/ArticlePage.vue";
import 'font-awesome/css/font-awesome.min.css';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: "Home"
    },
    // 先在上方引入Home的vue对象，然后作为组件使用
    {
      path: "/home",
      name: "Home",
      component: Home,
    },
    {
      path:"/helloworld",
      name: "HelloWorld",
      component:HelloWorld
    },
    {
      path: "/user/login",
      name: "userLogin",
      component: userLogin
    },
    {
      path: "/user/register",
      name: "userRegister",
      component: userRegister
    },
    {
      path: "/user/modify",
      name:"uerModify",
      component: userModify
    },
    {
      path: "/user/profile",
      name: "userProfile",
      component: userProfile,
    },
    /*{
      path: `/articleeditor/:Author_ID/:AID`,
      name: 'ArticleEditor',
      component: ArticleEditor,
    },*/
    {
      path:`/articleeditor/:UID/:AID`,
      name:"ArticlePage",
      component: ArticlePage,
    }
  ]
  
})
