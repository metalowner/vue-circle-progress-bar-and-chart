<template>
  <Transition name="fade">
    <div class="alert-container" v-if="alertVisible">
      <div class="alert-content">
        <h2>{{ alertHeader }}</h2>
        <label for="label">
          Наименование
        <input type="text" id="label" v-model="newLabel" />
        </label>
        <label for="data">
          Значение
        <input type="number" id="data" v-model="newData" />
        </label>
        <ChromePicker v-model="color" />
        <BaseButton @clicked="submit" :btnText="dynamicBtnText" />
        <BaseButton @clicked="emit('close')" btnText="Отмена" />
      </div>
    </div>
    </Transition>
</template>

<script setup>
import { ChromePicker } from 'vue-color';
import BaseButton from './BaseButton.vue';
import { ref } from 'vue';

const props = defineProps({
    alertHeader: {
        type: String,
        default: ''
    },
    alertVisible: {
        type: Boolean,
        default: false
    },
    dynamicBtnText: {
        type: String,
        default: ''
    },
    oldLabel: {
        type: String,
        default: ''
    },
    oldData: {
        type: Number,
        default: 0
    },
    oldColor: {
        type: String,
        default: '#555555'
    }
})
const newLabel = ref(props.oldLabel)
const newData = ref(props.oldData)
const color = ref(props.oldColor)


const emit = defineEmits([
    'submit', 'close'
])

const submit = () => {
    emit('submit', {label: newLabel.value, data: newData.value, color: color.value})
}
</script>

<style scoped>
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
  z-index: 999;
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
</style>