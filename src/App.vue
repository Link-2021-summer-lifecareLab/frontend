<template>
  <v-app>
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