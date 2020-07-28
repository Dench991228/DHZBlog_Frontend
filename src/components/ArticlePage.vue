<template>
    <!--总体-->
    <div style="background:#f0f0f0;">
        <!--顶部提示消息-->
        <div style="position:fixed;margin-left:35%;width:30%;height:70px" v-if="message.shown">
            <message :mtype="message.type" :text="message.text"></message>
        </div>
        <!--顶栏-->
        <div style="width:100%;height:90px">
            <myHeader></myHeader>
        </div>
        <!--顶栏之下-->
        <div style="width:100%;text-align:center;vertical-align:top">
            <!--左栏：选择分区，标签-->
            <div style="width:15%;display:inline-block;margin-top:10px;vertical-align:top">
                <!--选择分区-->
                <div style="background:#f8f8f8;border:1px solid #f8f8f8">
                    <div style="border-bottom:1px solid #dddddd">
                        <!--分区列表的题目：选择分区或者所属分区-->
                        <h2 >{{this.partitionsTitle}}</h2>
                    </div>
                    <ul style="list-style:none;padding-left:0px;margin:0 auto 0 auto">
                        <li v-for="(item,i) in parts" :key=i style="text-align:left">
                            <p style="width:60%;margin-left:20%;text-align:center;display:inline-block">{{item.partition_name}}</p>
                            <input 
                                style="width:10%" 
                                type="checkbox" 
                                :value="item.partition_pid" 
                                v-model="partitions" 
                                :disabled="mode=='view'"
                            />
                        </li>
                    </ul>
                </div>
                <!--选择标签-->
                <div style="background:#f8f8f8;border:1px solid #f8f8f8;margin-top:5px">
                    <div style="border-bottom:1px solid #dddddd">
                        <!--标签列表的题目：选择标签或者类别标签-->
                        <h2 >{{this.tagsTitle}}</h2>
                    </div>
                    <ul v-if="this.tags.length!=0" style="list-style:none;padding-left:0px;margin:0 auto 0 auto">
                        <li v-for="(item,i) in tags" :key=i style="text-align:left">
                            <p style="width:60%;margin-left:20%;text-align:center;display:inline-block">{{item}}</p>
                            <!--删除按钮-->
                            <div 
                                style="display:inline-block;font-size:100%" 
                                @click="delTag(i)"
                            >
                                删除
                            </div>
                        </li>
                    </ul>
                    <p v-else>这篇文章没有标签</p>
                    <!--添加标签的区域-->
                    <div style="border-top:1px solid #dddddd" v-if="this.mode!='view'">
                        <input 
                            style="margin-top:10px;margin-bottom:10px;width:60%;vertical-align:middle" 
                            type="text" 
                            v-model="new_tag"
                            placeholder="添加新的标签"
                        />
                        <button 
                            style="width:30%;font-size:100%;vertical-align:middle"
                            @click="addTag"
                        >
                            添加
                        </button>
                    </div>
                </div>
            </div>


            <!--中栏：文本编辑器，社交区，评论区-->
                <!--文本编辑器-->
                    <!--新建模式：工具栏打开，可编辑，默认打开edit-->
                    <!--展示模式：工具栏关闭，不可编辑，默认preview-->
                    <!--查看自己的文章：工具栏打开，可编辑，edit-->
            <!--中栏-->
            <div style="width:60%;display:inline-block;vertical-align:top;margin-top:10px;margin-left:5px;background:#fff">
                <!--中栏上部：标题编辑-->
                <input 
                    type="text" 
                    style="width:99%;
                        border:none;
                        text-align:center;
                        font-size:180%;
                        margin-top:5px
                        "
                    placeholder="请在此输入标题"
                    v-model=article_title
                    :disabled="this.mode=='view'"
                />
                <!--中栏中部：markdown编辑器-->
                <mavon-editor 
                    ref=editor
                    style="width:99.7%;
                        min-height:700px;
                        margin:5px auto 0 auto;
                        box-shadow:0px 0px 0px #fff;
                        border:1px solid #dddddd
                        "
                    :subfield="this.mode!='view'"    
                    :defaultOpen="this.mode=='view'?'preview':'edit'"
                    :editable="this.mode=='view'?false:true"
                    :toolbarsFlag="this.mode=='view'?false:true"
                    v-model=article_content
                    @imgAdd="$imgAdd"
                />
                <!--按钮区：点赞、收藏、删除文章、发布文章-->
                <div style="width:100%;margin-top:10px;text-align:left;margin-bottom:10px;text-align:center">
                    <!--按钮左区：点赞、收藏-->
                    <div style="text-align:left;margin-left:0px;display:inline-block;width:40%">
                        <!--点赞文章的按钮：点赞之后，鼠标放在上面会显示已赞-->
                        <div style="
                            border-radius:5px;
                            width:30%;
                            margin-left:-24%;
                            text-align:center;
                            font-size:110%;
                            color:#ffffff;
                            font-weight:bold;
                            padding:1% 1% 1% 1%;
                            cursor:pointer;
                            display:inline-block;
                            height:100%
                            "
                            v-if="this.mode!='new'"
                            @click="changeLikeStatus"
                            @mouseover="setHoveredMiddleBtn('like')"
                            @mouseout="setHoveredMiddleBtn('')"
                            :class="getClassMiddleBtn('like')"
                        >   
                            <img :src="this.src_btn_like" width="15%" style="vertical-align:middle"/>
                            <span style="vertical-align:middle">{{numLike}}喜欢</span>
                        </div>
                        <!--收藏文章按钮-->
                        <div style="
                            border-radius:5px;
                            width:30%;
                            margin-left:1%;
                            text-align:center;
                            font-size:110%;
                            color:#ffffff;
                            font-weight:bold;
                            padding:1% 1% 1% 1%;
                            cursor:pointer;
                            display:inline-block;
                            height:100%
                            "
                            v-if="this.mode!='new'&&this.$store.state.userProfile.UID!=null"
                            @click="changeCollectStatus"
                            @mouseover="setHoveredMiddleBtn('collect')"
                            @mouseout="setHoveredMiddleBtn('')"
                            :class="getClassMiddleBtn('collect')"
                        >   
                            <img :src="this.src_btn_collection" width="15%" style="vertical-align:middle">
                            <span style="vertical-align:middle">{{collectionBtnTitle}}</span>
                        </div>
                    </div>
                    <!--右区按钮：删除，发布-->
                    <div style="display:inline-block;text-align:right;width:40%">
                        <!--删除文章的按钮-->
                        <div style="
                            border-radius:5px;
                            width:30%;
                            margin-right:1%;
                            text-align:center;
                            font-size:110%;
                            color:#ffffff;
                            font-weight:bold;
                            padding:1% 1% 1% 1%;
                            cursor:pointer;
                            display:inline-block;
                            height:100%
                            "
                            v-if="this.mode=='edit'"
                            @click="deleteArticle()"
                            @mouseover="setHoveredMiddleBtn('delete')"
                            @mouseout="setHoveredMiddleBtn('')"
                            :class="getClassMiddleBtn('delete')"
                        >
                            <img :src="this.src_btn_delete" width="15%" style="vertical-align:middle"/>
                            <span style="vertical-align:middle">删除本文</span>
                        </div>
                        <!--发表文章的按钮-->
                        <div style="
                            border-radius:5px;
                            width:30%;
                            margin-right:-24%;
                            text-align:center;
                            font-size:110%;
                            color:#ffffff;
                            font-weight:bold;
                            padding:1% 1% 1% 1%;
                            cursor:pointer;
                            display:inline-block;
                            height:100%
                            "
                            @click="sendArticle()"
                            v-if="this.mode!='view'"
                            @mouseover="setHoveredMiddleBtn('new')"
                            @mouseout="setHoveredMiddleBtn('')"
                            :class="getClassMiddleBtn('new')"
                        >
                            <img :src="this.src_btn_send" width="15%" style="vertical-align:middle"/>
                            <span style="vertical-align:middle">{{articleBtnTitle}}</span>
                        </div>
                    </div>
                </div>
                <div style="width:100%;background:#ffffff;text-align:center">
                    <comment :AID="this.aid" :myuid=this.$store.state.userProfile.UID v-if="this.mode!='new'" style="text-align:center"/>
                </div>
            </div>



            <!--右边栏-->
            <div 
                style="width:15%;
                    display:inline-block;
                    vertical-align:top;
                    margin-left:5px;
                    margin-top:10px;
                    background:#f8f8f8;
                    border:1px solid #dddddd
                "
            >
                <!--作者信息相关-->
                <div>
                    <div style="padding:20px 5px 20px 5px;border-bottom:1px solid #dddddd;">
                        <h2 style="margin:0px auto 0px auto">作者信息</h2>
                    </div>
                    <personInfo :isMine="false" :cur_uid="this.author_uid"></personInfo>
                </div>
                <!--社交区-->
                <div style="border-top:1px solid #dddddd">
                    <!--关注作者-->
                    <div 
                        v-if="this.$store.state.userProfile.UID!=null"
                        style="width:100%;padding:10px 0 10px 0;cursor:pointer"
                        @click="changeSubscribeStatus()"
                        @mouseover="setHoveredRightBtn('subscribe')"
                        @mouseout="setHoveredRightBtn('')"
                        :class="getClassRightBtn('subscribe')"
                    >
                        <img :src="src_btn_subscribe" width="10%" style="vertical-align:middle"/>
                        <span 
                            style="width:60%;
                                display:inline-block;
                                font-size:120%;
                                vertical-align:middle;
                                font-weight:bold
                                "
                        >
                            {{subscribeTitle}}
                        </span>
                    </div>
                    <!--个人空间-->
                    <div 
                        style="padding:10px 0 10px 0;cursor:pointer" 
                        @click="toProfile()"
                        @mouseover="setHoveredRightBtn('profile')"
                        @mouseout="setHoveredRightBtn('')"
                        :class="getClassRightBtn('profile')"
                    >
                        <img :src="src_btn_profile" width="10%" style="vertical-align:middle"/>
                        <span 
                            style="width:60%;
                                display:inline-block;
                                font-size:120%;
                                vertical-align:middle;
                                font-weight:bold
                                "
                        >
                            Ta的空间
                        </span>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
