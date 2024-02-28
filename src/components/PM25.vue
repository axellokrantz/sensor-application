<template>
  <div>
    <canvas id="myChart"></canvas> 
    <!-- <p>Most Recent Measurement: {{ firebaseData }}</p> -->
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
    const firebaseData = ref(null);
    let myChart = null; // Variable to hold the chart instance
    let chartData = []; // Array to hold the chart data
    let chartLabels = []; // Array to hold the chart labels

    // Initialize Firebase Realtime Database using the exported app instance
    const db = getDatabase(firebaseApp);

    // Get reference to the data in the database
    const dataRef = dbRef(db, 'pm25');

    // Function to update the chart
    const updateChart = (value) => {
      const now = new Date();
      const timeLabel = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

      chartData.push(value);
      chartLabels.push(timeLabel);

      // Limit the data arrays to the last 20 entries
      if (chartData.length > 20) {
        chartData.shift();
        chartLabels.shift();
      }

      myChart.data.labels = chartLabels;
      myChart.data.datasets[0].data = chartData;
      myChart.update();
    };

    // Listen for changes to the data in the database
    onMounted(() => {
  let intervalId = null;

  onValue(dataRef, (snapshot) => {
    firebaseData.value = snapshot.val();

    // Clear the previous interval
    if (intervalId) {
      clearInterval(intervalId);
    }

    // Set a new interval
    intervalId = setInterval(() => {
      updateChart(firebaseData.value);
    }, 5000); // 5000 milliseconds = 5 seconds
  });

  // Initialize the chart
  const ctx = document.getElementById('myChart');
  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartLabels,
      datasets: [{
        label: 'Particle Matter',
        data: chartData,
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
            text: 'Particle Matter 2.5'
          }
        }
      }
    }
  });
});

    return {
      firebaseData
    };
  }
};
</script>
