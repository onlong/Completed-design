<template>
    <div class="box">
        <div v-for="(item,index) in audit" :key="index" >
            <el-col :span="24">
                <el-card shadow="hover">
                    <div>时间：{{ item.date }}</div>
                    <div>建议：{{ item.opinion }}</div>
                </el-card>
            </el-col>
        </div>
        <div class="inbox">
            <el-upload
            class="upload-demo"
            drag
            :limit=limit
            :before-upload=upload
            action="http://127.0.0.1:3007/api/files/upload"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传doc/docx文件，且不超过500kb</div>
            </el-upload>
        </div>
    </div>
</template>

<script>
import {seeaudit,insertbook} from '../../../api/axios'
export default {
    name:'andcontribute',
    data(){
        return{
            audit:[],
            tok:'',
            limit:1,
        }
    },
    props:['row'],
    methods:{
        upload(fils){
            console.log(fils);
            console.log(fils.name.length);
            var j = fils.name.length
            var name = fils.name.slice(0,j-5);
            var name1 = fils.name.slice(0,j-4);
            var suffix = fils.name.slice(j-5,j);
            if(suffix == '.docx'){
                if(name != this.row.name){
                    this.$message('请重新上传')
                    return false
                }
            }else{
                suffix = fils.name.slice(j-4,j);
                if(suffix=='.doc'){
                    if(name != this.row.name){
                        
                        this.$message('请重新上传')
                        return false
                    }
                }else{
                    this.$message('请重新上传')
                    return false
                }
            }
            insertbook({id:this.row.id,sign:1}).then(res=>{

            })
            this.$emit('change','2-2')
        }
    },
    mounted(){
        seeaudit({bookid:this.row.id},this.usertok).then(res=>{
            if(res.status){
                this.$message('数据获取失败')
            }else{
                this.audit=res.data
                for(var i=0;i<this.audit.length;i++){
                    this.audit[i].date=this.audit[i].date.slice(0,10)
                }
            }
        })
    },
    computed:{
        usertok(){
            this.tok = this.$store.state.tok
            return this.$store.state.tok
        }
    }
}
</script>

<style scoped>
    .box{
        margin: 50px;
    }

</style>