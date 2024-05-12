<template>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="name"
        label="书名">
      </el-table-column>
      <el-table-column
        prop="writerid"
        label="作者">
      </el-table-column>
      <el-table-column
        prop="invite"
        label="是否约稿">
      </el-table-column>
      <el-table-column
        prop="classid"
        label="题材">
      </el-table-column>
      <el-table-column
        prop="long"
        label="篇幅">
      </el-table-column>
      
    </el-table>
  </template>
  
  
  <script>
  import {getbookstate,getclass,getuserall} from '../../api/axios'
    export default {
      methods: {
      
      },
  
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
  
        getbookstate({stateid:3},this.tok).then(res=>{
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
              if(this.tableData[i].inite){
                this.tableData[i].invite='是'
              }else{
                this.tableData[i].invite='否'
              }
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
                if( this.tableData[i].writerid==this.user[j].id){
                  this.tableData[i].writer = this.tableData[i].writerid
                  this.tableData[i].writerid =this.user[j].name
                  this.tableData[i].tel = this.user[j].tel
                  this.tableData[i].email = this.user[j].email
                }  
                
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