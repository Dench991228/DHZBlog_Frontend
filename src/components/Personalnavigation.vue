<template>
    <div class="bord">
      <div class="author-info" >
        <span class="author-name" @click="toProfile1">作者：{{name}}</span>
        <div class="author-info2" >
          <span class="author-uid" @click="toProfile1">作者ID：{{uid}}</span>
          <span class="author-tags-one">{{"标签:"}}</span>
          <span class="author-tags-two">{{tags}}</span>
          <span class="author-partitions-one">{{"分区:"}}</span>
          <span class="author-partitions-two">
              <input type="checkbox" v-model="partitions" value=1 disabled="disabled" checked="checked" >Java
     	        <input type="checkbox" v-model="partitions" value=2 disabled="disabled" checked="checked">Python
     	        <input type="checkbox" v-model="partitions" value=3 disabled="disabled" checked="checked">前端
     	        <input type="checkbox" v-model="partitions" value=4 disabled="disabled" checked="checked">数据库
          </span>
        </div>
      </div>
    </div>
</template>
<script>


import QS from "qs";
const clickoutside = {
    update() {},
};
export default {
    props:{
      uid:String,
      name: String,
      tags:[],
      partitions: [],
    },
    name:'personalnavigation',
    data(){
        return{
            form: {
              uid:this.uid,
              name: this.name,
              tags: this.tags,
              partitions: this.partitions,
            }
        }
    },
    directives: {clickoutside},
    methods: {
      toProfile1() {
        this.$router.push({ 
          path : "/user/profile",
          query: {
            UID : parseInt(this.form.uid),
            Judge:1
          }
        });
      },
    }    
}
</script>
<style lang="stylus" scoped>
.bord
  height 60px
  border: 3px solid #bbb;
.author-info
  display inline-block
  text-align: left
  margin-left 5px
  width 100%
  height 50px
  line-height 35px
  >span 
    display block
    cursor pointer
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
  .author-name
    color #000
    font-size 25px
    margin-left 5px
    font-weight bold
.author-info2
  display block
  text-align: left
  margin-left 5px
  width 60%
  height 20px
  line-height 30px
  >span 
    display inline-block
    cursor pointer
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
  .author-uid
    color #999
    font-size 14px
  .author-tags-one
    margin-left 5px
    font-size 14px
    font-weight bold
    color blue
  .author-tags-two
    font-size 14px
    font-weight bold
  .author-partitions-one
    color blue
    margin-left 5px
    font-size 14px 
    font-weight bold
  .author-partitions-two
    font-size 14px
    font-weight bold
</style>
