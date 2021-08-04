<template>
    <v-card max-height="300" max-width="1000">
            <v-card-title>{{getLabel}}</v-card-title>
            <canvas id="threeAxisChart"></canvas>
    </v-card>
</template>

<script>
import Chart from 'chart.js'

export default {
    props: ['sensorData'],
    created: function(){
        console.log(this.sensorData)  
        this.makeDataSets()
        this.makeChart()
    },
    watch: {
        sensorData: {
            handler: function(){
                this.makeDataSets()
                this.makeChart()
                this.mountChart()
            },
            deep: true
        }
    },
    computed: {
        getLabel: function(){
            return this.sensorData.label
        }
    },
    methods: {
      makeDataSets: function(){
          const data = this.sensorData.threeAxis.threeAxis.value
          this.datasets[0].pop()
          this.datasets[1].pop()
          this.datasets[2].pop()

          this.datasets[0].unshift(data[0])
          this.datasets[1].unshift(data[1])
          this.datasets[2].unshift(data[2])
          
      },
      makeChart: function(){
          const data = {
            labels: [0,1,2,3,4,5,6,7,8,9],
            datasets: [
                {
                    label: 'x',
                    data: this.datasets[0],
                    borderColor: 'green'
                },
                {
                    label: 'y',
                    data: this.datasets[1],
                    borderColor: 'red'
                },
                {
                    label: 'z',
                    data: this.datasets[2],
                },
            ]
        };
         this.config = {
            type: 'line',
            data: data
        };
      },
    mountChart: function(){
        var ctx = document.getElementById('threeAxisChart').getContext('2d');
        new Chart(ctx, this.config);
        }
    },

    data: function(){
        return {
            datasets: [
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]
            ],
            config: null,
        }
    },
    mounted: function(){
        this.mountChart()
    }   
}
</script>