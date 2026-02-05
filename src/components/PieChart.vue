<template>
  <div>
    <Pie
    :options = "finalOptions"
    :data="chartData"
  />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { Pie } from 'vue-chartjs'
  // auto import and register graph modules
  import { Chart as ChartJS, registerables } from 'chart.js/auto';
  // register the chart registerables
  ChartJS.register(...registerables);
// define prop type
interface Point {
  label: string,
  data: number,
  color: string
}
// Define props if data is passed from a parent component
const props = defineProps<{
  dataPoints: Point[],
  chartOptions: any
}>();

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
};

// Use computed property to merge default and passed options
const finalOptions = computed(() => ({ ...defaultOptions, ...props.chartOptions }));
</script>

<style>

</style>