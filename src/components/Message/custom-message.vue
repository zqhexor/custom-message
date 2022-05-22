<template>
  <transition name="custom-message-fade">
    <div v-show="visible" :class="['custom-message', type]" :style="{ top: `${top}px` }">{{ message }}</div>
  </transition>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import { MESSAGE_TYPE, DURATION_DEFAULT } from './constant.js'

defineProps({
  message: {
    type: String
  },
  type: {
    type: String,
    default: MESSAGE_TYPE.INFO,
    validator: (value) => Object.values(MESSAGE_TYPE).includes(value)
  },
  duration: {
    type: Number,
    default: DURATION_DEFAULT
  }
})

let timer = null
const state = reactive({
  visible: false,
  top: 0
})

const { visible, top } = toRefs(state)

const setVisible = (isVisible) => {
  return new Promise((resolve) => {
    state.visible = isVisible
    timer = setTimeout(() => {
      resolve('')
      clearTimeout(timer)
      timer = null
    }, 300)
  })
}

const setTop = (top) => {
  state.top = top
  return top
}

defineExpose({
  setVisible,
  setTop,
  height: 44,
  margin: 20
})
</script>

<style lang="scss" scoped>
.custom-message {
  padding: 8px 16px;
  max-width: 50%;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 3px;
  font-size: 14px;
  line-height: 28px;
  transition: top 0.3s ease-out;

  &.success {
    color: $color-success;
    background-color: $color-success-2;
  }
  &.warning {
    color: $color-warning;
    background-color: $color-warning-2;
  }
  &.info {
    color: $color-info;
    background-color: $color-info-2;
  }
  &.error {
    color: $color-error;
    background-color: $color-error-2;
  }
}

.custom-message-fade-enter-active {
  transition: all 0.3s ease-in;
}
.custom-message-fade-leave-active {
  transition: all 0.3s ease-out;
}

.custom-message-fade-enter-from,
.custom-message-fade-leave-to {
  transform: translate(-50%, -20px);
  opacity: 0;
}
</style>
