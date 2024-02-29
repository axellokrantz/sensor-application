<template>
  <div class="PM25">
    <canvas id="myChartPM25"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue'; // Import getCurrentInstance
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
import { firebaseApp } from '@/main.js'; // Adjust the path based on your project structure
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale); // Register the necessary Chart.js components

export default {
  setup() {
    const firebaseData = ref(null);
    let myChartPM25 = null; // Variable to hold the chart instance
    let chartData = []; // Array to hold the chart data
    let chartLabels = []; // Array to hold the chart labels

    const { emit } = getCurrentInstance();

    // Initialize Firebase Realtime Database using the exported app instance
    const db = getDatabase(firebaseApp);

    // Get reference to the data in the database
    const dataRef = dbRef(db, 'pm25');

    // Function to update the chart
    const updateChart = (valuePM25) => {
      const now = new Date();
      const timeLabel = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

      chartData.push(valuePM25);
      chartLabels.push(timeLabel);

      // Limit the data arrays to the last 20 entries
      if (chartData.length > 10) {
        chartData.shift();
        chartLabels.shift();
      }

      myChartPM25.data.labels = chartLabels;
      myChartPM25.data.datasets[0].data = chartData;
      myChartPM25.update();

      if (valuePM25 >= 35) {
          const timestamp = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
          emit('warning-change', { type: 'PM 2.5', timestamp }); // Include PM type
      }

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
  const ctx = document.getElementById('myChartPM25');
  myChartPM25 = new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartLabels,
      datasets: [{
        label: 'Particle Matter',
        data: chartData,
        fill: false,
        borderColor: 'rgb(0, 0, 0)',
        borderWidth: 1, 
        tension: 0.1,
      }]
    },
    options: {
    scales: {
      
      x: {
        grid: {
        color: 'rgba(100, 100, 100, 100)', // Adjust the color of the grid lines
        tickWidth: 0, // Adjust the width of the grid lines
        },
        ticks: {
          display: true,
          font: {
            size: 10, // Adjust the font size here
            family: 'Arial', // Adjust the font family here
          },
          color: 'blue' // Adjust the font color here
        },
        title: {
          display: true,
          text: 'Time',
          font: {
            size: 12, // Adjust the font size here
            family: 'Arial', // Adjust the font family here
          },
          color: 'blue' // Adjust the font color here
        }
      },
      y: {
        grid: {
        color: 'rgba(100, 100, 100, 100)', // Adjust the color of the grid lines
        tickWidth: 1, // Adjust the width of the grid lines
        },
        ticks: {
          display: true,
          font: {
            size: 10, // Adjust the font size here
            family: 'Helvetica', // Adjust the font family here
          },
          color: 'blue' // Adjust the font color here
        },
        title: {
          display: true,
          text: 'Particle Matter 2.5 µg / m³',
          font: {
            size: 12, // Adjust the font size here
            family: 'Arial', // Adjust the font family here
          },
          color: 'blue' // Adjust the font color here
        }
      },
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

<style>
  @media (max-width: 768px) {
    .PM25 {
      width: 100%; /* Adjust the width to fill the container */
      height: 140%; /* Adjust the height as needed */
    }
  }

  /* For desktop screens */
  @media (min-width: 769px) {
    .PM25 {
      margin: 25px;
      width: 35%; /* Adjust the width for desktop */
      height: 150%; /* Adjust the height for desktop */
    }
  }
</style>
