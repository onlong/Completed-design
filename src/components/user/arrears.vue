<template>
  <div>
        <el-card  v-for="(item,index) in carData" :key="index" class="box-card" shadow="hover">
            <div class=" box">
              <div slot="header" class="clearfix">
                <el-button @click="addbook(index)" style="float: right; padding: 3px 0" type="text">投稿</el-button>
              </div>
              <div  class="text item">
                  <div><span>题材：{{ item.clessid }}</span><span>篇幅：{{ item.long }}</span></div>

                  <div>结束时间：{{ item.date }}</div>
                  <div><span>需要数目：{{ item.num }}</span><span>决定投稿人数：{{ item.numman }}</span></div>
                  <div><el-button @click="popover(index)" style=" padding: 3px 0" type="text">具体描述</el-button></div>
                </div>
            </div>
            
        </el-card>
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
import {getinvite,getclass,ininvite,addwait,getwait,getReviewed} from '../../api/axios'
export default {
    name:'arrears',
    data(){
      return{
        description:'',
        options:[],
        tok:'',
        carData:[],
        transfer:[],
        invitData:[],
        dialogVisible: false,

      }
    },
    methods:{
      getinvitefun (){
        getinvite(this.userdata,this.tok).then(res=>{
          this.transfer = res.data
          for(var i = 0 ;i<this.transfer.length;i++){
            this.transfer[i].cless = this.transfer[i].clessid
            this.transfer[i].date = this.transfer[i].date.slice(0,10)
            this.transfer[i].longid = this.transfer[i].long
            if(this.transfer[i].long==0) this.transfer[i].long = '长篇'
            if(this.transfer[i].long==1) this.transfer[i].long = '中篇'
            if(this.transfer[i].long==2) this.transfer[i].long = '短篇'

            for(var j=0;j<this.options.length;j++){
              if(this.options[j].id == this.transfer[i].clessid)  this.transfer[i].clessid =this.options[j].name
            }
          }
          getwait({writerid:this.userdata.id}).then(res=>{
              if(res.status){
                this.$message('数据获取失败')
              }else{
                this.invitData=res.data
                for(var i=0;i<this.transfer.length;i++){
                  for(var j=0;j<res.data.length;j++){
                    if(this.transfer[i].id == res.data[j].invitid){
                      console.log(i);
                      this.carData.push(this.transfer[i])
                    }
                  }
                }
                for(var i=0;i<this.invitData.length;i++){
                  for(var j=0;j<this.carData.length;j++){
                    if(this.invitData[i].invitid == this.carData[j].id){
                      this.invitData[i].date = this.carData[j].date
                      this.invitData[i].long = this.carData[j].long
                      this.invitData[i].clessid = this.carData[j].clessid
                      this.invitData[i].cless = this.carData[j].clessid
                      this.invitData[i].num = this.carData[j].num
                      this.invitData[i].numman = this.carData[j].numman
                      this.invitData[i].description = this.carData[j].description
                      
                    }
                  }
                }
              }
              
              
            })
        }).catch(err=>{
          console.log('err');
          console.log(err);
        })
      },
      addbook(index){
        this.$emit('change', {val:'3-3',
                              writerid:this.userdata.id,
                              id:this.invitData[index].id,
                              invitid:this.invitData[index].invitid,
                              classid:this.carData[index].cless,
                              long:this.carData[index].longid
                            });
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
        return this.invitData;
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
      this.getinvitefun()
      // getwait({writerid:this.userdata.id}).then(res=>{
      //   if(res.status){
      //     this.$message('数据获取失败')
      //   }else{
      //     this.invitData=res.data
      //     for(var i=0;i<this.invitData.length;i++){
      //       for(var j=0;j<this.carData.length;j++){
      //         if(this.invitData[i].invitid == this.carData[j].id){
      //           this.invitData[i].date = this.carData[j].date
      //           this.invitData[i].long = this.carData[j].long
      //           this.invitData[i].clessid = this.carData[j].clessid
      //           this.invitData[i].cless = this.carData[j].clessid
      //           this.invitData[i].num = this.carData[j].num
      //           this.invitData[i].numman = this.carData[j].numman
      //           this.invitData[i].description = this.carData[j].description
                
      //         }
      //       }
      //     }
      //   }
        
        
      // })
    }
}
</script>

<style scoped>

 .text {
    font-size: 14px;
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