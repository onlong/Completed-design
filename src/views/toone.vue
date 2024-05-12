<template>
  <div class="box">
    
    <Hander  @change="costPlannedAmountChange" >
        <template v-if="action == '1'">
          <contribute/>
        </template>
        <template v-if="action == '2-1'">
          <reviewed/>
        </template>
        <template v-if="action == '2-2'">
          <audit @change="totfive"/>
        </template>
        <template v-if="action == '2-3'">
          <proofread/>
        </template>
        <template v-if="action == '2-4'">
          <publish @change="tofour" />
        </template>
        <template v-if="action == '2-5'">
          <andcontribute :row="audit" @change="costPlannedAmountChange"/>
        </template>
        <template v-if="action == '3-1'">
          <invite/>
        </template>
        <template v-if="action == '3-2'">
          <arrears @change="tothreetwo"/>
        </template>
        <template v-if="action == '4'">
          <detailss :row="row"/>
        </template>
        <template v-if="action == '5'">
          <information/>
        </template>
        <template v-if="action == '6'">
          <modify/>
        </template>
        <template v-if="action == '7'">
          <modpassword/>
        </template>
        <template v-if="action == '3-3'">
          <Witcontribute :wait="wait" @change="costPlannedAmountChange"/>
        </template>
    </Hander>
    
  </div>
</template>

<script>
import Hander from '../components/user/hander.vue'
import invite from '../components/user/invite.vue'
import arrears from '../components/user/arrears.vue'
import audit from '../components/user/audit.vue'
import proofread from '../components/user/proofread.vue'
import publish from '../components/user/publish.vue'
import reviewed from '../components/user/reviewed.vue'
import contribute from '../components/user/contribute.vue'
import detailss from '../components/user/detailss.vue'
import information from '../components/user/my/information.vue'
import modify from '../components/user/my/modify.vue'
import modpassword from '../components/user/my/modpassword.vue'
import Witcontribute from '../components/user/within/Witcontribute.vue'
import andcontribute from '../components/user/audit/andcontribute.vue'
export default {
    name:'toone',
    data(){
      return{
        action:'1',
        wait:{},
        audit:{},
        row:[],
      }
    },
    components:{
        Hander,
        contribute,
        reviewed,
        publish,
        proofread,
        audit,
        arrears,
        invite,
        detailss,
        information,
        modify,
        modpassword,
        Witcontribute,
        andcontribute,
    },
    methods:{
      async totfive(val){
        this.action=val.action
        this.audit = val
      },
      async tothreetwo(value){
        this.action =value.val,
        this.wait = value
      },  
      async costPlannedAmountChange(value) {
        this.action = value
      },
      async tofour(value){
        console.log(value);
        this.row = value
        this.action = value.action
      },
    },
    comments:{
      
    }
}
</script>

<style scoped>
  .box{
    height: 100%;
  }
</style>