<template>
  <svg :width="size" :height="size" viewBox="0 0 100 100">
    <!-- Background Circle -->
    <circle
      cx="50"
      cy="50"
      r="45"
      fill="none"
      stroke="#eee"
      stroke-width="5"
      transform="rotate(130 50 50)"
      :stroke-dasharray="circumference"
      stroke-linecap="round"
    />
    <!-- Progress Circle -->
    <circle
      class="progress-circle"
      cx="50"
      cy="50"
      r="45"
      fill="none"
      :stroke="strokeColor"
      stroke-width="5"
      stroke-linecap="round"
      :transform="dynamicTransform"
      :stroke-dasharray="transfromingCircumference"
      stroke-dashoffset="0"
    />
     <!-- Fading circle for warning display -->
     <Transition name="fade">
     <circle
     v-if="state === 'warning'"
      cx="50"
      cy="50"
      r="10"
      fill="#FFA500"
    />
    </Transition>
    <!-- Dynamic text that changes content and color -->
     <Transition name="fade">
    <text
    :key="dynamicTextColor"
    class="fading-element"
      x="50"
      y="52"
      text-anchor="middle"
      dominant-baseline="middle"
      :font-size="size / 10"
      :fill="dynamicTextColor"
    >
      {{ dynamicText }}
    </text>
    </Transition>
    
    
  </svg>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue';
// define props
const props = defineProps({
  percentage: {
    type: Number,
    default: 0,
    validator: (val:number) => val >= 0 && val <= 100,
  },
  size: {
    type: Number,
    default: 200,
  },
  state: {
    type: String,
    default: 'in-progress'
  },
  dashboard: {
    type: Boolean,
    default: false
  }
});
// define variables
const { percentage, state } = toRefs(props)
const currentState = ref(props.state)
const radius = 45;
// set line fill based on selected view
const circumference = computed(() => {
  if (props.dashboard === false) {
    return 2 * Math.PI * radius
  } else {
    return '220, 70'
  }
});
// calculate and return line fill based on percentage prop
const transfromingCircumference =  computed(() => {
  if (props.dashboard === false && typeof circumference.value === 'number') {
    let filled = 0 + (props.percentage / 100) * circumference.value
    let unfilled = circumference.value -  (props.percentage / 100) *circumference.value
    return `${filled}, ${unfilled}`
  } else {
    let filled = 0 + (props.percentage / 100) * 220
    let unfilled = 290 -  (props.percentage / 100) *220
    return `${filled}, ${unfilled}`
  }
})
// rotate for proper animation start depending on selected view
const dynamicTransform = computed(() => {
  if (props.dashboard === false) {
    return "rotate(-90 50 50)"
  } else return "rotate(130 50 50)"
})
// declare dynamic text variables
const dynamicText = ref('')
const dynamicTextColor = ref('')
// change stroke color depending on percentage and status
const strokeColor = computed(() => {
    if (currentState.value === 'in-progress') {
      dynamicText.value = percentage.value + ' %'
      const red = Math.round(255 - (percentage.value * 2.55));
      const blue = Math.round(percentage.value * 2.55);
      dynamicTextColor.value = '#000'
      return `rgb(${red}, 50, ${blue})`
    } else if (currentState.value === 'warning') {
      dynamicText.value = '!'
      dynamicTextColor.value = '#FFF'
        return '#FFA500'
    } else if (currentState.value === 'finished') {
      dynamicText.value = '✓'
      dynamicTextColor.value = '#2AFEB7'
        return '#2AFEB7'
    } else if (currentState.value === 'error') {
      dynamicText.value = 'X'
      dynamicTextColor.value = '#FA2A55'
        return '#FA2A55'
    }
})
// watch percentage and state to trigger changes
watch([() => props.percentage, () => props.state], 
(newValues, oldValues) => {
    if (newValues[1] === 'in-progress' && newValues[0] < 100) {
        currentState.value = 'in-progress'
    } else if (newValues[1] === 'warning') {
        currentState.value = 'warning'
    } else if (newValues[1] === 'error') {
        currentState.value = 'error'
    } else if (newValues[0] === 100 || newValues[1] === 'finished') {
        currentState.value = 'finished'
    }
})

</script>

<style scoped>
.progress-circle {
  /* Add smooth transition for the animation */
  transition: stroke-dashoffset 0.2s linear, stroke 0.3s linear, stroke-dasharray 0.2s linear;
}
</style>
