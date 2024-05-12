<template>
    <el-container  style=" height: 100%;">
      
      <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <span>{{this.admindata.name}}</span>
            <el-dropdown-menu slot="dropdown">
              <div @click="exit()">
                <el-dropdown-item >退出</el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
      <el-container>
        <el-aside width="200px" style="height: 100%;">
            <el-menu @select="handleSelect" >
            <el-menu-item v-if="parseInt(admindata.admin)" index="1" isaction>
                <template  slot="title"> 全部书籍</template>
            </el-menu-item>
            <el-menu-item index="2" isaction>
                <template  slot="title">初审</template>
            </el-menu-item>
            <el-menu-item index="3">
                <template slot="title">审核意见</template>
            </el-menu-item>
            <el-menu-item index="4">
                <template slot="title">校对</template>
            </el-menu-item>
            <el-menu-item index="12">
                <template slot="title">待出版</template>
            </el-menu-item>
            <el-menu-item v-if="parseInt(admindata.admin)" index="13">
                <template slot="title">类型管理</template>
            </el-menu-item>
            <el-submenu v-if="parseInt(admindata.admin)" index="5">
                <template slot="title">约稿管理</template>
                <el-menu-item-group>
                  <el-menu-item index="5-1">全部约稿</el-menu-item>
                  <el-menu-item index="5-2">发布约稿</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu v-if="parseInt(admindata.admin)" index="6">
                <template slot="title">用户管理</template>
                <el-menu-item-group>
                <el-menu-item index="6-1">作者管理</el-menu-item>
                <el-menu-item index="6-2">员工管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="7">
                <template slot="title">个人中心</template>
                <el-menu-item-group>
                <el-menu-item index="7-1">个人信息</el-menu-item>
                <el-menu-item index="7-2">修改信息</el-menu-item>
                <el-menu-item index="7-3">修改密码</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            </el-menu>
        </el-aside>
        
        <slot></slot>
      </el-container>
    </el-container>
</template>

<script>
import {admininfo} from '../api/axios'
export default {
    name:'hander',
    data() {
      return {

      };
    },
    methods: {

      toinformation(val){
        this.$emit('change',val)
      },
      exit(){
        this.$store.commit('addTok','')
        this.$router.push({ name: 'admin',replace: true })
        
      }, 
      toone(){
        this.$router.push({ name: 'toone',replace: true })
      },
      handleSelect(key) {
          // console.log(key);​​// 向父组件传递了两个值
          this.$emit('change', key);
      },
      getdata(){
        admininfo(this.$route.params.tel,).then(res=>{
          console.log(res);
        }).catch(err=>{
          console.log(err);
        })
      },
    },
    computed:{
      tok(){
        return this.$store.state.admintok
      },
      admindata(){
        return this.$store.state.admindata
      }
      
    },
    mounted(){
        admininfo({tel:this.admindata.tel},this.tok).then(res=>{
        if(!res.status){
          this.$store.commit('addadmin',res.data)
        }else{
          
          this.$router.push({ path: '/',replace: true })
        //   this.$router.push({ name: '/admin',replace: true })
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