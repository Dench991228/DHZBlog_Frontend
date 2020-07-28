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
            name: '', // 用户名
            UID: null, // ID
        },
        myid:2,
        myname:"",
        myemail:"",
        isRegister: false, //当前是否登录
        isCurrentBlog: true, //当前是否是博客状态？
        userSpace:{
            selectedTag:"我的文章"
        }
    },
    mutations:{
        //es6语法，等同edit:funcion(){...}
        changeUserName(state,payload){
            state.userProfile.name=payload
        },
        changeUserState(state,payload){
            state.isRegister=payload;
        },
        changeUID(state,payload){
            state.userProfile.UID=payload;
        },
        changeCurrentBlog(state,payload){
            state.isCurrentBlog=payload;
            console.log(payload) // 15或{age:15,sex:'男'}
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