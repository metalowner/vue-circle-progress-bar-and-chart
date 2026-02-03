<template>
  <div class="grid-container">
    <div>
    <div class="data-display" v-for="value in dynamicData">
      <div class="dataHeaderBlock">
        <span class="label">{{ value.label }}</span>
        <span class="data">{{ value.data }}%</span>
        <div class="colorIcon" :style="'background-color: '+value.color"></div>
      </div>
      <div class="dataActionBlock">
        <BaseButton btnStyle="update" @clicked="updateData(value.label)" />
        <BaseButton btnStyle="delete" @clicked="deleteData(value.label)" />
      </div>
    </div>
    <BaseButton @clicked="updateChartData" btnText="Добавить сектор" />
    </div>
    <Alert
    :key="alertHeader"
     :alertHeader="alertHeader" 
     :alertVisible="alertVisible"
     :dynamicBtnText="dynamicBtnText"
     :oldColor="newColor"
     :oldData="newData"
     :oldLabel="newLabel"
     @submit="handleSubmit"
     @close="handleClose"
     />
    <div>
      <PieChart :dataPoints="dynamicData" />
    </div>
  </div>
</template>


<script setup>
import Alert from '@/components/Alert.vue';
import BaseButton from '@/components/BaseButton.vue';
import PieChart from '@/components/PieChart.vue';
import { ref } from 'vue';
//  refs
const alertVisible = ref(false)
const newLabel = ref('')
const newData = ref(0)
const newColor = ref('#555')
const activeUpdate = ref(false)
const targetIndex = ref(0)
const alertHeader = ref('')
const dynamicBtnText = ref('')
//  initial data
const dynamicData = ref([
  { label: 'Сектор 1', data: 10, color: '#4BC0C0' },
  { label: 'Сектор 2', data: 20, color: '#FF6384' },
  { label: 'Сектор 3', data: 15, color: '#FFCD56' },
]);
// handle submit emit from child Alert component
const handleSubmit = (object) => {
  newLabel.value = object.label
  newData.value = object.data
  newColor.value = object.color
  if (activeUpdate.value === true) {
    const newEntry = {label: newLabel.value, data: newData.value, color: newColor.value }
    submitUpdate(targetIndex.value, newEntry)
    alertVisible.value = false
    activeUpdate.value = false
  } else {
    dynamicData.value.push({label: newLabel.value, data: newData.value, color: newColor.value })
    alertVisible.value = false
  }
}
// handle close emit from Alert
const handleClose = () => {
  alertVisible.value = false
  activeUpdate.value = false
}
// start adding a new section
const updateChartData = () => {
  alertVisible.value = true
  alertHeader.value = 'Добавление сектора'
  dynamicBtnText.value = 'Добавить сектор'
};
// start editing an existing data field
const updateData = (label) => {
  updateIndex(label)
  if (targetIndex.value !== -1) {
    const targetElement = dynamicData.value[targetIndex.value]
    alertHeader.value = "Редакция " + targetElement.label
    newLabel.value = targetElement.label
    newData.value = targetElement.data
    newColor.value = targetElement.color
    activeUpdate.value = true
    dynamicBtnText.value = 'Сохранить редакцию'
    alertVisible.value = true
  }
}
// set target data index for TargetIndex
const updateIndex = (label) => {
   targetIndex.value = dynamicData.value.findIndex(value => value.label === label)
}
// replace old data field with new data field
const submitUpdate = (index, newEntry) => {
  dynamicData.value[index] = newEntry
}
// remove data field from dynamicData
const deleteData = (label) => {
  updateIndex(label)
  dynamicData.value.splice(targetIndex.value, 1)
}
</script>

<style scoped>
.colorIcon {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}
.data-display {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  background-color: #DBDFE933;
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem 0;
}
.dataHeaderBlock {
  display: flex;
  gap: 1rem;
}
.label {
  width: 7rem;
}
.data {
  border-right: 2px solid #DBDFE9;
  border-left: 2px solid #DBDFE9;
  width: 5rem;
  text-align: center;
}
.grid-container {
  align-items: start;
}
input {
  border: none;
}
label {
  display: flex;
  flex-direction: column;
  color: #99A1B7;
  border: 1px solid #DBDFE9;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-size: 0.7rem;
}
</style>