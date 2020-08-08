import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state:{
        //存放的键值对就是所要管理的状态
        name:'helloVueX',
        userProfile: {
            name: window.sessionStorage.getItem("Username"),
            UID: window.sessionStorage.getItem("UID"), // ID
        },
        isRegister: window.sessionStorage.getItem("isRegister"), //当前是否登录
    },
    mutations:{
        //es6语法，等同edit:funcion(){...}
        changeUserName(state,payload){
            state.userProfile.name=payload;
            window.sessionStorage.setItem("Username",payload);
        },
        changeUserState(state,payload){
            state.isRegister = payload;
            window.sessionStorage.setItem("isRegister",payload);
        },
        changeUID(state,payload){
            state.userProfile.UID=payload;
            window.sessionStorage.setItem("UID",payload);
        }
        
    },
    getters:{
        nameInfo(state){
            return "姓名:"+state.name
        },
        fullInfo(state,getters){
            return getters.nameInfo+'年龄:'+state.age
        }  
    }
})

export default store