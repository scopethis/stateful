import Vue from 'vue';
import App from './main.vue';
Vue.config.productionTip = false

new Vue({ render: createElement => createElement(App) }).$mount('#app');