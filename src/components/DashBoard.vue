<template>
  <v-container>
      <sensor-container></sensor-container>
  </v-container>
</template>

<script>
import SensorContainer from './SensorContainer.vue';

export default {
    components: {
        'sensor-container': SensorContainer
    },
}
</script>

<style>

</style>