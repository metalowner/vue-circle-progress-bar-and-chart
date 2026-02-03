<template>
  <div>
    <Pie
    :options = "finalOptions"
    :data="chartData"
  />
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { Pie } from 'vue-chartjs'
  // auto import and register graph modules
  import { Chart } from 'chart.js/auto'

// Define props if data is passed from a parent component
const props = defineProps({
  dataPoints: Array, // Expected format: [{ x: ..., y: ... }, ...]
});

const chartData = computed(() => {
  return {
    labels: props.dataPoints.map(point => point.label),
    datasets: [
      {
        label: 'Dynamic Data',
        backgroundColor: props.dataPoints.map(point => point.color),
        data: props.dataPoints.map(point => point.data),
      },
    ],
  };
});

// Define default options
const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Тестовый Граф'
    }
  }
};

// Use computed property to merge default and passed options
const finalOptions = computed(() => ({ ...defaultOptions, ...props.chartOptions }));
</script>

<style>

</style>