<template>
    <div class="box">
      <div class="inbox">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>初审</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-descriptions class="margin-top" title="" :column="3" :size="size">
        <template slot="extra">
          <el-button @click="download" type="primary" size="small">下载文件</el-button>
        </template>
        <el-descriptions-item label="笔名">{{row.writerid}}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{row.tel}}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{row.email}}</el-descriptions-item>
        <el-descriptions-item label="稿件名">{{row.name}}</el-descriptions-item>
        <el-descriptions-item label="稿件类型">{{row.classid}}</el-descriptions-item>
        <el-descriptions-item label="稿件篇幅">{{row.long}}</el-descriptions-item>
        <el-descriptions-item label="是否约稿">{{row.inite}}</el-descriptions-item>
        <el-descriptions-item v-if="row.invite" label="约稿信息">
          <el-tag @click="toinvite" size="small">查看</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="简介">{{ row.introduction }}</el-descriptions-item>
      </el-descriptions>
      <div>
        <el-button @click="success" type="success">通过</el-button>
        <el-button @click="danger" type="danger">未通过</el-button>
      </div>
      <div class="chouti">
        <el-drawer
          title="我是标题"
          :visible.sync="drawer"
          :with-header="false">
          <div>类型：{{ inite.name }}</div>
          <div>篇幅：{{ inite.long }}</div>
          <div>描述：{{ inite.description }}</div>
          <div>截止日期：{{ inite.date }}</div>
          <div>需要篇数：{{ inite.num }}</div>
        </el-drawer>
      </div>
    </div>

</template>

<script>
import {getinviteid,getclass,insertbook} from '../../api/axios'
import {doDownloadResume} from '../../api/download'
export default {
    data() {
      return {
        drawer: false,
        options:[],
        size:'',
        tok:'',
        inite:{},
      }
    },
    computed:{
      usertok(){
        this.tok = this.$store.state.tok
        return this.$store.state.tok
      }
    },
    props:['row'],
    methods: {
      danger(){
        insertbook({del:1,id:this.row.id}).then(res=>{
          if(res.status){
            this.$message('执行失败')
          }else{
            this.$emit('change',2)
            this.$message('执行成功');
          }
        })
      },
      success(){
        insertbook({stateid:1,id:this.row.id}).then(res=>{
          if(res.status){
            this.$message('执行失败')
          }else{
            this.$emit('change',2)
            this.$message('执行成功');
          }
        })
        
      },
      download(){
        doDownloadResume({name:this.row.name,path:this.row.path+'.docx'})
      },
      toinvite(){
        getinviteid({id:this.row.num},this.tok).then(res=>{
          console.log('res');
          console.log(res);
          if(this.status){
            this.$message('约稿信息获取失败')
          }else{
            res.data[0].date = res.data[0].date.slice(0,10)
            this.inite = res.data[0]
            getclass().then(res=>{
              if(res.status){
                this.$message.error('数据获取失败');
              }else{
                this.options=res.data
                this.drawer = true
              }
            })
            for(var i=0;i<this.options.length;i++){
              if(this.options[i].id == this.inite.clessid){
                this.inite.name = this.options[i].name
              } 
            }
          }
        })

      }
    }
  }

</script>

<style scoped>
    .box{
        margin: 20px;
    }
    .inbox{
      margin-left: 20px;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .chouti div{
      margin: 20px;
    }
</style>