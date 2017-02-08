
import Vue from 'vue';
import App from './App.vue';
import Index from './index/Index.vue';
import Kitchen from './kitchen/Kitchen.vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Index },
  { path: '/kitchen', component: Kitchen}
];

const router = new VueRouter({
  routes
});

const app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
});