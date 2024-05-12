<template>
  <div style="width: 100%;">
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
            <el-form-item label="原密码" prop="oldPwd">
              <el-input v-model="ruleForm.oldPwd" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd">
              <el-input v-model="ruleForm.newPwd" show-password></el-input>
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

import {updateadminpwd} from '../../../api/axios'

export default {
    name:'modmodify',
    data() {
      return {
        labelPosition: 'right',
        ruleForm: {
          id:''
        },
        rules: {
            oldPwd: [
            { required: true, message: '请输入正确密码', trigger: 'blur' },
            { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
          ],
            newPwd: [
            { required: true, message: '请输入正确密码', trigger: 'blur' },
            { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
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
            updateadminpwd(this.ruleForm,this.tok).then(res=>{
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
    .boxHan{
        margin-top: 50px;
        margin-left: 50px;
    }
</style>