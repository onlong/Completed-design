<template>
  <div class="box">
    <el-row type="flex" class="row-bg">
        <el-button @click="dialogFormVisible = true" type="primary">新增</el-button>
    </el-row>
    <div>
    </div>
    <el-table
      :data="options"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="类型名">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">操作</el-button>          
          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>          
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="类型名" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="类型名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="determine">确 定</el-button>
        </div>
        </el-dialog>
    <el-dialog title="类型名" :visible.sync="dialogFormVisible1">
        <el-form :model="form1">
            <el-form-item label="类型名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="determine1">确 定</el-button>
        </div>
        </el-dialog>
  </div>
    
  </template>
  
  <script>
  import {getclass,releaseclass,insertclass} from '../../api/axios'
  export default {
      data() {
        return {
          row:{},
          tableData: [],
          options:[],
          user:[],
          tok:'',
          form:{},
          form1:{},
          dialogFormVisible : false,
          dialogFormVisible1 : false,
          formLabelWidth: '120px',
        }
      },
      methods:{
        del(row){
          insertclass({id:row.id,del:1},this.tok).then(res=>{
            if(res.status){
              this.$message('删除失败')
            }else{
              this.setgetclass()
            }
            
          })
        },
        handleClick(row){
          this.row=row
          this.dialogFormVisible1 = true
        },
        determine(){
          releaseclass({ name :this.form.name},this.tok).then(res=>{
            if(res.status){
              this.setgetclass()
              this.dialogFormVisible1 = false
            }else{
              this.$message('发布失败')
            }
          })
        },
        determine1(){
          insertclass({id:this.row.id,name :this.form.name},this.tok).then(res=>{
            if(res.status){
              this.setgetclass()
              this.dialogFormVisible1 = false
            }else{
              this.$message('发布失败')
            }
            
          })
        },
        setgetclass(){
          getclass().then(res=>{
            if(res.status){
              this.$message.error('数据获取失败');
            }else{
              this.options=res.data
            }
          })
        }
      },
      mounted(){
        this.setgetclass()
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
    .box{
        margin: 20px;
        width: 100%;
    }
  </style>