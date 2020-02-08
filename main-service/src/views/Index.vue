<template>
  <div id="app">
    <ul>
      <li v-for="(route,index) in routes"
          :key="index"
          v-show="route.label"
          @click="routeClick(route)">{{route.label}}
      </li>
    </ul>
  </div>
</template>
<script>
  import {routes} from '../router'

  export default {
    data() {
      return {
        routes: routes
      }
    },
    methods: {
      routeClick(route) {
        console.log(route.path);
        this.$router.push(route.path)
      }
    }
  }
</script>
