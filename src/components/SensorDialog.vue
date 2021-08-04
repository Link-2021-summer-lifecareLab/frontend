<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          상세정보
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ getLabel }}
        </v-card-title>
        <v-list>
          <v-list-item-group color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-title>{{ item.value }}{{ item.unit }}</v-list-item-title>
              </v-list-item-content> 
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-divider></v-divider>

        <v-color-picker
          v-if="this.sensorData.categories === 'Light'"
          dot-size="33"
          hide-canvas

            hide-inputs
          show-swatches
          swatches-max-height="202"
          v-model="color"
        >
        </v-color-picker>

        <v-flex xs12
        v-if="this.sensorData.categories === 'Light'"
        class="mt-10">
          <v-slider
            v-model="ex3.val"
            :label="ex3.label"
            :thumb-color="ex3.color"
            :thumb-size="24"
            thumb-label="always"
            @click="lightChange()"
          ></v-slider>
        </v-flex>

        <v-flex xs12
        v-if="this.sensorData.categories === 'Light'"
        >
          <v-slider
          v-model="ex1.val"
          :color="ex1.color"
          :label="ex1.label"
          :track-color="ex2.color"
          :max="max"
          :min="min"
          @click="ctChange()"
        ></v-slider>
        </v-flex>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false" outlined>
            닫기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import capabiltiesList from "../scripts/capabilities.json";
import doorSchema from '../schema/door.json'
import lightSchema from '../schema/bulb.json'
import motionSchema from '../schema/motion.json'
import airSchema from '../schema/air.json'
import plugSchema from '../schema/plug.json'

export default {
  props: ["sensorData"],
  created: function () {
    //console.log(this.sensorData.categories)
    this.makeItems();
  },
  computed: {
    getLabel: function () {
      return this.sensorData.label;
    },
    getText: function (item) {
      return `${item.value}${item.unit}`;
    },
  },
  watch: {
    //  ex3: {
    //    handler: function(){
    //      console.log(this.ex3.val)
    //    },
    //    deep: true
    //  },
    color: {
      handler: function(){
        this.colorChange()
        // console.log(this.color)
      }
    },
    // ex1: {
    //   handler: function(){
    //     console.log(this.ex1.val)
    //   },
    //   deep: true
    // },
    sensorData: {
      handler: function () {
        this.items = []
        this.makeItems()
      },
      deep: true,
    },
  },
  methods: {
    colorChange: function(){
      const topic = this.sensorData.categories === 'Light' ? `bulb/change` : 'plug/change'
      const color = this.color.hue / 360 * 100
      const data = {
          deviceId: this.sensorData.deviceId,
          capability: 'colorControl',
          command: "setHue",
          arguments: [color],
          component: "main"
      }
    this.$emit('commandDevice', topic, data)
    },
    lightChange: function(){
      const topic = this.sensorData.categories === 'Light' ? `bulb/change` : 'plug/change'
      const data = {
          deviceId: this.sensorData.deviceId,
          capability: 'switchLevel',
          command: "setLevel",
          arguments: [this.ex3.val],
          component: "main"
      }
    this.$emit('commandDevice', topic, data)

    },
    ctChange: function(){
      const topic = this.sensorData.categories === 'Light' ? `bulb/change` : 'plug/change'
      const data = {
          deviceId: this.sensorData.deviceId,
          capability: 'colorTemperature',
          command: "setColorTemperature",
          arguments: [this.ex1.val],
          component: "main"
      }
     //console.log(topic, data)
    this.$emit('commandDevice', topic, data)

    },
    makeItems: function () {
      const keys = Object.keys(this.sensorData);
      keys.forEach((key) => {
        const find = capabiltiesList.find(
          (capability) => capability.id === key
        );      
        if (find) {
          let attribute = Object.keys(this.sensorData[key])[0]
          let name = attribute
          if(this.sensorData.categories === 'MultiFunctionalSensor'){
            
            if(Object.keys(doorSchema).includes(attribute)){
                name = doorSchema[attribute]
            }
          }
          if(this.sensorData.categories === 'Light'){
            
            if(Object.keys(lightSchema).includes(attribute)){
                name = lightSchema[attribute]
            }
          }
          if(this.sensorData.categories === 'MotionSensor'){
            
            if(Object.keys(motionSchema).includes(attribute)){
                name = motionSchema[attribute]
            }
          }
          if(this.sensorData.categories === 'SmartPlug'){
            
            if(Object.keys(plugSchema).includes(attribute)){
                name = plugSchema[attribute]
            }
          }
          if(this.sensorData.categories === 'AirQualityDetector'){
            
            if(Object.keys(airSchema).includes(attribute)){
                name = airSchema[attribute]
            }
          }
          if (attribute) {
            this.items.push({
              name: name,
              value: this.sensorData[key][attribute].value,
              unit: this.sensorData[key][attribute].unit,
              timestamp: this.sensorData[key][attribute].timestamp,
            });
          }
        }
      });
    },
  },
  data: function () {
    return {
      update: false,
      dialog: false,
      selectedItem: 1,
      items: [],
      ex1: { label: '색 온도', val: 25, color: 'orange darken-3' },
      ex2: { color: 'black lighten-3' },
      ex3: { label: '밝기', val: 50, color: 'primary' },
      color: null,
      min: 1,
      max: 30000,
    };
  },
};
</script>

<style>
</style>