/**
 * 新建文章：分区列表（checkbox选择分区），文本编辑（空），标签列表（必须新建）
 * 查看自己的文章：分区列表（可编辑，从后端获取），标签列表（可编辑，从后端获取），文本编辑（从后端获取内容填充，可以编辑），社交区域，评论
 */
import myHeader from "@/components/header/header.vue"//顶栏
import personInfo from "@/components/personInfo.vue"//个人信息展示
import comment from "@/components/Comment.vue"
import QS from "qs"
import send_icon from "@/static/icon_send.png"
import liked_icon from "@/static/icon_like.png"
import unliked_icon from "@/static/icon_unlike.png"
import collected_icon from "@/static/icon_collect.png"
import uncollected_icon from "@/static/icon_uncollect.png"
import subscribe_icon from "@/static/icon_subscribe.png"
import profile_icon from "@/static/icon_profile.png"
import delete_icon from "@/static/icon_delete.png"
import message from "@/components/message.vue"

export default {
    name:"ArticlePage",
    components:{
        myHeader,
        personInfo,
        comment,
        message
    },
    data(){
        return{
            /**
             * 模式：描述这个页面的模式
             * 新建文章：aid为-1
             * 查看模式：看别人的文章
             * 编辑/查看模式：看自己的文章
             */
            mode:"new",
            /**
             * 当前文章的id，如果是新建的就是-1
             * 从地址栏获得
             */
            aid:"",
            /**
             * 展示的文章的作者的uid
             * 如果是新建的文章，那么uid就是作者自己的uid
             */
            author_uid:"",
            /*文章的内容*/
            article_content:"",
            /*文章的题目*/
            article_title:"",
            /*全部分区的选项*/
            parts:[],
            /*文章选中的分区*/
            partitions:[],
            /*当前文章的标签*/
            tags:[],
            /*分区选择区域的标题*/
            partitionsTitle:"选择分区",
            /*编辑标签区域的标题*/
            tagsTitle:"添加标签",
            /*关注作者按钮的内容 */
            subscribeTitle:"关注作者",
            /*文章发布按钮的标题 */
            articleBtnTitle:"",
            /*收藏按钮的标题 */
            collectionBtnTitle:"",
            /*新添加的标签*/
            new_tag:"",
            /*各种图标 */
            src_btn_send:send_icon,
            src_btn_collection:uncollected_icon,
            src_btn_like:unliked_icon,
            src_btn_subscribe:subscribe_icon,
            src_btn_profile:profile_icon,
            src_btn_delete:delete_icon,
            /*各种社交信息 */
            /*是否给文章点过赞 */
            isLiked:false,
            /*是否收藏过这篇文章 */
            isCollected:false,
            /*点赞数 */
            numLike:"",
            /*是否关注过作者 */
            isSubscribed:false,
            message:{
                type:"",
                text:"",
                shown:false
            },
            rightBtn:{
                hovered:""
            },
            middleBtn:{
                hovered:""
            }
        }
        
    },
    /**
     * 如果是-1，就不去后面获得新文章
     * 如果不是-1，就先从后面获得文章，以及作者信息，然后再设置各种组件
     */
    created(){
        /*进入页面之后，再基于路由设置各种状态 */
        this.aid=this.$route.params.AID
        this.author_uid=this.$route.params.UID
        /*确定模式 */
        if(this.$store.state.userProfile.UID==this.author_uid&&this.aid=="-1")this.mode="new"
        else if(this.$store.state.userProfile.UID==this.author_uid)this.mode="edit"
        else this.mode="view"
        /*设置分区列表的标题，以及标签列表的标题 */
        this.partitionsTitle=this.mode=='view'?"所属分区":"编辑分区"
        this.tagsTitle=this.mode=='view'?"类别标签":"编辑标签"
        this.articleBtnTitle=this.mode=='new'?'发布文章':'修改文章'
        /*获取全部的分区 */
        this.getPartition();
        /*从后端获取文章信息 */
        if(this.mode!="new"){//如果不是新创建的文章，需要从后端获取文章信息
            this.getArticle();
        }
        /*获取全部的社交信息(如果不是新创建文章) */
        if(this.mode!="new"){
            this.getSocialData();
        }
        
    },
    methods:{
        /*设置右边栏中鼠标悬浮的按钮 */
        setHoveredRightBtn(index){
            this.rightBtn.hovered = index;
        },
        getClassRightBtn(index){
            return index==this.rightBtn.hovered?'hoveredRight':'calmRight'
        },
        /*设置中栏相关的按钮属性 */
        setHoveredMiddleBtn(index){
            this.middleBtn.hovered = index;
        },
        getClassMiddleBtn(index){
            console.log('正在改变class')
            return index == this.middleBtn.hovered?"hoveredMiddle":"calmMiddle"
        },
        /*获得分区 */
        getPartition(){
            this.$axios
            .post("/getPartition", "")
            .then(response => {
                this.parts=response.data.partition_data;
                console.log(this.part);
            })
            .catch(error => {
                this.$message({
                message: "该页面出了点状况",
                type: "error",
                customClass: "c-msg",
                duration: 0,
                showClose: true,
                duration: 1000
                });
                Promise.reject(error);
            });
        },
        /*标签操作 */
        addTag(){
            this.tags.push(this.new_tag);
            this.new_tag="";
        },
        /*删除标签 */
        delTag(i){
            this.tags.splice(i,1);
        },
        /*文章发布 */
        sendArticle(){
            var vm = this;
            let form = new FormData();
            form.append("UID",this.author_uid);
            form.append("AID",this.aid);
            form.append("Partitions",this.partitions);
            form.append("Tags",this.tags);
            form.append("Content",this.article_content);
            form.append("Title",this.article_title);
            this.$axios.post("/ArticleSubmit", form)
            .then((response)=>{
                if(response.data.Status){
                    //console.log("发送成功！");
                    vm.message.shown=true;
                    vm.message.text="文章发送成功，即将跳转到主页"
                    vm.message.type='success'
                    setTimeout(()=>{
                        vm.message.shown=false
                        this.$router.push({
                            path:"/"
                        })
                    },2000);
                    
                }
            })
            .catch(error=>{
                
            })
            
            
        },
        /*从后端获得文章信息 */
        getArticle(){
            let form = new FormData();
            form.append("UID",this.$store.state.userProfile.UID);
            form.append("AID",this.aid);
            this.$axios.post("/ArticleGet",form).then(response=>{
                console.log("Roger that!");
                this.partitions = response.data.Partitions;
                this.tags=response.data.Tags;
                this.article_title=response.data.Title;
                this.article_content=response.data.Content;
            })
            .catch(error=>{
                console.log("挂了");
                this.$message({
                    message:"获取文章失败",
                    type:"error",
                    customClass:"c-msg",
                    duration:1000,
                    showClose:true
                })
            })
        },
        /*获得文章的社交信息 */
        /*主要包含点赞数、是否点赞过、是否收藏过以及是否关注了作者 */
        /*顺便设置标题 */
        getSocialData(){
            let form = new FormData();
            form.append("UID", this.$store.state.userProfile.UID);
            form.append("AID", this.aid);
            this.$axios.post("/ArticleInfo",form)
            .then(response =>{
                if(this.mode!='view'){
                    this.isLiked=response.data.IsLiked;
                    this.src_btn_like=this.isLiked?liked_icon:unliked_icon
                    this.isCollected=response.data.IsCollected;
                    this.src_btn_collection=this.isCollected?collected_icon:uncollected_icon;
                    this.isSubscribed=response.data.IsSubscribed;
                    this.subscribeTitle=this.isSubscribed?"已关注":"关注作者"
                    this.collectionBtnTitle=this.isCollected?"已收藏":"收藏"
                }
                this.numLike=response.data.NumLikes;
            })
            .catch(error=>{
                this.$message({
                    message: "社交信息获取失败",
                    type: "error",
                    customClass: "c-msg",
                    duration: 0,
                    showClose: true,
                    duration: 1000
                })
            })
        },
        /*改变点赞状态 */
        changeLikeStatus(){
            /*当前已经登录 */
            if(this.$store.state.userProfile.UID!=""&&this.$store.state.userProfile.UID!=null){
                /*当前已经点赞了 */
                if(this.isLiked){
                    //改变图标
                    this.src_btn_like=unliked_icon;
                    //改变点赞状态
                    this.isLiked=false;
                    //改变点赞数
                    this.numLike--;
                }
                else{//未点赞
                    this.src_btn_like=liked_icon;
                    this.isLiked=true;
                    this.numLike++;
                }
                let form = new FormData();
                form.append("UID",this.$store.state.userProfile.UID);
                form.append("AID",this.aid);
                this.$axios.post("/ArticleLike", form)
                .then(response=>{

                })
                .catch(error=>{
                    this.$message({
                    message: "点赞失败，请稍后再试",
                    type: "error",
                    customClass: "c-msg",
                    duration: 0,
                    showClose: true,
                    duration: 1000
                })
                })
            }
        },
         //改变收藏状态
        changeCollectStatus(){
            if(this.$store.state.userProfile.UID!=null){
                /*当前已经收藏了 */
                if(this.isCollected){
                    //改变图标
                    this.src_btn_collection=uncollected_icon;
                    //改变收藏状态
                    this.isCollected=false;
                    this.collectionBtnTitle="收藏"
                }
                else{//未收藏
                    this.src_btn_collection=collected_icon;
                    this.isCollected=true;
                    this.collectionBtnTitle="已收藏"
                }
                let form = new FormData();
                form.append("UID",this.$store.state.userProfile.UID);
                form.append("AID",this.aid);
                this.$axios.post("/ArticleCollect", form)
                .then(response=>{

                })
                .catch(error=>{
                    this.$message({
                        message: "收藏失败，请稍后再试",
                        type: "error",
                        customClass: "c-msg",
                        duration: 0,
                        showClose: true,
                        duration: 1000
                    })
                })
            }
        },
        /*直接使用当前文章的作者ID */
        toProfile(){
            this.$router.push({
                path:"/User/Profile",
                query:{
                    UID:this.author_uid,
                    Judge:1
                }
            })
        },
        /*改变关注状态 */
        changeSubscribeStatus(){
            let form = new FormData();
            form.append("AID",this.aid);
            form.append("UID",this.author_uid);
            this.$axios.post("/AuthorFollowed",form)
            .then(response=>{
                /*改变关注状态 */
                this.isSubscribed^=true;
                this.subscribeTitle=this.isSubscribed?'已关注':'关注作者';
            })
            .catch(error=>{
                this.$message({
                    message: "收藏失败，请稍后再试",
                    type: "error",
                    customClass: "c-msg",
                    duration: 0,
                    showClose: true,
                    duration: 1000
                })
            })
        },
        deleteArticle(){
            let form = new FormData();
            form.append("AID", this.aid);
            this.$axios.post("/DelArticle",form)
            .then(response=>{
                if(response.data.Status){
                    this.message.shown=true;
                    this.message.type='success';
                    this.message.text='文章删除成功，即将跳转到主页';
                    setTimeout(()=>{
                        this.message.shown=false
                        this.$router.push({
                            path:"/"
                        })
                    },2000)
                }
                else{
                    this.$message({
                        message:"删除文章失败，文章不存在",
                        type:"error",
                        customClass: "c-msg",
                        duration:1000,
                        showClose:true
                    })
                }
            })
            .catch(error=>{
                console.log(error);
                this.$message({
                    message:"服务器出了点问题",
                    type:"error",
                    customClass: "c-msg",
                    duration:1000,
                    showClose:true
                })
            })
        },
        $imgAdd(pos, $file){
            let form = new FormData();
            form.append('image', $file);
            this.$axios.post("/picSave",form,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response=>{
                this.$refs.editor.$img2Url(pos,response.data.url);
            })
        },
    }
}
</script>
<style scoped>
.hoveredRight{
    font-weight: bold;
    color:blue;
    background:#f0f0f0
}
.calmRight{
    font-weight: bold;
    color:black;
    background:#f8f8f8
}
.hoveredMiddle{
    font-weight:bolder;
    background:#7799ff;
}
.calmMiddle{
    font-weight: bold;
    background:#99aaff;
}
</style>