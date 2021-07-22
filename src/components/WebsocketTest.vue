<template>
  <v-container>
    <v-row style="width: 100%">
      <v-col>
        <v-text-field
          v-model="address"
          label="웹소켓 주소"
          placeholder="http://210.107.206.176:3002"
          required
        ></v-text-field>
      </v-col>
      <v-col class="pt-6">
        <v-btn color="blue" @click="connectWS">connect</v-btn>
      </v-col>
      <v-col>
        <v-text-field
          v-model="newTopic"
          label="Event(토픽)"
          placeholder="bulb/sensor_data"
          required
        ></v-text-field>
      </v-col>
      <v-col class="pt-6">
        <v-btn color="blue" @click="addTopic">add</v-btn>
      </v-col>
      <v-col>
        <v-list flat outlined>
          <v-list-item-group v-model="selectedTopic" color="primary">
            <v-list-item v-for="(topic, i) in topics" :key="i">
              <v-list-item-content>
                <v-list-item-title v-text="topic"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>

    <h2>{{ status }}</h2>
    <pre v-if="!update">{{sensorDataBlob[topics[selectedTopic]]}}</pre>
  </v-container>
</template>

<script>
import { io } from "socket.io-client";

export default {
  created: function () {
    this.connectWS();
  },
  computed: {
      showData: function(){
        const index = this.topics[this.selectedTopic]
        return this.sensorDataBlob[index]
      }
  },
  methods: {
    updateTopic: function(){
        return this.topics
    },
    updateData: function(){
      return this.sensorDataBlob  
    },
    connectWS: function () {
      if (this.socket != null) {
        this.socket.close();
        this.socket = null;
        this.status = "웹소켓 연결끊김";
      }

      this.socket = io(this.address);
      this.socket.on("connect", () => {
        this.status = "웹소켓 연결됨";
      });

      this.socket.on("disconnect", () => {
        this.status = "웹소켓 연결끊김";
      });
      this.topics.forEach((topic) => {
          this.socket.on(topic, data=>{
              this.update = true
              this.topics.forEach(topicA=>{
                  if(topicA=== topic){
                    this.sensorDataBlob[topic] = data
                  }
              })
              this.update = false
          })
      });
    },
    addTopic: function(){
        this.topics.push(this.newTopic)
    }
  },
  data: function () {
    return {
     update: false,
      address: null,
      newTopic: '',
      status: "웹소켓 연결되지 않음",
      sensorDataBlob: {},
      socket: null,
      selectedTopic: 1,
      topics: [
        "airmonitor/sensor_status",
        "bulb/sensor_status",
        "plug/sensor_status",
        "door/sensor_status",
        "motion/sensor_status",
      ],
    };
  },
};
</script>

