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
                    class="ma-2"
                    outlined
                    fab
                    @click="changePower"
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
            {{this.power ==='on' ? '켜짐':'꺼짐'}}
        </v-list-item-subtitle>
      </v-list-item-content>

    </v-list-item>
  </v-card>

  <sensor-dialog :sensorData='sensorData'></sensor-dialog>
</v-container>
</template>

<script>
import SensorDialog from './SensorDialog.vue'
import axios from 'axios'

const authedAxios = axios.create({
    headers: {
        Authorization: `Bearer 8ec50db1-58bd-419c-852d-0936a03bfce4`
    }
})

export default {
    components: {
        'sensor-dialog': SensorDialog
    },
    props: ['sensorData'],
    created: function(){
        console.log(this.sensorData)
        this.power = this.sensorData.switch.switch.value
    },
    computed: {
      getColor: function(){
          if(this.power==='on') return 'green'
          else return 'red'
      },
      getLabel: function(){
          return this.sensorData.label
      },
      getIcon: function(){
          switch(this.sensorData.categories[0].name){
              case 'Light':
                  return 'fas fa-lightbulb'
              case 'SmartPlug':
                  return 'fas fa-plug'
              default:
                  return ''
          }
      }
    },
    methods: {
        changePower: async function(){
          this.power = this.power === 'on' ? 'off' : 'on'
          
          const body = {
            "commands": [
                {
                "component": "main",
                "capability": "switch",
                "command": this.power,
                "arguments": []
                }
            ]
          }
          await authedAxios.post(`https://api.smartthings.com/v1/devices/${this.sensorData.deviceId}/commands`, body)
        },
    },
    data: function(){
        return {
            power: 'off',
        }
    }
}
</script>

<style>

</style>