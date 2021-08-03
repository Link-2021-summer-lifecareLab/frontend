<template>
  <v-card
    height="100%"
    class="mx-auto"
  >
    <v-navigation-drawer permanent>
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  export default {
    methods:{

    },
    data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', to:'/' },
          { title: 'Chart', icon: 'mdi-chart-bar', to:'/chart' },
        ],
        right: null,
      }
    },
  }
</script>

<style>

</style>