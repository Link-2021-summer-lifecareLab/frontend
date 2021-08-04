<template>
    <v-container v-if="!update">
        <v-row v-for="(sensorData, i) in sensorDataBlob" :key="i">
            <my-chart-card v-if='hasTimeData(sensorData)' :sensorData='sensorData'></my-chart-card>          
      </v-row>
    </v-container>
</template>

<script>
import ChartCard from './ChartComponent.vue'
import {io} from 'socket.io-client'
import config from '../../../config/config'
import axios from 'axios'

export default {
    created: function(){
        
        this.connectWS()
        this.getDeviceStatus()       
        
    },
    computed: {
        
    },
    methods: {
        hasTimeData: function(sensorData){
            // console.log(sensorData)
            if(sensorData.categories=="MultiFunctionalSensor") return true
            else return false
        },
        getDeviceStatus: async function(){
            this.update = true
            const response = await axios.get(`${config.MANAGER_SERVER_ADDRESS}/status`)
            this.sensorDataBlob = response.data
            // console.log(this.sensorDataBlob)
            this.update = false
            
        },
        connectWS: function(){
            const socket = io(config.MANAGER_SERVER_ADDRESS)
            socket.on('connect', ()=>console.log('웹소켓 연결됨'))
            
            config.WS_TOPICS.forEach(topic=>{
                socket.on(topic, updateData=>{
                    // console.log(topic, updateData)
                    // console.log(typeof(updateData))
                    // updateData = JSON.parse(updateData)
                    
                   
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
    },
    beforeDestroy: function(){
        this.socket.close()
        this.socket = null
        console.log('socket 닫습니다')
    },
    components: {
        'my-chart-card': ChartCard
    },
    data: function(){
        return {
            socket: null,
            sensorDataBlob: null,
            update: false,
        }
    }

}
</script>

<style>

</style>