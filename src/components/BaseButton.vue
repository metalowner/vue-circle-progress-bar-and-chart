<template>
    <button :class="btnStyle" @click="emit('clicked')">
        {{ btnText }}
    </button>
</template>

<script lang="ts" setup>
const props = defineProps({
    btnStyle: {
        type: String,
        default: 'standard'
    },
    btnText: {
        type: String,
        default: ''
    }
})
const emit = defineEmits(['clicked'])
</script>

<style scoped lang="css">
button {
  background-color: var(--primary-color);
  color: white;
  width: 100%;
  border: none;
}
.standard {
    box-shadow: 2px 2px 4px 0 #000;
    border-radius: 10px;
    padding: 0.5rem 1rem;
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
</style>