import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tok:'',
    admintok:'',
    userdata:{},
    admindata:{},
    book:[],
  },
  getters: {
  },
  mutations: {
    addadmintok(state,data){
      state.tok=data
    },
    addTok(state,data){
      console.log(data);
      state.tok=data;
    },
    adduser(state,data){
      console.log(data);
      state.userdata=data;
    },
    addadmin(state,data){
      console.log(data);
      state.admindata=data;
    },
    addbook(state,data){
      console.log(data);
      state.book=data;
    },
  },
  actions: {
  },
  modules: {
  }
})
