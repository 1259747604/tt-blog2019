import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
// import ViewUI from 'view-design';
// import 'view-design/dist/styles/iview.css';
import './plugin/iview';

import moment from 'moment';

/* froala配置 */
/* import './plugin/froala';
import VueFroala from 'vue-froala-wysiwyg';
Vue.use(VueFroala); */

/* vue-quill-editor */
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import * as Quill from 'quill';
import resizeImage from 'quill-image-resize-module';
Quill.register('modules/resizeImage ', resizeImage);
Vue.use(VueQuillEditor);

Vue.config.productionTip = false;
// axios.defaults.baseURL = 'http://127.0.0.1:3000';
axios.defaults.baseURL = 'http://49.235.150.225:3003';
axios.defaults.withCredentials = true;

Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment;

// import VueHighlightJS from 'vue-highlightjs';
import 'highlight.js/styles/atelier-cave-light.css';
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
