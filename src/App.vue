<template>
  <h1 id="headline">IK1332 Project: IoT for Air Quality Monitoring</h1>
  <p id="sub-heading2">Group 10 at KTH: <u>Axel Lokrantz</u>, <u>Axel Lystam</u>, <u>Isak Wilkens</u>, <u>Björn Formgren</u></p>
  <div class="container">
    <PM25 @warning-change="updateWarning"></PM25>
    <PM10 @warning-change="updateWarning"></PM10>
  </div>

  <p id="warning">{{ warning.message }}</p>

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
        message: "Air Quality Warning: None"
      }
    }
  },
  methods: {
    updateWarning({ type, timestamp }) { // Modify method to accept an object
      this.warning.type = type; // Set PM type
      this.warning.message = `Air Quality Warning (${type}): ${timestamp}⚠️`; // Update message
    }
  }
}
</script>

<style>

.container {
  display: flex;
  justify-content: center; /* Center the components horizontally */
  align-items: center; /* Center the components vertically */
}

#warning{
  font-family: Helvetica, Arial, sans-serif;
  font-size: 13px;
  font-weight: regular;
  color: #ff0000; /* Dark gray color */
  text-align: center;
  max-width: 40%; /* Limiting maximum width */
  margin-left: auto; /* Centering the sub-heading */
  margin-right: auto; /* Centering the sub-heading */
}

#sub-heading2 {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 13px;
  font-weight: regular;
  color: #000000; /* Dark gray color */
  text-align: center;
  margin-bottom: 40px; /* Space between headline and sub-heading */
  max-width: 40%; /* Limiting maximum width */
  margin-left: auto; /* Centering the sub-heading */
  margin-right: auto; /* Centering the sub-heading */
}

#sub-heading {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 13px;
  font-weight: bold;
  color: #0025f8; /* Dark gray color */
  text-align: center;
  margin-bottom: 40px; /* Space between headline and sub-heading */
  max-width: 40%; /* Limiting maximum width */
  margin-left: auto; /* Centering the sub-heading */
  margin-right: auto; /* Centering the sub-heading */
  line-height: 1.4;
}

#headline {
  font-family: Helvetica;
  color: #0025f8;
  margin-bottom: 21px; /* Corrected the syntax, remove the space between 20 and px */
  font-size: 22px;
  text-align: center; /* Center the headline */
  margin-bottom: -5px;
}

/* Media query for screens with width less than or equal to 768px (typical tablet and mobile screens) */
@media (max-width: 768px) {
  .container {
    flex-direction: column; /* Stack components vertically */
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
    flex-direction: row; /* Display components side by side */
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
