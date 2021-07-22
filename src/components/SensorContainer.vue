<template>
  <v-container>
      <v-row>
          <v-col v-for="(sensorData, i) in sensorDataBlob" :key="i" md='3'>
            <sensor-component :sensorData='sensorData'></sensor-component>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import {io} from 'socket.io-client'
import SensorComponent from './SensorComponent.vue'

export default {
    components: {
        'sensor-component': SensorComponent
    },
    props: ['address'],
    created: function(){
        this.connectWS()
    },    
    methods: {
        connectWS: function(){
            const socket = io(this.address)
            socket.on('connect', ()=>console.log('웹소켓 연결됨'))
            socket.on('test', (data)=>{
                this.sensorDataBlob = data
            })
        },
    },
    data: function(){
        return {
            power: 'off',
            sensorDataBlob: []
        }
    }
}
</script>

<style>

</style>