<template>
  <v-card>
    <v-toolbar color="black" dark flat>
      <v-toolbar-title>테스트 페이지</v-toolbar-title>

      <v-spacer></v-spacer>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab v-for="topic in topics" :key="topic">
            {{ topic }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="topic in topics" :key="topic">
        <v-card flat>
          <v-card-text><pre>{{data[tab]}}</pre></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {
  props: ['topics', 'sensorData'],
  created: function(){
    //   console.log(this.datas)
  },
  watch: {
    tab: function () {
    //   console.log(this.tab);
    },
    sensorData: function(){
        this.data = this.sensorData
        console.log(this.sensorData[this.tab])
    },
  },
  data() {
    return {
      tab: null,
      data: ["web", "shopping", "videos", "images", "news"]
    };
  },
};
</script>