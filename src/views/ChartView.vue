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
        <button class="update" @click="updateData(value.label)"></button>
      <button class="delete" @click="deleteData(value.label)"></button>
      </div>
    </div>
    <button @click="updateChartData">Добавить сектор</button>
    </div>
    <Transition name="fade">
    <div class="alert-container" v-if="alertVisible">
      <div class="alert-content">
        <h2>{{ alertHeader }}</h2>
        <label for="label">
          Наименование
        <input id="label" v-model="newLabel" />
        </label>
        <label for="data">
          Значение
        <input id="data" v-model="newData" />
        </label>
        <ChromePicker v-model="color" />
        <button @click="addData">{{ dynamicBtnText }}</button>
        <button @click="alertVisible = !alertVisible">Отмена</button>
      </div>
    </div>
    </Transition>
    <div>
      <PieChart :dataPoints="dynamicData" />
    </div>
  </div>
</template>


<script setup>
import PieChart from '@/components/PieChart.vue';
import { ref } from 'vue';
import { ChromePicker } from 'vue-color';

const alertVisible = ref(false)
const newLabel = ref('')
const newData = ref(0)
const activeUpdate = ref(false)
const targetIndex = ref(0)
const color = defineModel({
  default: '#68CCCA'
});
const alertHeader = ref('')
const dynamicBtnText = ref('')

const dynamicData = ref([
  { label: 'Сектор 1', data: 10, color: '#4BC0C0' },
  { label: 'Сектор 2', data: 20, color: '#FF6384' },
  { label: 'Сектор 3', data: 15, color: '#FFCD56' },
]);

const updateChartData = () => {
  alertVisible.value = true
  alertHeader.value = 'Добавление сектора'
  dynamicBtnText.value = 'Добавить сектор'
};

const addData = () => {
  if (activeUpdate.value === true) {
    const newEntry = {label: newLabel.value, data: newData.value, color: color.value }
    submitUpdate(targetIndex.value, newEntry)
    alertVisible.value = false
  } else {
    dynamicData.value.push({label: newLabel.value, data: newData.value, color: color.value })
    alertVisible.value = false
  }
}

const updateData = (label) => {
  updateIndex(label)
  if (targetIndex.value !== -1) {
    activeUpdate.value = true
    alertVisible.value = true
    dynamicBtnText.value = 'Сохранить редакцию'
    const targetElement = dynamicData.value[targetIndex.value]
    alertHeader.value = "Редакция " + targetElement.label
    newLabel.value = targetElement.label
    newData.value = targetElement.data
    color.value = targetElement.color
  }
}
const updateIndex = (label) => {
   targetIndex.value = dynamicData.value.findIndex(value => value.label === label)
}
const submitUpdate = (index, newEntry) => {
  dynamicData.value[index] = newEntry
}
const deleteData = (label) => {
  updateIndex(label)
  dynamicData.value.splice(targetIndex.value, 1)
}
</script>

<style scoped>
button {
  background-color: #1B84FF;
  color: white;
  width: 100%;
  padding: 0.5rem 1rem;
}
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
.update {
  width: 1rem;
  height: 1rem;
  background-image: url(../assets/edit.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  border: none;
  border-radius: 0;
  padding: 0;
  background-color: transparent;
  margin-right: 1rem;
}
.delete {
  width: 1rem;
  height: 1rem;
  background-image: url(../assets/delete.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  border: none;
  border-radius: 0;
  padding: 0;
  background-color: transparent;
}
.grid-container {
  align-items: start;
}
.alert-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000080;
}
.alert-content {
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 10px;
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