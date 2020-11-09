import Vue from 'vue';
import App from './main.vue';
Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})