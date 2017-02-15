
import Vue from 'vue';
import App from './App.vue';
import Index from './index/Index.vue';
import Kitchen from './kitchen/Kitchen.vue';
import VueRouter from 'vue-router';
import ClientApi from './api/ClientAPI';
let api = new ClientApi('http://localhost:3000');

Vue.use(api);
Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'index', component: Index },
  { path: '/kitchen', name: 'kitchen', component: Kitchen}
];

const router = new VueRouter({
  routes
});

const app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
});