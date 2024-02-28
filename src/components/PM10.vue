<template>
    <div>
      <canvas id="myChartPM10"></canvas> 
      <!-- <p>Most Recent Measurement: {{ firebaseDataPM25 }} {{ firebaseDataPM10 }}</p> -->
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
  import { firebaseApp } from '@/main.js'; // Adjust the path based on your project structure
  import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
  
  Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale); // Register the necessary Chart.js components
  
  export default {
    setup() {
      const firebaseDataPM10 = ref(null);
      let myChartPM10 = null; // Variable to hold the chart instance for PM10
      let chartDataPM10 = []; // Array to hold the chart data for PM10
      let chartLabels = []; // Array to hold the chart labels
  
      // Initialize Firebase Realtime Database using the exported app instance
      const db = getDatabase(firebaseApp);
  
      // Get reference to the data in the database
      const dataRefPM10 = dbRef(db, 'pm10');
  
      // Function to update the chart
      const updateChart = (valuePM10) => {
        const now = new Date();
        const timeLabel = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  
        chartDataPM10.push(valuePM10);
        chartLabels.push(timeLabel);
  
        // Limit the data arrays to the last 20 entries
        if (chartDataPM10.length > 20) {
          chartDataPM10.shift();
          chartLabels.shift();
        }
    
        myChartPM10.data.labels = chartLabels;
        myChartPM10.data.datasets[0].data = chartDataPM10;
        myChartPM10.update();
      };
  
      // Listen for changes to the data in the database
      onMounted(() => {
        let intervalId = null;
  
        onValue(dataRefPM10, (snapshot) => {
          firebaseDataPM10.value = snapshot.val();
  
          // Clear the previous interval
          if (intervalId) {
            clearInterval(intervalId);
          }
  
          // Set a new interval
          intervalId = setInterval(() => {
            updateChart(firebaseDataPM10.value);
          }, 5000); // 5000 milliseconds = 5 seconds
        });
  
        // Initialize the chart for PM10
        const ctxPM10 = document.getElementById('myChartPM10');
        myChartPM10 = new Chart(ctxPM10, {
          type: 'line',
          data: {
            labels: chartLabels,
            datasets: [{
              label: 'Particle Matter 10',
              data: chartDataPM10,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          },
          options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Time'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Particle Matter 10'
                }
              }
            }
          }
        });
      });
  
      return {
        firebaseDataPM10
      };
    }
  };
  </script>
  