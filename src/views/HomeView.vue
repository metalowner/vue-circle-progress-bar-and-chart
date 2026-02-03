<template>
  <div class="grid-container">
    <ProgressBarCircle :state="currentState" :percentage="count" :dashboard="dashboardBool"/>
    <div class="btns-container">
        <BaseButton @clicked="resetCounter" btn-text="Перезагрузить" />
        <BaseButton @clicked="displayWarning" btn-text="Показать Предопреждение" />
        <BaseButton @clicked="displayError" btn-text="Показать Ошибку" />
        <BaseButton @clicked="displayFinished" btn-text="Показать Финал" />
        <BaseButton @clicked="toggleDashboard" btn-text="Переключить Форму" />
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue';
import ProgressBarCircle from '@/components/ProgressBarCircle.vue';
import { onMounted, ref } from 'vue';
const count = ref(0)
const currentState = ref('in-progress')
const dashboardBool = ref(false)
const counter = () => {
    if (count.value <= 99 && (currentState.value != 'warning' || currentState.value != 'error' || currentState.value != 'finished')) {
        count.value++
        setTimeout(counter, 100)
    }
}
const resetCounter = () => {
    currentState.value = 'in-progress'
    count.value = 0
    counter()
}
const displayWarning = () => {
    currentState.value = 'warning'
    count.value = 100
}
const displayError = () => {
    currentState.value = 'error'
    count.value = 100
}
const displayFinished = () => {
    currentState.value = 'finished'
    count.value = 100
}
const toggleDashboard = () => {
    dashboardBool.value = !dashboardBool.value
}
onMounted(() => {
    counter()
})
</script>

<style lang="css" scoped>

</style>