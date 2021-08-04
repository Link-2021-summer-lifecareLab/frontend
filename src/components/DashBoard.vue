<template>
    <v-app>
        
        <v-app-bar app color="primary" dark>
            <v-app-bar-nav-icon @click='drawer = !drawer'></v-app-bar-nav-icon>
            <h2>라이프케어랩 모니터링</h2>
        </v-app-bar>
    
        <v-navigation-drawer app v-if="drawer">
            <navigation-drawer-content></navigation-drawer-content>
        </v-navigation-drawer>
        
      
      
        <!-- <sensor-container>[Link인턴]IoT 프로젝트</sensor-container> -->
        <router-view></router-view>
      
    </v-app>
</template>

<script>
// import SensorContainer from './SensorContainer.vue';
import NavigationDrawer from './common/Navigation.vue'

export default {
    components: {
        // 'sensor-container': SensorContainer
        'navigation-drawer-content': NavigationDrawer
    },
    data: function(){
        return {
            drawer: true
        }
    }
}
</script>

<style>

</style>