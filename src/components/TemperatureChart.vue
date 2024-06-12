<template>
  <div>
    <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Configurações do gráfico
const chartOptions = ref({
  chart: {
    type: 'line',
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000
      }
    },
    toolbar: {
      show: true,
      offsetX: 0,
      offsetY: 30,

    }
  },
  xaxis: {
    type: 'datetime',
    labels: {
      datetimeUTC: false
    }
  },
  yaxis: {

    title: {
      text: 'Temperatura (°C)'
    }
  },
  tooltip: {
    x: {
      format: 'HH:mm:ss'
    },
    style: {
      fontSize: '12px',
      fontFamily: undefined,
      color: '#000000'
    }
  },
  title: {
    text: 'Temperatura Medida vs Temperatura Desejada'
  },
  colors: ['#007bff', '#ff0000']
});

const series = ref([
  {
    name: 'Temperatura Medida',
    data: []
  },
  {
    name: 'Temperatura Desejada',
    data: []
  }
]);

const updateChart = async () => {
  try {
    const measuredDataResponse = await axios.get('http://localhost:3000/registries');

    let measuredData = measuredDataResponse.data.map(entry => ({
      x: new Date(entry.created_at).getTime(),
      y: parseFloat(entry.temperature.toFixed(2))
    }));

    // Obtenha os últimos 50 registros
    measuredData = measuredData.slice(-60);

    const desiredDataResponse = await axios.get('http://localhost:3000/configs/2');
    const desiredTemperature = desiredDataResponse.data.temperature;

    series.value[0].data = measuredData;
    series.value[1].data = measuredData.map(entry => ({ x: entry.x, y: desiredTemperature }));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  updateChart();
  setInterval(updateChart, 5000); // Atualiza o gráfico a cada 5 segundos
});
</script>

<style>
#chart {
  max-width: 600px;
  margin: auto;
}
</style>
