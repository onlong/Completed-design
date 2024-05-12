<template>
  <div class="box">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="书名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="篇幅" prop="long">
            <el-select v-model="ruleForm.long" placeholder="请选择篇幅">
              <el-option label="长篇" value="0"></el-option>
              <el-option label="中篇" value="1"></el-option>
              <el-option label="短篇" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="题材" prop="classid">
            <el-select v-model="ruleForm.classid" placeholder="请选择题材">
                <el-col v-for="(item,index) in options" :key="index" :span="10">
                  <el-option  :label=item.name :value=item.id></el-option>
                </el-col>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
        <el-form-item class="hightn" label="简介" prop="introduction">
          <el-input type="textarea" v-model="ruleForm.introduction"></el-input>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="14">
          <el-upload
            prop="upload"
            accept="doc"
            class="upload-demo"
            drag
            ref="abort"
            :limit=limit
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :on-progress="handleAvatarProgress"
            :auto-upload = autoupload
            action="http://127.0.0.1:3007/api/files/upload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传doc/docx文件，且不超过500kb</div>
          </el-upload>
        </el-col>
      </el-row>
      <div class="btn">
        <el-row>
          <el-col :span="10">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即投稿</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import {addbook,getclass} from '../../api/axios'
export default {
    name:"contribute",
    data() {
      return {
        autoupload:true,
        limit:1,
        options:[],
        ruleForm: {
          writerid:"",
          classid:1,
          long:"0",
          name:"",
          path:'',

        },
        rules: {
          upload:[
            { required: true, message: '请上传文件', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入书名', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          long: [
            { required: true, message: '请选择稿件篇幅', trigger: 'change' }
          ],
          classid: [
            { required: true, message: '请选择投稿类型', trigger: 'change' }
          ],
          introduction: [
            {  max: 100, message: '最长 100 个字符',message: '请输入长度合适的简介', trigger: 'blur' }
          ],
        }
      };
    },
    computed:{
      userdata(){
        this.ruleForm.writerid = this.$store.state.userdata.id
        return this.$store.state.userdata
      },
      tok(){
        return this.$store.state.tok
      }
      
    },
    methods:{
      handleAvatarSuccess(res, file) {
        console.log(file.response.code);
        if(!file.response.code){
          
          this.ruleForm.path ='./upload/'+file.name;
          
        }
      },
      handleAvatarProgress(event, file, fileList){
        var name1 = this.ruleForm.name+'.doc'
        var name2 = this.ruleForm.name+'.docx'
        if(!(file.name == name1 || file.name == name2)){
          this.$message({
            message: "请使文件名与书名保持一致",
            type: "warning",
          });
          this.$refs.abort.abort()
        }
      },
      beforeAvatarUpload(file){
        console.log(file);
        var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
        var name1 = this.ruleForm.name+'.doc'
        var name2 = this.ruleForm.name+'.docx'
        const extension = testmsg === "doc"|| testmsg === "docx";
        if (!extension ) {
          this.$message({
            message: "上传文件只能是.doc、.docx格式!",
            type: "warning",
          });
          return false
        }
        if(!(file.name == name1 || file.name == name2)){
          this.$message({
            message: "请使文件名与书名保持一致",
            type: "warning",
          });
          this.$refs.abort.abort()
          return false
        }
        this.ruleForm.path = './upload/'+file.name;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.ruleForm.writerid = this.$store.state.userdata.id
              addbook(this.ruleForm,this.$store.state.tok).then(res=>{
                if(res.status){
                  this.$message.error('上传失败');
                }else{
                  this.$message('书稿上传成功，等待审核');
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted(){
      getclass().then(res=>{
        if(res.status){
          this.ruleForm.writerid = this.$store.state.userdata.id
          this.$message.error('下拉表获取失败');
        }else{
          this.options=res.data
        }
      })
    }
    
}
</script>

<style scoped>
    .div{
        width: 1000px;
        height: 1000px;
        background-color: antiquewhite;
    }
    .box{
      margin: 50px;
      width: 1000px;
    }
    .hightn{
      height: 100px;
    }
    .btn{
      margin-top: 20px; 
    }
</style>