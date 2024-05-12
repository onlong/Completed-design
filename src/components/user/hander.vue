<template>
    <el-container  style=" height: 100%;">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246);height: 100%;margin-top: 50px;">
        <el-menu @select="handleSelect" >
          <el-menu-item index="1" isaction>
            <template  slot="title"><i class="el-icon-message"></i> 投稿</template>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>查看书稿</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">审核中</el-menu-item>
              <el-menu-item index="2-2">通过审核</el-menu-item>
              <el-menu-item index="2-3">校对中</el-menu-item>
              <el-menu-item index="2-4">已出版</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>约稿信息</template>
            <el-menu-item-group>
              <el-menu-item index="3-1">约稿目录</el-menu-item>
              <el-menu-item index="3-2">待响应约稿</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header >
          <div  style="float: left;font-size: 30px;">出版社管理系统</div>
          <div style="text-align: right; font-size: 12px">
            <el-dropdown> 
              <span>{{this.userdata.name}}</span>
              <el-dropdown-menu slot="dropdown">
                <div @click="handleSelect('5')">
                  <el-dropdown-item >个人信息</el-dropdown-item>
                </div>
                <div @click="handleSelect('6')">
                  <el-dropdown-item >修改信息</el-dropdown-item>
                </div>
                <div @click="handleSelect('7')">
                  <el-dropdown-item >修改密码</el-dropdown-item>
                </div>
                <div @click="exit()">
                  <el-dropdown-item >退出</el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          
        </el-header>
        
        <slot></slot>
      </el-container>
    </el-container>
</template>

<script>
import {getUserinfo} from '../../api/axios'
export default {
    name:'hander',
    data() {
      return {
        tel:'',
        // tok:this.$route.params.tok,
      };
    },
    methods: {

      toinformation(val){
        this.$emit('change',val)
      },
      exit(){
        this.$store.commit('addTok','')
        this.$router.push({ name: 'login',replace: true })
        
      }, 
      toone(){
        this.$router.push({ name: 'toone',replace: true })
      },
      handleSelect(key) {
          // console.log(key);​​// 向父组件传递了两个值
          this.$emit('change', key);
      },
    },
    computed:{
      tok(){
        return this.$store.state.tok
      },
      userdata(){
        
        return this.$store.state.userdata
      }
      
    },
    mounted(){
      // console.log(this.userdata);
      getUserinfo({tel:this.userdata},this.tok).then(res=>{
        if(!res.status){
          this.$store.commit('adduser',res.data)
        }else{
          
          this.$router.push({ name: 'login',replace: true })
        }
        }).catch(err=>{
          console.log('this is err');
          console.log(err);
        })
    },
   
  }
</script>

<style scoped>
    .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>