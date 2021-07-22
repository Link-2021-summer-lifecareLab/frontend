<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="address"
            label="웹소켓 주소"
            placeholder="http://210.107.206.176:3002"
            required
          ></v-text-field>
        </v-col>
        <v-col cols='12' md='4' class='pt-6'>
            <v-btn color='blue' @click="connectWS">connect</v-btn>
        </v-col>
      </v-row>   
    </v-container>
    
</template>

<script>
export default {
    data: function(){
        return {
         address: null,   
        }
    },
    methods: {
        connectWS: function(){    
            console.log('클릭')
            // this.$emit('showCards', null)
            this.$emit('showCards', this.address)
        },
    }
}
</script>

<style>

</style>