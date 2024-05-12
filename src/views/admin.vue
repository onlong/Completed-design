<template>
    <div class="box">
      
      <Hander  @change="costPlannedAmountChange" >
        <template v-if="action == '1'">
          <allbook></allbook>
        </template>
        <template v-if="action == '2'">
          <first @change="toin" />
        </template>
        <template v-if="action == '3'">
          <second @change="toin" />
        </template>
        <template v-if="action == '4'">
          <third @change="toin" />
        </template>
        <template v-if="action == '5-1'">
          <ffirst @change="toin" />
        </template>
        <template v-if="action == '5-2'">
          <fsecond/>
        </template>
        <template v-if="action == '6-1'">
          <fvfirst  @change = 'costPlannedAmountChange'/>
        </template>
        <template v-if="action == '6-2'">
          <fvsecond/>
        </template>
        <template v-if="action == '7-1'">
          <sfirst />
        </template>
        <template v-if="action == '7-2'">
          <ssecond/>
        </template>
        <template v-if="action == '7-3'">
          <sthird />
        </template>
        <template v-if="action == '8'">
          <one  :row="row" @change="costPlannedAmountChange"/>
        </template>
        <template v-if="action == '9'">
          <tow :row="row" @change="costPlannedAmountChange"/>
        </template>
        <template v-if="action == '10'">
          <three :row="row" @change="costPlannedAmountChange"/>
        </template>
        <template v-if="action == '11'">
          <four :row="row" @change="costPlannedAmountChange"/>
        </template>
        <template v-if="action == '12'">
          <fourth />
        </template>
        <template v-if="action == '13'">
          <fifith />
        </template>
        <template v-if="action == '14'">
          <modmodify />
        </template>
        <template v-if="action == '15'">
          <modpassword />
        </template>
        <template v-if="action == '16'">
          <five :row="row" @change="toin"/>
        </template>

      </Hander>
      
    </div>
  </template>
  
  <script>
  import Hander from '../assets/hander.vue'
  import allbook from '../components/admin/allbook.vue'
  import first from '../components/admin/first.vue'
  import second from '../components/admin/second.vue'
  import third from '../components/admin/third.vue'
  import fourth from '../components/admin/fourth.vue'
  import fifith from '../components/admin/fifith.vue'

  import ffirst from '../components/admin/fourth/ffirst.vue'
  import fsecond from '../components/admin/fourth/fsecond.vue'

  import fvfirst from '../components/admin/fivth/fvfirst.vue'
  import fvsecond from '../components/admin/fivth/fvsecond.vue'

  import sfirst from '../components/admin/sixth/sfist.vue'
  import ssecond from '../components/admin/sixth/ssecond.vue'
  import sthird from '../components/admin/sixth/sthird.vue'

  import one from '../components/admin/in/one.vue';
  import tow from '../components/admin/in/tow.vue';
  import three from '../components/admin/in/three.vue';
  import four from '../components/admin/in/four.vue';
  import five from '../components/admin/in/five.vue';

  import modmodify from '../components/user/my/modify.vue'
  import modpassword from '../components/user/my/modpassword.vue'
 
  export default {
      name:'toone',
      data(){
        return{
          action:'1',
          wait:{},
          audit:{},
          row:{},
        }
      },
      components:{
        modpassword,
        modmodify,
        Hander,
        allbook,
        first,
        second,
        third,
        fourth,
        fifith,
        ffirst,
        fsecond,
        fvfirst,
        fvsecond,
        sfirst,
        ssecond,
        sthird,
        one,
        tow,
        three,
        four,
        five,
      },
      methods:{
        async costPlannedAmountChange(value) {
          this.action = value
        },
        async toin (val){
          this.action = val.action
          this.row = val
        }
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