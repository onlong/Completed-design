<template>
  <div>
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
        prop="long"
        label="篇幅">
        </el-table-column>
        <el-table-column
        prop="classid"
        label="类型">
        </el-table-column>
        <el-table-column
        prop="inite"
        label="是否约稿">
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getReviewed,getclass} from '../../api/axios'
export default {
    name:'audit',
    data(){
        return{
            options:{},
            class:{},
            tok:'',
            oldtableData:[],
            tableData: []
        }
    },
    methods: {
      handleClick(row) {
        row.action='2-5'
        this.$emit('change',row)
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
      getclass().then(res=>{
        if(res.status){
          this.ruleForm.writerid = this.$store.state.userdata.id
          this.$message.error('数据获取失败');
        }else{
          this.options=res.data
        }
      })
      getReviewed({writerid:this.userdata.id},this.tok).then(res=>{
        if(res.status){
          this.$message.error('数据获取失败');
        }else{
          this.oldtableData = res.data
          
          for (let i = 0; i < this.oldtableData.length; i++) {
              if (this.oldtableData[i].stateid == 1) {
                this.tableData.push(this.oldtableData[i])
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