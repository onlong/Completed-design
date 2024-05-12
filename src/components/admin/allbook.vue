<template>
  
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="name"
      label="书名">
    </el-table-column>
    <el-table-column
      prop="writerid"
      label="作者">
    </el-table-column>
    <el-table-column
      prop="classid"
      label="类型">
    </el-table-column>
    <el-table-column
      prop="long"
      label="篇幅">
    </el-table-column>
    <el-table-column
      prop="inite"
      label="约稿">
    </el-table-column>
    <el-table-column
      prop="stateid"
      label="当前状态">
    </el-table-column>
    <el-table-column
      prop="introduction"
      label="简介">
      <!-- 截取一下数据防止太长 -->
    </el-table-column>
  </el-table>
</template>

<script>
import {getallbook,getclass,getuserall} from '../../api/axios'
export default {
    data() {
      return {
        tableData: [],
        options:[],
        user:[],
        tok:'',
      }
    },
    mounted(){
      getuserall(this.tok).then(res=>{
        if(res.status){
          this.$message.error('数据获取失败');
        }else{
          this.user=res.data
        }
      })
      getclass().then(res=>{
        if(res.status){
          this.$message.error('数据获取失败');
        }else{
          this.options=res.data
        }
      })

      getallbook(this.tok).then(res=>{
        console.log('res');
        console.log(res);
        if(res.status){
            this.$message(res.message)
        }else{
            this.tableData = res.data
            for(var i = 0 ;i<this.tableData.length;i++){
            // this.tableData[i].date = this.tableData[i].date.slice(0,10)
            if(this.tableData[i].long==0) this.tableData[i].long = '长篇'
            if(this.tableData[i].long==1) this.tableData[i].long = '中篇'
            if(this.tableData[i].long==2) this.tableData[i].long = '短篇'
            this.tableData[i].inite?this.tableData[i].inite='是':this.tableData[i].inite='否'
            if(this.tableData[i].stateid==0){
              this.tableData[i].stateid='未审核'
            }else if(this.tableData[i].stateid==1){
              this.tableData[i].stateid='沟通中'
            }else if(this.tableData[i].stateid==2){
              this.tableData[i].stateid='校对中'
            }else if(this.tableData[i].stateid==3){
              this.tableData[i].stateid='已出版'
            }
            for(var j=0;j<this.options.length;j++){
              if( this.tableData[i].classid==this.options[j].id)  this.tableData[i].classid =this.options[j].name
            }
            for(var j=0;j<this.user.length;j++){
              if( this.tableData[i].writerid==this.user[j].id)  this.tableData[i].writerid =this.user[j].name
            }
          }
        }
      })
    },
    computed:{
      admintok(){
        this.tok = this.$store.state.admintok
        return this.$store.state.admintok
      },
      admindata(){
        return this.$store.state.admindata
      }
    }
  }
</script>

<style scoped>

</style>