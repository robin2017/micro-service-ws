<template>
  <div id="app">
   <show-all></show-all>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HelloMain from './components/Main.vue'
import ShowAll from './components/ShowAll.vue'
export default {
  name: 'app',
  components: {
      ShowAll
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
