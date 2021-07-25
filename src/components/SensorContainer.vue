<template>
  <v-container>
      <v-row v-if="!update">
          <v-col v-for="(sensorData, i) in sensorDataBlob" :key="i" md='3'>
            <sensor-component :sensorData='sensorData'></sensor-component>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import config from '../../config/config.js'
import {io} from 'socket.io-client'
import SensorComponent from './SensorComponent.vue'
import {WS_TOPICS} from '../../config/config'
import axios from 'axios'

export default {
    components: {
        'sensor-component': SensorComponent
    },
    created: function(){
        
        this.getDeviceStatus()
        // this.connectWS()        
    },    
    methods: {
        getDeviceStatus: async function(){
            this.update = true
            const response = await axios.get(`http://localhost:3001/status`)
            this.sensorDataBlob = response.data
            console.log(response.data)
            this.update = false
        },
        connectWS: function(){
            const socket = io(config.MANAGER_SERVER_ADDRESS)
            socket.on('connect', ()=>console.log('웹소켓 연결됨'))
            
            WS_TOPICS.forEach(topic=>{
                socket.on(topic, data=>{
                    // console.log(data)
                    this.update = true
                    this.sensorDataBlob[topic] = data
                    this.update = false
                    })
            })
            socket.on('disconnect', ()=>{console.log('웹소켓 연결끊김')})    
        },
    },
    computed: {
        getData: function(){
            return this.sensorDataBlob[Object.keys(this.sensorDataBlob)]
        }
    },
    data: function(){
        return {
            update: false,
            sensorDataBlob: {}
        }
    }
}
</script>

<style>

</style>