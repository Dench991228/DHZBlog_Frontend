<template>
    <div class="df-header" style="width:100%;height:90px;text-align:left;background:#fff;border-bottom:1px solid #cccccc">
      <!--logo-->
      <div
        id="buttonOfTopline"
        style="display:inline-block;
        width:15%;
        margin-left:5%;
        vertical-align:middle;
        cursor:default
        "
      >
        <h1 style="text-align:center">01 Cafe</h1>
      </div>
      <!--按钮区：只有主页-->
      <div 
        :class="getClass('main')" 
        style="margin-left:1px;
          display:inline-block;
          width:5%;
          cursor:pointer;
          vertical-align:middle;
          height:100%
          " 
        @click="toHome"
        @mouseover="setHovered('main')"
        @mouseout="setHovered('')"
      >
        <h3 style="width:100%;text-align:center;vertical-align:middle;height:100%;margin:0 auto 0 auto">
          <p style="height:100%;display:inline-block;margin:0 auto 0 auto;vertical-align:middle"></p>
          <p style="display:inline-block;vertical-align:middle;margin:0 auto 0 auto">主页</p>
        </h3>
      </div>
    </div>
</template>
<script>
// @ is an alias to /src
import api from "@/api";
export default {
  name: "header",
  components: {
    
  },
  data() {
    return {
      hovered:"",//当前顶栏上鼠标悬浮的地方
    };
  },
  methods: {
    toHome() {
      this.$router.push({ path: "/home" });
    },
    getClass(t){
      if(t==this.hovered){
        return "hoveredTag";
      }
      else{
        return "calmTag";
      }
    },
    setHovered(t){
      this.hovered=t;
    },
    setSelected(t){
      this.selected=t;
    }
  }
};
</script>
<style>
/*被选中的顶栏标签*/
.hoveredTag{
  font-weight: bolder;
  color:blue;
  background: #f8f8f8;
}
.calmTag{
  font-weight: bold;
  color:black;
  background: #ffffff;
}
</style>
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

mgreen(o=1)
  rgba(66,185,131,o)

</style>
