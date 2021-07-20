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
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.text"></v-list-item-title>
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
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
    props: ['sensorData'],
    computed: {
        getLabel: function(){
            return this.sensorData.label
        }
    },
    data: function(){
        return {
            dialog: false,
            selectedItem: 1,
            items: [
                { text: 'Real-Time', icon: 'mdi-clock' },
                { text: 'Audience', icon: 'mdi-account' },
                { text: 'Conversions', icon: 'mdi-flag' },
            ],
        }
    }
}
</script>

<style>

</style>