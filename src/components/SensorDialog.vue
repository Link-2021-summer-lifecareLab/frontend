<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          상세정보
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{getLabel}}
        </v-card-title>

        <v-list>
            <v-list-item-group
                v-model="selectedItem"
                color="primary"
            >
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                >   
                    
                    <v-list-item-content>
                        <v-list-item-title>{{item.name}}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-content>
                        <v-list-item-title>{{item.value}}{{item.unit}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
            outlined
          >
            닫기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import capabiltiesList from '../scripts/capabilities.json'

export default {
    props: ['sensorData'],
    created: function(){
      this.makeItems()
      console.log(this.items)
    },
    computed: {
        getLabel: function(){
            return this.sensorData.label
        },
        getText: function(item){
            return `${item.value}${item.unit}`
        }
    },
    methods: {
        makeItems: function(){
            const keys = Object.keys(this.sensorData)  
            keys.forEach(key=>{
                const find = capabiltiesList.find(capability => capability.id === key)
                if(find) {
                    const attribute = Object.keys(this.sensorData[key])[0]
                    if(attribute){
                        this.items.push({
                        name: attribute,
                        value: this.sensorData[key][attribute].value,
                        unit: this.sensorData[key][attribute].unit,
                        timestamp: this.sensorData[key][attribute].timestamp
                        })
                    }
                }
            })      
        }
    },
    data: function(){
        return {
            dialog: false,
            selectedItem: 1,
            items: [
                // { text: 'Real-Time', icon: 'mdi-clock' },
                // { text: 'Audience', icon: 'mdi-account' },
                // { text: 'Conversions', icon: 'mdi-flag' },
            ],
        }
    }
}
</script>

<style>

</style>