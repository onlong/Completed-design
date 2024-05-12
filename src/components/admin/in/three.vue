<template>
    <div class="box">
      <div class="inbox">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>校对</el-breadcrumb-item>
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
        <el-descriptions-item v-if="row.inite" label="约稿信息">
          <el-tag @click="toinvite" size="small">查看</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="简介">{{ row.introduction }}</el-descriptions-item>
      </el-descriptions>
      <div>
        <div style="margin-bottom: 20px; margin-top: 20px;">
            <el-steps :active="active" align-center>
                <el-step title="一校" :description="!description[0]?'未校对':description[0].name"></el-step>
                <el-step title="二校" :description="!description[1]?'未校对':description[1].name"></el-step>
                <el-step title="三校" :description="!description[2]?'未校对':description[2].name"></el-step>
            </el-steps>
        </div>
       
        <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <div class="btn">
            <el-button @click="success" type="success">通过</el-button>
            <el-button @click="next" type="success">待出版</el-button>
        </div>
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
import {insertbook,getinviteid,getclass,releaseaudit,releaseproofread,seeproofread,adminall} from '../../../api/axios'
import {doDownloadResume} from '../../../api/download'
export default {beforeDestroy(){
      insertbook({id:this.row.id,state:0}).then(res=>{
          if(res.status){
            this.$message.error('数据修改失败');
          }
        })
    },
    data() {
      return {
        admin:[],
        description:[],
        active: 0,
        textarea: '',
        drawer: false,
        options:[],
        size:'',
        tok:'',
        inite:{},
      }
    },
    computed:{
      admintok(){
        this.tok = this.$store.state.admintok
        return this.$store.state.admintok
      },
      wachactive(){
        return this.active
      }
    },
    props:['row'],
    methods: {
      next(){
        if(this.active==3){
          insertbook({id:this.row.id,stateid:3}).then(res=>{

          })
          
          this.$emit('change',4)
        }else{
          this.$message('校对次数不够')
        }
      },
      success(){
        releaseproofread({bookid:this.row.id,num:this.description.length+1,responsibleid:this.$store.state.admindata.id},this.tok).then(res=>{
            console.log('releaseproofread');
            console.log(res);
            if(res.status){
            this.$emit('change',4)
            this.$message('执行成功');
          }else{
            this.$message('执行失败')
          }
        })
        
      },
      download(){
        doDownloadResume({name:this.row.name,path:this.row.path+'.docx'})
      },
      toinvite(){
        
        getinviteid({id:this.row.num},this.tok).then(res=>{
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
    },
    mounted(){
        adminall().then(res=>{
            if(res.status){
                this.$message('信息获取失败')
            }else{
                this.admin = res.data
                seeproofread({bookid:this.row.id},this.tok).then(res=>{
                    if(res.status){
                        this.$message('数据获取失败')
                    }else{
                        this.description = res.data
                        this.active = this.description.length
                        for(var i=0;i<this.description.length;i++){
                            for(var j=0;j<this.admin.length;j++){
                                if(this.description[i].responsibleid == this.admin[j].id){
                                    this.description[i].name = this.admin[j].name
                                }
                            }
                        }
                    }
                    
                })
            }
        })
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
    .btn{
        margin-top: 20px;
    }
</style>