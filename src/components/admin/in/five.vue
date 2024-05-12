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
        prop="classid"
        label="题材">
      </el-table-column>
      <el-table-column
        prop="long"
        label="篇幅">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">操作</el-button>
          
        </template>
      </el-table-column>
    </el-table>
  </template>
  
  
  <script>
  import {getbookid,getclass,getuserall,insertbook,getwaitinviit} from '../../../api/axios'
    export default {
        props:['row'],
      methods: {
        handleClick(row) {
          // console.log(row);
          insertbook({id:row.id,state:1}).then(res=>{
            if(res.status){
              this.$message.error('数据修改失败');
            }
          })
          row.action=8
          this.$emit('change',row)
        }
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
        getwaitinviit({invitid:this.row.id}).then(res=>{
          if(res.status){
              this.$message(res.message)
          }else{
            for(var i = 0 ;i<res.data.length;i++){
              getbookid({id:res.data[i].bookid}).then(res=>{
                if(res.status){
                  this.$message('数据获取失败')
                }else{
                  var data = res.data[0]
                  if(data.long==0) data.long = '长篇'
                  if(data.long==1) data.long = '中篇'
                  if(data.long==2) data.long = '短篇'
                  data.stateid='未审核'
                  if(data.inite){
                    data.invite='是'
                  }else{
                    data.invite='否'
                  }
                  if(data.stateid==0){
                    data.stateid='未审核'
                  }else if(data.stateid==1){
                    data.stateid='沟通中'
                  }else if(data.stateid==2){
                    data.stateid='校对中'
                  }else if(data.stateid==3){
                    data.stateid='已出版'
                  }
                  for(var j=0;j<this.options.length;j++){
                    if( data.classid==this.options[j].id)  data.classid =this.options[j].name
                  }
                  
                  for(var j=0;j<this.user.length;j++){
                    if( data.writerid==this.user[j].id){
                      data.writer = data.writerid
                      data.writerid =this.user[j].name
                      data.tel = this.user[j].tel
                      data.email = this.user[j].email
                    }  
                    
                  }
                  this.tableData.push(res.data[0])
                }
              })
            }
            
          }
        })
        // getbookstate({stateid:0},this.tok).then(res=>{
        //   console.log('res');
        //   console.log(res);
        //   if(res.status){
        //       this.$message(res.message)
        //   }else{
        //       this.tableData = res.data
        //       for(var i = 0 ;i<this.tableData.length;i++){
        //       // this.tableData[i].date = this.tableData[i].date.slice(0,10)
        //       if(this.tableData[i].long==0) this.tableData[i].long = '长篇'
        //       if(this.tableData[i].long==1) this.tableData[i].long = '中篇'
        //       if(this.tableData[i].long==2) this.tableData[i].long = '短篇'
        //       if(this.tableData[i].inite){
        //         this.tableData[i].invite='是'
        //       }else{
        //         this.tableData[i].invite='否'
        //       }
        //       if(this.tableData[i].stateid==0){
        //         this.tableData[i].stateid='未审核'
        //       }else if(this.tableData[i].stateid==1){
        //         this.tableData[i].stateid='沟通中'
        //       }else if(this.tableData[i].stateid==2){
        //         this.tableData[i].stateid='校对中'
        //       }else if(this.tableData[i].stateid==3){
        //         this.tableData[i].stateid='已出版'
        //       }
        //       for(var j=0;j<this.options.length;j++){
        //         if( this.tableData[i].classid==this.options[j].id)  this.tableData[i].classid =this.options[j].name
        //       }
              
        //       for(var j=0;j<this.user.length;j++){
        //         if( this.tableData[i].writerid==this.user[j].id){
        //           this.tableData[i].writer = this.tableData[i].writerid
        //           this.tableData[i].writerid =this.user[j].name
        //           this.tableData[i].tel = this.user[j].tel
        //           this.tableData[i].email = this.user[j].email
        //         }  
                
        //       }
        //     }
        //   }
        // })
      },
      computed:{
        admintok(){
          this.tok = this.$store.state.admintok
          return this.$store.state.admintok
        },
        admindata(){
          return this.$store.state.admindata
        },
        intableData(){
          for(var i = 0 ;i<this.tableData.length;i++){
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
                  this.tableData[i].writerid =this.user[j].name
                }  
                
              }
            }
        }
      }
    }
  </script>
  
  <style scoped>
  
  </style>