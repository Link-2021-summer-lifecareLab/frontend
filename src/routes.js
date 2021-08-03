import Vue from 'vue';
import VueRouter from "vue-router";

import Foo from './components/Foo.vue'
import Bar from './components/Bar.vue'

Vue.use(VueRouter);

const routes = [
    {path: '/', name: 'main', component: Foo},
    {path: '/chart', name: 'chart', component: Bar},
]

const router = new VueRouter({
    routes
})

export default router;