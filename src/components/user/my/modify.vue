<template>
  <div>
    <div class="boxHan">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>修改密码</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
      <div class="box2">
        <div   style="margin: 20px;"></div>
        <el-col :span="12">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="电子邮件" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="tel">
              <el-input v-model="ruleForm.tel"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      
      </div>
    </div>
</template>

<script>

import {modifyuser} from '../../../api/axios'

export default {
    name:'modmodify',
    data() {
      return {
        labelPosition: 'right',
        ruleForm: {
          id:''
        },
        rules: {
          tel: [
            {pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,message: '请输入正确手机号', trigger: 'blur'}

          ],
          email: [
            {pattern:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ,message: '请输入正确的电子邮件', trigger: 'blur'}
          ],
          
        }
      };
    },
    computed:{
      tok(){
        this.ruleForm.id = this.$store.state.userdata.id
        return this.$store.state.tok
      },
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            modifyuser(this.ruleForm,this.tok).then(res=>{
              console.log('object');
              console.log(res);
              if(res.status){
                this.$message.error('修改失败');
              }else{
                this.$message('修改成功');
              }
            }).catch(err=>{
                console.log(err);
                this.$message.error('修改失败');
            })
          } else {
              this.$message.error('没有信息');
            // console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style scoped>
    div{
      width: 80%;
    }
    .boxHan{ 
        margin-top: 50px;
        margin-left: 50px;
    }
    .box2{
      width: 100%;
      margin-left: 20px;
    }
</style>