<template>
  <v-container>
      <!-- <config-form @showCards='showCards'></config-form> -->
      <!-- <sensor-container :address="address" v-if="address" ></sensor-container> -->
      <websocket-test ></websocket-test>
  </v-container>
</template>

<script>
// import Form from './Form.vue'
import WebsocketTest from './WebsocketTest.vue'
// import SensorContainer from './SensorContainer.vue';


export default {
    components: {
        // 'config-form': Form,
        'websocket-test': WebsocketTest
        // 'sensor-container': SensorContainer
    },
    methods: {
        showCards: function(address){
            this.address = address
        }
    },
    data: function(){
        return {
            address: null,
            flag: false
        }
    }
}
</script>

<style>

</style>