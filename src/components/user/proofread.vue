<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="书名">
      </el-table-column>
      <el-table-column
        prop="long"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="classid"
        label="篇幅">
      </el-table-column>
      <el-table-column
        prop="inite"
        label="是否约稿">
      </el-table-column>
      <el-table-column
        prop="proofread[0]"
        label="一校">
      </el-table-column>
      <el-table-column
        prop="proofread[1]"
        label="二校">
      </el-table-column>
      <el-table-column
        prop="proofread[2]"
        label="三校">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import {getReviewed,adminall,getclass,seeproofreadall} from '../../api/axios'
export default {
    name:'proofread',
    data(){
        return{
            proofreadall:[],
            options:{},
            tok:'',
            oldtableData:[],
            tableData: [],
            admin:[],
        }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },
    computed:{
      userdata(){
        this.tok = this.$store.state.tok
        return this.$store.state.userdata
      },
      changetableData(){
        
      }
    },
    mounted(){
      seeproofreadall(this.tok).then(res=>{
        if(res.status){
          this.$message('数据获取失败')
        }else{
          this.proofreadall=res.data
          
        }
      })
      adminall().then(res=>{
        if(res.status){
          this.$message.error('数据获取失败');
        }else{
          this.admin = res.data
        }
      })
      getReviewed({writerid:this.userdata.id},this.tok).then(res=>{
        if(res.status){
          this.$message.error('数据获取失败');
        }else{
          this.oldtableData = res.data
          
          getclass().then(res=>{
                  if(res.status){
                    this.$message.error('数据获取失败');
                  }else{
                    this.options=res.data
                    
                  }
                })
          for (let i = 0; i < this.oldtableData.length; i++) {
              if (this.oldtableData[i].stateid == 2) {
                this.tableData.push(this.oldtableData[i])
              }
            }
          for(var i=0;i<this.proofreadall.length;i++){
            for(var j=0;j<this.admin.length;j++){
              if(this.proofreadall[i].responsibleid == this.admin[j].id){
                this.proofreadall[i].responsibleid = this.admin[j].name
              }
            }
          }
          for(var i=0 ;i<this.tableData.length;i++){
            if(this.tableData[i].long==0) this.tableData[i].long = '长篇'
            if(this.tableData[i].long==1) this.tableData[i].long = '中篇'
            if(this.tableData[i].long==2) this.tableData[i].long = '短篇'
            if(this.tableData[i].inite == 0){
              this.tableData[i].inite = '否'
            }else{
              this.tableData[i].inite = '是'
            }
            this.tableData[i].proofread=[]
            var num =0
            for(var j=0;j<this.proofreadall.length;j++){
              if(this.proofreadall[j].bookid == this.tableData[i].id){
                this.tableData[i].proofread.push(this.proofreadall[j].responsibleid)
                num++
              }
              
            }
            
            for(var j=0;j<this.options.length;j++){
              if(this.options[j].id == this.tableData[i].classid)  this.tableData[i].classid =this.options[j].name
            }
          }
        }
        

        // console.log('res');
        // console.log(res);
      }).catch(err=>{
        // console.log('err');
        // console.log(err);
        this.$message.error('服务器连接失败');
      })
    }

}
</script>

<style>

</style>