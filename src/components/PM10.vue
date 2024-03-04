<template>
  <div class="PM10">
    <canvas id="myChartPM10"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
import { firebaseApp } from '@/main.js';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

export default {
  setup() {
    const firebaseDataPM10 = ref(null);
    const firebaseDataPM10_2 = ref(null);
    let myChartPM10 = null;
    let chartDataPM10 = [];
    let chartDataPM10_2 = [];
    let chartLabels = [];

    const { emit } = getCurrentInstance();
    const db = getDatabase(firebaseApp);
    const dataRefPM10 = dbRef(db, 'pm10_1');
    const dataRefPM10_2 = dbRef(db, 'pm10_2');

    const updateChart = (valuePM10, valuePM10_2) => {
      const now = new Date();
      const timeLabel = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

      chartDataPM10.push(valuePM10);
      chartDataPM10_2.push(valuePM10_2);
      chartLabels.push(timeLabel);

      if (chartDataPM10.length > 9) {
        chartDataPM10.shift();
        chartDataPM10_2.shift();
        chartLabels.shift();
      }

      myChartPM10.data.labels = chartLabels;
      myChartPM10.data.datasets[0].data = chartDataPM10;
      myChartPM10.data.datasets[1].data = chartDataPM10_2;
      myChartPM10.update();

      if (valuePM10 >= 150) {
        const timestamp = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        emit('warning-change', { type: 'PM 10', timestamp, sensor: '1' });
      }

      if(valuePM10_2 >= 150){
        const timestamp = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        emit('warning-change', { type: 'PM 10', timestamp, sensor: '2' });
      }

    };

    onMounted(() => {
      let intervalId = null;

      onValue(dataRefPM10, (snapshot) => {
        firebaseDataPM10.value = snapshot.val();

        onValue(dataRefPM10_2, (snapshot) => {
          firebaseDataPM10_2.value = snapshot.val();

          if (intervalId) {
            clearInterval(intervalId);
          }

          intervalId = setInterval(() => {
            updateChart(firebaseDataPM10.value, firebaseDataPM10_2.value);
          }, 5000);
        });
      });

      const ctxPM10 = document.getElementById('myChartPM10');
      myChartPM10 = new Chart(ctxPM10, {
        type: 'line',
        data: {
          labels: chartLabels,
          datasets: [{
            label: 'Particle Matter 10',
            data: chartDataPM10,
            fill: false,
            borderColor: 'rgb(0, 0, 0)',
            borderWidth: 1,
            tension: 0.1
          },
          {
            label: 'Particle Matter 10_2',
            data: chartDataPM10_2,
            fill: false,
            borderColor: 'rgb(255, 0, 0)',
            borderWidth: 1,
            tension: 0.1
          }]
        },
        options: {
          scales: {
            x: {
              grid: {
                color: 'rgba(100, 100, 100, 100)',
                tickWidth: 0,
              },
              ticks: {
                display: true,
                font: {
                  size: 10,
                  family: 'Arial',
                },
                color: 'blue'
              },
              title: {
                display: true,
                text: 'Time',
                font: {
                  size: 12,
                  family: 'Arial',
                },
                color: 'blue'
              }
            },
            y: {
              min: 0,
              grid: {
                color: 'rgba(100, 100, 100, 100)',
                tickWidth: 1,
              },
              ticks: {
                display: true,
                font: {
                  size: 10,
                  family: 'Helvetica',
                },
                color: 'blue'
              },
              title: {
                display: true,
                text: 'Particle Matter 10 µg / m³',
                font: {
                  size: 12,
                  family: 'Arial',
                },
                color: 'blue'
              }
            },
          }
        }
      });
    });

    return {
      firebaseDataPM10,
      firebaseDataPM10_2
    };
  }
};
</script>

  
<style>
  @media (max-width: 768px) {
    .PM10 {
      width: 100%;
      height: 140%; 
    }
  }

  /* For desktop screens */
  @media (min-width: 769px) {
    .PM10 {
      margin: 25px;
      width: 35%;
      height: 150%;
    }
  }
</style>