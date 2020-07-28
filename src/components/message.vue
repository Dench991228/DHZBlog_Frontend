<template>
    <div :style="'background:'+background_color" v-if="shown">
        <h3>{{text}}</h3>
    </div>
</template>
<script>
export default {
    name:"message",
    props:{
        mtype:"",//这个消息的类型
        text:"",//这个消息的内容
    },
    data(){
        return{
            background_color:"",//背景颜色
            shown:"false",//是否显示
        }
    },
    created(){
        console.log("created")
        if(this.mtype=="success"){
            console.log("type:"+"success")
            this.background_color="#aaffaa"
        }
        else if(this.mtype=="info"){
            this.background_color="#aaaaff"
        }
        else{
            this.background_color="ffaaaa"
        }
    },
    /*计时，一秒钟之后消失 */
    mounted(){
        console.log("mounted!")
        this.shown=true;
    },
    methods:{

    }
}
</script>