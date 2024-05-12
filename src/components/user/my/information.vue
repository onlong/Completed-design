<template>
    <div> 
        <div class="box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>个人信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="box1">
            <el-descriptions class="margin-top" :column="3"  border>
            <el-descriptions-item>
                <template slot="label">
                <i class="el-icon-user"></i>
                笔名
                </template>
                {{ userdata.name }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                手机号
                </template>
                {{userdata.tel}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template slot="label">
                <i class="el-icon-location-outline"></i>
                邮箱
                </template>
                {{ userdata.email }}
            </el-descriptions-item>
            
            </el-descriptions>
        </div>
        
    </div>
    
  
  </template>
  
  <script>
    export default {
        name:'information',
      data () {
        return {
          size: '',
          userdata:{},
        };
      },
      comments:{
        getuserdata(){
            this.userdata = this.$store.state.userdata
            return this.$store.state.userdata
        }
      },
      mounted(){
        this.userdata = this.$store.state.userdata
      },    
    }
  </script>
    
  <style scoped>
    .box{
        margin-top: 50px;
        margin-left: 50px;
    }
    .box1{
        margin: 20px;
    }
  </style>
  