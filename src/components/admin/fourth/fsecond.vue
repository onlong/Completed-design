<template>
  <div class="box">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="篇幅" prop="long">
        <el-select v-model="ruleForm.long" placeholder="请选择需要篇幅">
          <el-option label="长篇" value="0"></el-option>
          <el-option label="中篇" value="1"></el-option>
          <el-option label="短篇" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="需要篇数" prop="num">
        <el-input-number v-model="ruleForm.num" @change="handleChange" :min="1"  label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item label="题材" prop="clessid">
        <el-select v-model="ruleForm.clessid" placeholder="请选择题材">
          <el-option v-for="(item,index) in options" :key="index" :label=item.name :value=item.id></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="截稿时间" required>
        <el-col :span="15">
          <el-form-item prop="date">
            <el-date-picker
              v-model="ruleForm.date"
              type="date"
              value-format=yyyy-MM-dd
              @change="getBirthDate"
              :picker-options="pickerOptions"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2"></el-col>
      </el-form-item>
      
      <el-form-item label="具体描述" prop="description">
        <el-input type="textarea" v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {getclass,setinvite} from '../../../api/axios'
  export default {
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        options:[],
        ruleForm: {
          num:1,
          description:"描述",
          date:"",
          clessid:1,
          long:"2",
        },
        rules: {
          clessid: [
            { required: true, message: '请选择题材', trigger: 'change' }
          ],
          long: [
            { required: true, message: '请选择篇幅', trigger: 'change' }
          ],
          date: [
            { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
          ],
          description: [
            { required: true, message: '请填写书稿简介', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      getTime(time){
        console.log(time);
      },
      getBirthDate(date){
        console.log(date);
      },
      handleChange(value) {
        console.log(value);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.long = Number(this.ruleForm.long)
            setinvite(this.ruleForm,this.tok).then(res=>{
              console.log('res');
              console.log(res);
              if(res.status){
                this.$message(res.message)
              }else{
                this.$message('发布失败')
              }
            }).catch(err=>{
              console.log('err');
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
      }
    },
    computed:{
      tok(){
        return this.$store.state.admintok
      }
    },
    mounted(){
      getclass().then(res=>{
        if(res.status){
          this.$message('数据获取失败')
        }else{
          this.options = res.data
        }
      }).catch(err=>{
        console.log('err');
        console.log(err);
      })
    }
  }
</script>

<style scoped>
.box{
  margin: 20px;
}
</style>