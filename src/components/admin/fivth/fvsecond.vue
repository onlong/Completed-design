<template>
  <div class="box">
    <div style="float: left;">
      <el-button  @click="dialog = true" type="success">新增</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          fixed
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="admin"
          label="是否管理员">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="info(scope.row)" type="text" size="small">修改信息</el-button>
            <br>
            <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-drawer
        title="新增作家"
        :before-close="handleClose"
        :visible.sync="dialog"
        direction="rtl"
        custom-class="demo-drawer"
        ref="drawer"
        >
        <div class="demo-drawer__content">
          <el-form :model="ruleForm" :rules="rules1" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="姓名" prop="name">
                  <el-input placeholder="只能包含字母-数字字符" v-model="ruleForm.name"></el-input>
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
                  <el-button @click="cancelForm">取 消</el-button>
                  <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
          </el-form>
         
        </div>
      </el-drawer>
      <!-- 修改信息 -->
      <el-drawer
        title="修改信息"
        :before-close="handleClose"
        :visible.sync="dialog1"
        direction="rtl"
        custom-class="demo-drawer"
        ref="drawer"
        >
        <div class="demo-drawer__content">
          <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="姓名" prop="name">
                  <el-input placeholder="只能包含字母-数字字符" v-model="ruleForm1.name"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="tel">
                  <el-input placeholder="请输入手机号" v-model="ruleForm1.tel"></el-input>
              </el-form-item>
            
              
              <br>
              <el-form-item label="是否管理员">
                <el-select v-model="ruleForm1.admin" placeholder="请选择">
                  <el-option label="否" value="0"></el-option>
                  <el-option label="是" value="1"></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="重复密码" prop="newpassword">
                  <el-input @blur="toblur()" v-model="ruleForm.newpassword"></el-input>
              </el-form-item> -->
              
              <el-form-item>
                  <el-button @click="cancelForm">取 消</el-button>
                  <el-button type="primary" @click="submitForm1('ruleForm1')">注册</el-button>
                  <el-button @click="resetForm('ruleForm1')">重置</el-button>
              </el-form-item>
          </el-form>
         
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import {addadmin,adminall,updateadmininfo} from '../../../api/axios'
export default {
  
    methods: {
      submitForm1(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            updateadmininfo(this.ruleForm1).then(res=>{
                if(!res.status){
                    const h = this.$createElement;
                    this.$message({
                    message: h('p', null, [
                        h('span', null, '修改失败 '),
                    ])
                    });
                }else{
                    this.getadminall()
                    this.dialog1 =false;
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
      info(row){
        console.log("row");
        console.log(row);
        this.ruleForm1.id = row.id
        this.ruleForm1.admin = row.admin
        this.dialog1 = true
      },
      del(row){
        updateadmininfo({id:row.id,del:1},this.tok).then(res=>{
          if(res.status){
            this.$message('更新失败')
          }else{
            this.getadminall()
          }
        })
      },
      getadminall(){
        adminall().then(res=>{
          if(res.status){
            this.$message('数据获取失败')
          }else{
            this.tableData = res.data
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addadmin(this.ruleForm).then(res=>{
                if(!res.status){
                    const h = this.$createElement;
                    this.$message({
                    message: h('p', null, [
                        h('span', null, '注册失败 '),
                    ])
                    });
                }else{
                    this.getadminall()
                    this.dialog =false;
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
      handleClick(row) {
        console.log(row);
      },
      handleClose(done) {
        if (this.loading) {
          return;
        }
        this.$confirm('确定要提交表单吗？')
          .then(_ => {
            this.loading = true;
            this.timer = setTimeout(() => {
              done();
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }, 2000);
          })
          .catch(_ => {});
      },
      cancelForm() {
        this.loading = false;
        this.dialog = false;
        this.dialog1 = false
        clearTimeout(this.timer);
      }
    },
    data() {
      return {
        ruleForm1:{
          admin:0
        },
        formLabelWidth: '180px',
        dialog: false,
        dialog1: false,
        tableData: [],
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
        },
      timer: null,
      loading: false,
      }
    },
    mounted(){
      this.getadminall()
    }
  }
</script>

<style scoped>
  .box{
    width: 100%;
    margin: 20px;
  }
</style>