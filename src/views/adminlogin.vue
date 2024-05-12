<template>
    <div class="box">
      <h1>后台登录</h1>
      <el-form size="small " :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账户名" prop="tel">
              <el-input placeholder="账号名为手机号" v-model="ruleForm.tel"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
              <el-input placeholder="请输入密码" v-model="ruleForm.password" show-password></el-input>
          </el-form-item>
          <el-button  @click="toLogin" size="medium " type="primary" plain>登录</el-button>
      </el-form>
    </div>
  </template>
  
  <script>
  import {adminLogin} from '../api/axios.js'
  export default {
      name: 'AdminLogin',
      data() {
        return {
          ruleForm: {
            tel: '15132826480',
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
            adminLogin({tel:this.ruleForm.tel,password:this.ruleForm.password}).then(res=>{
                  if(res.status){
                      const h = this.$createElement;
                      this.$message({
                      message: h('p', null, [
                          h('span', null, '登录失败 '),
                      ])
                      });
                  }else{
                    this.$store.commit('addadmintok',res.token)
                    // getUserinfo(this.ruleForm.tel).then(res=>{
                    //     console.log(res);
                    //   }).catch(err=>{
                    //     console.log(err);
                    //   })
                      // console.log(this.$store.state.userdata);
                    
                    this.$store.commit('addadmin',this.ruleForm)
                    this.$router.push({ name: 'adminmain',replace: true })
                    
                  }
              }).catch(err=>{
                console.log('this is err');
                  console.log(err);
              })
          },
      },
      computed :{
        tok(){
          return this.$store.state.admintok
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