<template>
  <div style="width: 100%;"> 
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
              员工名
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
              是否管理员
              </template>
              {{ userdata.admin }}
          </el-descriptions-item>
          
          </el-descriptions>
      </div>
      
  </div>
  

</template>

<script>
  export default {
    data () {
      return {
        size: '',
        userdata:{},
      };
    },
    comments:{
      getuserdata(){
          this.userdata = this.$store.state.admindata
          return this.$store.state.admindata
      }
    },
    mounted(){
      this.userdata = this.$store.state.admindata
      this.userdata.admin?this.userdata.admin='是':this.userdata.admin='否'
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
