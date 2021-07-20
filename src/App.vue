<template>
  <v-app>
    <v-app-bar app color="primary" dark></v-app-bar>
    <v-main>
      <dashboard></dashboard>
    </v-main>
  </v-app>
</template>

<script>
import DashBoard from './components/DashBoard.vue'

export default {
  name: 'App',
  components: {
    'dashboard': DashBoard
  },
}
</script>