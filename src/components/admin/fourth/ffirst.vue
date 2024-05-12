<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="clessid"
      label="题材">
    </el-table-column>
    <el-table-column
      prop="date"
      label="截稿时间">
    </el-table-column>
    <el-table-column
      prop="long"
      label="篇幅">
    </el-table-column>
    <el-table-column
      prop="num"
      label="需要的篇数">
    </el-table-column>
    <el-table-column
      prop="numman"
      label="当前响应约稿人数">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
        <el-button @click="see(scope.row)" type="text" size="small">查看</el-button>
        
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {getinviteall,getclass} from '../../../api/axios'
  export default {
    methods: {
      handleClick(row) {
        row.action=11
        this.$emit('change',row)
      },
      see(row){
        row.action=16
        this.$emit('change',row)
      }
    },

    data() {
      return {
        tableData: [],
        tok:'',
        options:[],

      }
    },
    computed:{
      admintok(){
        this.tok = this.$store.state.admintok
        return this.$store.state.admintok
      },
      admindata(){
        return this.$store.state.admindata
      }
    },
    mounted(){
      getclass().then(res=>{
        if(res.status){
          this.$message.error('数据获取失败');
        }else{
          this.options=res.data
        }
      })
      getinviteall(this.tok).then(res=>{
        console.log('res');
        console.log(res);
        if(res.status){
          this.$message('数据获取失败')
        }else{
          this.tableData=res.data
          for(var i=0;i<this.tableData.length;i++){
            this.tableData[i].date = this.tableData[i].date.slice(0,10)
            for(var j=0;j<this.options.length;j++){
              if( this.tableData[i].clessid==this.options[j].id)  this.tableData[i].clessid =this.options[j].name
            }
          }
        }
      })
    }
  }
</script>

<style scoped>

</style>