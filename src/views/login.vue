<template>
  <div class="box">
    <h1 style="margin: 20px;">出版社管理系统</h1>
    <el-form size="small " :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账户名" prop="tel">
            <el-input placeholder="账号名为手机号" v-model="ruleForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input placeholder="请输入密码" v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
        <el-button  @click="toLogin" size="medium " type="primary" plain>登录</el-button>
    </el-form>
    
  <el-link @click="toRegister" target="_blank">注册成为作家</el-link>
  </div>
</template>

<script>
import {ApiLogin} from '../api/axios.js'
export default {
    name: 'AdminLogin',
    data() {
      return {
        ruleForm: {
          tel: '18888888855',
          password:'admin'
        },
        rules: {
            tel:[
            { required: true, message: '请输入正确账户名', trigger: 'blur' },
            {pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,message: '请输入正确手机号', trigger: 'blur'}
          ],
          password:[
            { required: true, message: '请输入正确密码', trigger: 'blur' },
            { min: 5, max: 18, message: '长度在 5 到 18 个字符', trigger: 'blur' }
          ]
          
        }
      };
    },
    methods: {
        // then、catch、finally
        toLogin(){
          ApiLogin({tel:this.ruleForm.tel,password:this.ruleForm.password}).then(res=>{
                if(res.status){
                    const h = this.$createElement;
                    this.$message({
                    message: h('p', null, [
                        h('span', null, '登录失败 '),
                    ])
                    });
                }else{
                  this.$store.commit('addTok',res.token)
                  // getUserinfo(this.ruleForm.tel).then(res=>{
                  //     console.log(res);
                  //   }).catch(err=>{
                  //     console.log(err);
                  //   })
                    // console.log(this.$store.state.userdata);
                  
                  this.$store.commit('adduser',this.ruleForm.tel)
                  this.$router.push({ name: 'toone',replace: true })
                  
                }
            }).catch(err=>{
              console.log('this is err');
                console.log(err);
            })
        },
        toRegister(){
          this.$router.push({ path: '/userRegister', replace: true })
        }
    },
    computed :{
      tok(){
        return this.$store.state.tok
      }
    }
  }
</script>

<style scoped>
    .box{
        width: 500px;
        height: 500px;
        padding: 300px;
        margin-left: 200px;
        
    }
</style>