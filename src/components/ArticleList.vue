<template>
  <div>
    <div id="main"
      >
        <div
        :key="index"
        v-for="(blog,index) in Articles11.Titles" >
          <div class="df-subPoem" style="height:auto!important; height:120px; min-height:120px;" 
          @click="toArticle(Articles11.WriterIDs[index],Articles11.AIDs[index])">
            <!--编号-->
            <div id="rank" style="float:left;margin-left:50px;">
              <h1 style="font-size:27px;color:#6495ED">{{index+1}}</h1>
            </div>
            <!--题目-->
            <div id="title" style="margin-left:98px; padding:1px">
              <p style="text-align:left; font-size:20px; font-weight:800">{{blog}}</p>
            </div>
            <!--下半部分-->
            <div class="main-right">
              <div class="info" style="float:left;margin-left:110px;">
                  <!--作者昵称-->
                  <span>
                    <i class="fa fa-user"></i>{{Articles11.WriterNames[index]}}
                  </span>
                  <!--发表时间-->
                  <span>
                    <i class="fa fa-clock-o"></i>{{Articles11.Times[index]}}
                  </span>
              </div>
              <div id="like and comment">
                  <!--点赞数量-->
                  <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                  <i style="font-weight:0">{{Articles11.Likes[index]}}&emsp;</i>
                  <!--评论数量-->
                  <i class="fa fa-comment-o"></i>
                  <i style="font-weight:0">{{Articles11.NumComments[index]}}</i>
              </div>
            </div>
        </div>
    </div>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Partition from "@/components/Partition.vue";
import axios from "axios";
export default {
  name: "Home",
  components: {
    Partition
  },
  data() {
    return {
      
    };
  },
  props: ['Articles11'],
  methods: {
    getLocalData() {
      this.$axios
      .post('/ArticleTest').then(response => {
        this.Articles.Titles = response.data.Titles
        this.Articles.Likes = response.data.Likes
        this.Articles.NumComments = response.data.NumComments
        this.Articles.Times = response.data.Times
        this.Articles.WriterNames = response.data.WriterNames
      }).catch(error => {
        this.$message({
          message: '页面出了一点问题',
          type: 'error',
          customClass: 'c-msg',
          duration: 0,
          showClose: true,
          duration: 1000
        })
        Promise.reject(error)
      })
    },
    toArticle(Author_ID,AID){
      console.log(AID);
      console.log(Author_ID);
      this.$router.push({
        path:`/articleeditor/${Author_ID}/${AID}`,
        params:{
          Author_ID:Author_ID,
          AID:AID,
        }
      })
    },
  }
};
</script>

<style scoped lang="stylus">
.df-subPoem
  fj()
  margin 0px 
  border-bottom 1px solid Extra-Light-Grey
  &:hover
    transform translateY(-3px)
    background-color 	#D8D8D8
  .main-right
    position relative
    margin 0 !important
    width 100%
    .header
      .title
        display inline-block
        font(1.5em,mgreen(.8))
        text-decoration none
        transition all .3s
        &:hover
          transform translateY(-1px)
      .favor,.trash
        float right
    .info
      margin 0px 0
      &>span:first-child
        &>a
          text-decoration none
          color Green
      span
       margin-right 5px
       font(.8em,Silver)
       &>i
         margin-right 5px
    .body
      margin 10px 0 20px 0
      font(.8em,Silver)
      .content
        max-height 120px
        overflow hidden
        padding-bottom 20px
        word-break break-all
        line-height 2em
        cursor pointer
        .ellipsis
          color Green
        *
          display inline-block
          margin 0
     .footer
      fj(space-between)
      position absolute
      bottom 5px
      left 0
      width 100%
      .feedback
        float right
        margin-bottom 5px
        &>a
          margin-left 10px
          font(.7em,Silver)
          text-decoration none
          transition all .2s
          &:hover,&:focus
            color Green
            cursor pointer
          &>i
            margin-right 5px

Green = #42b983
Light-Green = #87d86b
White = #FFF
Dark-White = #F9FAFC
Red = #FF7352
Blue = #64c0ff
Orange = #F7BA2A
Light-Orange = #ffc741
Silver = #8492A6
Light-Silver = #99A9BF
Extra-Light-Silver = #C0CCDA
Grey = #D3DCE6
Light-Grey = #E5E9F2
Extra-Light-Grey = #EFF2F7
Black = #1F2D3D
Light-Black = #324057
Extra-Light-Black = #475669

fj(x=flex-start,y=stretch)
  display flex
  justify-content x
  align-items y

wh(w,h)
  width w
  height h

bc(bgC=Green,c=Write)
  color c
  background-color bgC

bdco(bdc=Green,c=Green)
  border-color bdc
  color c

font(s,c)
  font-size s
  color c

</style>
