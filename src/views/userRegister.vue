<template>
  <div class="box">
    <div>
        <el-page-header @back="goBack" content="注册成为作家">
        </el-page-header>
    </div>
    <div class="minibox">
        <el-form :model="ruleForm" :rules="rules1" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="笔名" prop="name">
                <el-input placeholder="只能包含字母-数字字符" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="电子邮件" prop="email">
                <el-input placeholder="请输入电子邮件" v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="tel">
                <el-input placeholder="请输入手机号" v-model="ruleForm.tel"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input placeholder="请输入密码" v-model="ruleForm.password" show-password></el-input>
            </el-form-item>
            <!-- <el-form-item label="重复密码" prop="newpassword">
                <el-input @blur="toblur()" v-model="ruleForm.newpassword"></el-input>
            </el-form-item> -->
            
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import {userRegister} from '../api/axios.js'
export default {
    name:'userRegister',
    data() {
      return {
        ruleForm: {
          name: 'yuanchenzhen',
          email: '2044309138@qq.com',
          tel: '15111111111',
          password: 'admin2',
          newpassword: 'admin2',
        },
        rules1: {
          name: [
            { required: true, message: '请输入正确的笔名', trigger: 'blur' },
            {pattern:/^[a-zA-Z0-9]+$/,message: '请输入正确的笔名', trigger: 'blur'},
            { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' }

          ],
          email: [
            { required: true, message: '请输入正确的电子邮件', trigger: 'blur' },
            {pattern:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ,message: '请输入正确的电子邮件', trigger: 'blur'}

          ],
          tel: [
            { required: true, message: '请输入正确账户名', trigger: 'blur' },
            {pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,message: '请输入正确手机号', trigger: 'blur'}
          ],
          password: [
            { required: true, message: '请输入正确密码', trigger: 'blur' },
            { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
          ],
          newpassword: [
            { required: true, message: '输入密码不同', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            userRegister(this.ruleForm).then(res=>{
                if(!res.status){
                    const h = this.$createElement;
                    this.$message({
                    message: h('p', null, [
                        h('span', null, '注册失败 '),
                    ])
                    });
                }else{
                    this.$router.push({ path: '/', replace: true })
                }
            }).catch(err=>{
                console.log(err);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      toblur(){
        if(!(this.ruleForm.password==this.ruleForm.newpassword)){
            console.log('object');
        }
      }
    }
}
</script>

<style scoped>
    .box{
        margin: 50px;
    }
    .minibox{
        margin: 50px;
    }
</style>