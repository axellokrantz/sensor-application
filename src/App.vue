<template>
  <h1 id="headline">IK1332 Air Quality Sensor</h1>
  <PM25></PM25>
  <PM10></PM10>
</template>

<script>
import PM25 from './components/PM25.vue'
import PM10 from './components/PM10.vue'

export default {
  name: 'App',
  components: {
    PM25,
    PM10
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#headline{
  font-family: Helvetica;
  color: black;
}

</style>
