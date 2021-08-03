<template>
  <v-container>
      <v-row v-if="!update">
          <v-col v-for="(sensorData, i) in sensorDataBlob" :key="i" md='3'>
            <sensor-component @commandDevice='commandDevice' :sensorData='sensorData'></sensor-component>
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
        this.connectWS()        
    },    
    methods: {
        getDeviceStatus: async function(){
            this.update = true
            const response = await axios.get(`${config.DeviceAddress}/status`)
            this.sensorDataBlob = response.data
            this.update = false
        },
        connectWS: function(){
            const socket = io(config.MANAGER_SERVER_ADDRESS)
            socket.on('connect', ()=>console.log('웹소켓 연결됨'))
            
            WS_TOPICS.forEach(topic=>{
                socket.on(topic, updateData=>{
                    updateData = JSON.parse(updateData)
                    console.log(topic, updateData)
                   
                    this.update = true
                    const index = this.sensorDataBlob.findIndex(sensorData => sensorData.deviceId === updateData.deviceId)
                    if(index){
                        const capabilitiy = updateData.capability
                        const attribute = updateData.attribute
                        this.sensorDataBlob[index][capabilitiy][attribute].value = updateData.value    
                    }
                    this.update = false
                    })
            })
            socket.on('disconnect', ()=>{console.log('웹소켓 연결끊김')})    
            this.socket = socket
        },
        commandDevice: function(topic, data){
         console.log(topic, data)
            this.socket.emit(topic, data)
        }
    },
    data: function(){
        return {
            update: false,
            socket: null,
            sensorDataBlob: {}
        }
    }
}
</script>

<style>

</style>