<template>
  <div>
    <div id="main"
      >
        <div
        :key="index"
        v-for="(blog,index) in DynamicInfo.Titles" style="width:85%">
        <div class="df-subPoem" style="height:auto!important; height:120px; min-height:120px;" 
        @click="toArticle(DynamicInfo.UID[index],DynamicInfo.AID[index])">
            <div id="rank" style="float:left;margin-left:50px;"><h1 style="font-size:27px;color:#6495ED">{{index+1}}</h1></div>
            <div id="title" style="margin-left:98px; padding:1px">
            <p style="text-align:left; font-size:20px; font-weight:800">{{blog}}</p>
            </div>
            <div class="main-right">
              <div class="info" style="float:left;margin-left:110px;">
                  <span>
                  <i class="fa fa-user"></i>{{DynamicInfo.Username[index]}}
                  </span>
                  <span>
                  <i class="fa fa-clock-o"></i>{{DynamicInfo.Time[index]}}
                  </span>
              </div>
              <div id="like and comment">
                <div v-if="DynamicInfo.Type[index]=='Like'" >
                    点赞了
                </div>
                <div v-if="DynamicInfo.Type[index]=='Write'" >
                    发表了
                </div>
                <div v-if="DynamicInfo.Type[index]=='Collect'">
                    收藏了
                </div>
                <div v-if="DynamicInfo.Type[index]=='Comment'">
                    评论了
                </div>
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
  props: ['DynamicInfo'],
  methods: {
    
    toArticle(Author_ID,AID){
      console.log(AID);
      console.log(Author_ID);
      this.$router.push({
        path:`/ArticleEditor/${Author_ID}/${AID}`,
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
.each {
  width: 30%;
  border: 1px solid black;
  margin: 5px;
  cursor: pointer;
}
.df-subPoem
  fj()
  margin 20px 0
  border-bottom 1px solid Extra-Light-Grey
  &:hover
    transform translateY(-3px)
    background-color 	#D8D8D8
  .main-left
    margin-right 20px
    .avatar
      wh(120px,120px)
      border-radius 10px
      box-shadow 0 1px 1px rgba(0,0,0,.2)
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


txtline(w=40%)
  position relative
  font-size .8em
  letter-spacing 1px
  text-align center
  color Green
  &::before
    position absolute
    top 50%
    left 0
    wh(w,1px)
    background-color Light-Green
    content ''
  &::after
    position absolute
    top 50%
    right 0
    wh(w,1px)
    background-color Light-Green
    content ''

mgreen(o=1)
  rgba(66,185,131,o)


/* 标签动画 */
@keyframes skTag
  33%
    margin-right 0 10px
    transform rotateY(90deg)
  50%
    border 0
    border-radius 50%
    font-size 1.5em
    color Green
    transform rotateZ(90deg)
  100%
    zoom 1.2
/* 收藏、写赏析、点赞、分享动画 */
@keyframes skAct
  33%
    zoom 1.1
    margin-right 0 10px
    opacity .899
    transform rotateZ(-80deg)
  50%
    zoom 1.2
    border 0
    opacity .5
    transform rotateZ(-120deg)
  77%
    zoom 1.3
    opacity 0
/* 点击评论框显示按钮 */
@keyframes showBtn
  0%
    border-radius 50%
    zoom .001
    transform scale(0)
  100%
    border-radius 4px
    zoom 1
    transform scale(1)
/* 评论文本框无内容时动画 */
@keyframes skTxta
  0%
    opacity .7
    transform scale(1)
  33%
    padding-left 1px
    opacity .765
    transform scale(.999)
  50%
    padding-top 1px
    opacity .8
    transform scale(.997)
  80%
    opacity .765
    transform scale(.998)
  100%
    opacity .7
    transform scale(1)
/* 私信小圆球动画 */
@keyframes drpGlobe
  33%
    transform rotateZ(90deg)
    opacity .9
  50%
    top 50%
    font-size 1.5em
    opacity .7
    transform rotateY(90deg)
  77%
    opacity .9
    transform rotateX(90deg)
  100%
    opacity 1
/* 无内容动画 */
@keyframes showHint
  0%
    zoom 1
    opacity .999
    transform skew(20deg)
  33%
    transform translateX(20px)
  50%
    zoom .999
    color Dark-White
    opacity .8
    transform translateX(10px)
  77%
    transform rotate(4deg)
  80%
    color Light-Silver
    transform scale(.9)
  100%
    zoom 1
    opacity .1
    transform skew(30deg)
/* intro icon动画 */
@keyframes tfIcon
  50%
    font-size 1em
    opacity 0
</style>
