<template>
  <h1 id="headline">IK1332 Project: IoT for Air Quality Monitoring</h1>
  <p id="sub-heading2">Group 10 at KTH: <u>Axel Lokrantz</u>, <u>Axel Lystam</u>, <u>Isak Wilkens</u>, <u>Björn Formgren</u></p>
  <div class="container">
    <PM25 @warning-change="updateWarning"></PM25>
    <PM10 @warning-change="updateWarning"></PM10>
  </div>

  

  <p class="warning">{{ warning.message }}</p>
  <p class="warning warning2">{{ warning2.message }}</p>



  <p id="sub-heading">This project incorporates an air quality sensor programmed in RIOT,
    embedded within a sensor network operating on RPL. Utilizing MQTT-SN with a broker
    and an intermediate client, data is updated to Firebase. This data is directly
    linked to this website, enabling real-time display of the PM measurements.</p>
  </template>

<script>
import PM25 from './components/PM25.vue'
import PM10 from './components/PM10.vue'

export default {
  name: 'App',
  components: {
    PM25,
    PM10
  },
  data() {
    return {
      warning: {
        type: null,
        message: "Air Quality Warning Sensor 1: None"
      },
      warning2: {
        type: null,
        message: "Air Quality Warning Sensor 2: None"
      }
    }
  },
  methods: {
    updateWarning({ type, timestamp, sensor }) { // Modify method to accept an object
      if(sensor == '1'){
        this.warning.type = type; // Set PM type
        this.warning.message = `Air Quality Warning Sensor 2: (${type}): ${timestamp} ⚠️`; // Update message
      }
      else{
        this.warning2.type = type; 
        this.warning2.message = `Air Quality Warning Sensor 1: (${type}) ${timestamp} ⚠️`; // Update message
      }

    }
  }
}
</script>

<style>

.container {
  display: flex;
  justify-content: center; 
  align-items: center; 
}

.warning{
  font-family: Helvetica, Arial, sans-serif;
  font-size: 13px;
  font-weight: regular;
  color: #000000;
  text-align: center;
  max-width: 40%; 
  margin-left: auto;
  margin-right: auto; 
}

.warning2{
  color: #ff0000
  
}

#sub-heading2 {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 13px;
  font-weight: regular;
  color: #000000;
  text-align: center;
  margin-bottom: 40px; 
  max-width: 40%; 
  margin-left: auto;
  margin-right: auto; 
}

#sub-heading {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 13px;
  font-weight: bold;
  color: #0025f8;
  text-align: center;
  margin-bottom: 40px;
  max-width: 40%; 
  margin-left: auto; 
  margin-right: auto; 
  line-height: 1.4;
}

#headline {
  font-family: Helvetica;
  color: #0025f8;
  margin-bottom: 21px;
  font-size: 22px;
  text-align: center;
  margin-bottom: -5px;
}

/* Media query for screens with width less than or equal to 768px (typical tablet and mobile screens) */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  #sub-heading {
    font-size: 12px; /* Reduce font size for smaller screens */
    max-width: 90%; /* Adjust maximum width for smaller screens */
  }
  #sub-heading2 {
    font-size: 12px; /* Reduce font size for smaller screens */
    max-width: 90%; /* Adjust maximum width for smaller screens */
  }
}

/* For desktop screens */
@media (min-width: 769px) {
  .container {
    flex-direction: row;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 70px;
}
</style>
