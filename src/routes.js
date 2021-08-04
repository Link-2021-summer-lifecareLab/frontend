import Vue from 'vue';
import VueRouter from "vue-router";

import Foo from './components/Foo.vue'
import ChartContainer from './components/chart/ChartContainer.vue'
import SensorContainer from './components/SensorContainer.vue'

Vue.use(VueRouter);

const routes = [
    {path: '/', name: 'sensor', component: SensorContainer},
    {path: '/chart', name: 'chart', component: ChartContainer},
    {path: '/cubejs', name: 'cubejs', component: Foo}
]

const router = new VueRouter({
    routes
})

export default router;