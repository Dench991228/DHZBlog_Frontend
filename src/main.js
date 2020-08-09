// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import 'mavon-editor/dist/css/index.css'
import mavonEditor from 'mavon-editor'
import store from "./store";
import {Message} from "element-ui";
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api';
/* eslint-disable no-new */
Vue.use(ElementUI);
Vue.use(mavonEditor);
Vue.use(Message);
new Vue({
  el: '#app',
  router,
  store,
  components: { App},
  template: '<App/>'
  
})