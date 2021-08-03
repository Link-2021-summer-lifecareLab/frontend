<template>
<v-container>
  <v-card
    class="mx-auto"
    max-width="250"
    outlined
    rounded="xl"
  >
    <v-row>
        <v-col class= "ma-3" cols='8' md='6'>
            <v-icon x-large :color='getColor' class='pl-3 pt-3'>{{getIcon}}</v-icon>
        </v-col>
        <v-col cols='8' md='1'>
            <v-btn
                    v-if="sensorData.switch"
                    @click="powerChange()"
                    class="ma-2"
                    outlined
                    fab
            >
            <v-icon>mdi-power-standby</v-icon>
            </v-btn>
        </v-col>
    </v-row>
    
    <v-list-item three-line>
      <v-list-item-content>
        <div class="mb-4">
        </div>
        <v-list-item-title class="text-h6 mb-1">
          {{getLabel}}
        </v-list-item-title>
        <v-list-item-subtitle>
            
        </v-list-item-subtitle>
      </v-list-item-content>

    </v-list-item>
  </v-card>

 <v-container v-if="!update">
  <sensor-dialog :sensorData='sensorData' @commandDevice='commandDevice'></sensor-dialog>
 </v-container>
</v-container>
</template>

<script>
import SensorDialog from './SensorDialog.vue'
// import axios from 'axios'

// const authedAxios = axios.create({
//     headers: {
//         Authorization: `Bearer 8ec50db1-58bd-419c-852d-0936a03bfce4`
//     }
// })

export default {
    components: {
        'sensor-dialog': SensorDialog
    },
    props: ['sensorData'],
    watch: {
        sensorData: {
            handler: function(){
                this.update = true
                // console.log(this.sensorData)
                this.update = false
            },
            deep: true
        }
    },
    created: function(){
        
    },
    computed: {
      getColor: function(){
        const category = this.sensorData.categories
        if(category === 'Light' || category === 'SmartPlug'){
           if(this.sensorData.switch.switch.value === 'off') return 'red' 
        }
        return 'green'
      },
      getLabel: function(){
        return this.sensorData.label
      },
      getIcon: function(){
          switch(this.sensorData.categories){
              case 'Light': return 'fas fa-lightbulb'
              case 'SmartPlug': return 'fas fa-plug'
              case 'AirQualityDetector': return 'fas fa-snowflake'
              case 'MultiFunctionalSensor': return 'fas fa-door-open'
              case 'MotionSensor': return 'fas fa-angle-double-right'
              default: return ''
          }
      }
    },
    methods: {
        powerChange: function(){
            const topic = this.sensorData.categories === 'Light' ? `bulb/change` : 'plug/change'
            const data = {
                deviceId: this.sensorData.deviceId,
                capability: 'switch',
                command: this.sensorData.switch.switch.value === 'off' ? 'on' : 'off',
                arguments: [],
                component: "main"
            }
            console.log(topic, data)
            this.$emit('commandDevice', topic, data)
        },
        commandDevice: function(topic, data){
          this.$emit('commandDevice', topic, data)
        }
    },
    data: function(){
        return {
            update: false
        }
    }
}
</script>
<style>
  .v-btn--fab.v-size--default {
    height: 48px;
    width: 48px;
}
</style>