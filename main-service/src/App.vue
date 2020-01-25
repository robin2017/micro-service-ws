<template>
  <div id="app">
   <hello-main></hello-main>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HelloMain from './components/Main.vue'
export default {
  name: 'app',
  components: {
    HelloMain
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
