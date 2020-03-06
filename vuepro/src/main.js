import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://127.0.0.1:3000';
axios.defaults.withCredentials = true;

Vue.prototype.$axios = axios;
Vue.use(ViewUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
