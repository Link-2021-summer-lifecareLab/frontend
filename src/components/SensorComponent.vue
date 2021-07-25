<template>
<v-container>
  <v-card
    class="mx-auto"
    max-width="250"
    outlined
  >
    <v-row>
        <v-col cols='8' md='7'>
            <v-icon x-large :color='getColor' class='pl-3 pt-3'>{{getIcon}}</v-icon>
        </v-col>
        <v-col cols='8' md='1'>
            <v-btn
                    v-if="sensorData.switch"
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
        <v-list-item-title class="text-h5 mb-1">
          {{getLabel}}
        </v-list-item-title>
        <v-list-item-subtitle>
            
        </v-list-item-subtitle>
      </v-list-item-content>

    </v-list-item>
  </v-card>

  <sensor-dialog :sensorData='sensorData'></sensor-dialog>
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
    created: function(){
        if(this.sensorData.cetegories==="SmartPlug"){
            // console.log(this.sensorData)
            // console.log(SmartPlug)
        }
        
        // this.power = this.sensorData.switch.switch.value
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
        
    },
    data: function(){
        return {
            
        }
    }
}
</script>
