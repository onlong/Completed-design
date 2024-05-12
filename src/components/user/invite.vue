<template>
    <div>
      <div style="float: left;" v-for="(item,index) in getcarData" :key="index">
        <el-card  class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
                <el-button @click="addnum(index)" style="float: right; padding: 3px 0" type="text">想投稿</el-button>
            </div>
            <div  class="text item">
                <div><span>题材：{{ item.clessid }}</span><span>篇幅：{{ item.long }}</span></div>

                <div>结束时间：{{ item.date }}</div>
                <div><span>需要数目：{{ item.num }}</span><span>决定投稿人数：{{ item.numman }}</span></div>
                <div><el-button @click="popover(index)" style=" padding: 3px 0" type="text">具体描述</el-button></div>
              </div>
        </el-card>
      </div>
        
        <div>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>{{description}}</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
    </div>
    
</template>

<script>
import {getinvite,getclass,ininvite,addwait} from '../../api/axios'
export default {
    name:'invite',
    data(){
      return{
        description:'',
        options:[],
        tok:'',
        carData:[],
        dialogVisible: false,

      }
    },
    methods:{
      setaddwait(val){
        addwait({writerid:this.userdata.id,invitid:val},this.tok).then(res=>{
          if(res.status){
            this.$message.error(res.message);
          }
        })
      },
      getinvitefun (){
        getinvite(this.userdata,this.tok).then(res=>{
          this.carData = res.data
          for(var i = 0 ;i<this.carData.length;i++){
            this.carData[i].date = this.carData[i].date.slice(0,10)
            if(this.carData[i].long==0) this.carData[i].long = '长篇'
            if(this.carData[i].long==1) this.carData[i].long = '中篇'
            if(this.carData[i].long==2) this.carData[i].long = '短篇'
            for(var j=0;j<this.options.length;j++){
              if(this.options[j].id == this.carData[i].clessid)  this.carData[i].clessid =this.options[j].name
            }
          }
        }).catch(err=>{
          console.log('err');
          console.log(err);
        })
      },
      addnum(index){
        console.log(index);
        ininvite({
            id:this.carData[index].id,
            numman:this.carData[index].numman+1,
          },this.tok).then(res=>{
          if(res.status){
            this.$message.error('想投稿失败');
            return
          }
          this.setaddwait(this.carData[index].id)
          this.getinvitefun()
        })
        
      },
      popover(index){
       this.dialogVisible = true
       this.description = this.carData[index].description
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    },
    computed:{
      getcarData(){
        return this.carData;
      },
      userdata(){
        this.tok = this.$store.state.tok
        return this.$store.state.userdata
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
      // getinvite(this.userdata,this.tok).then(res=>{
      //   this.carData = res.data
      //   for(var i = 0 ;i<this.carData.length;i++){
      //     this.carData[i].date = this.carData[i].date.slice(0,10)
      //     if(this.carData[i].long==0) this.carData[i].long = '长篇'
      //     if(this.carData[i].long==1) this.carData[i].long = '中篇'
      //     if(this.carData[i].long==2) this.carData[i].long = '短篇'
      //     for(var j=0;j<this.options.length;j++){
      //       if(this.options[j].id == this.carData[i].clessid)  this.carData[i].clessid =this.options[j].name
      //     }
      //   }

      // }).catch(err=>{
      //   console.log('err');
      //   console.log(err);
      // })
      this.getinvitefun()
    }
}
</script>

<style scoped>
 .text {
    font-size: 14px;
  }
  .text div{
    margin-top: 10px;
  }
  .text span{
    margin-left: 20px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    margin: 20px;
  }
</style>