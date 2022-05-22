import { MESSAGE_TYPE, DURATION_DEFAULT } from './constant'
import CustomMessage from './custom-message.vue'
import { createApp, ref, watch } from 'vue'

const messageArr = ref([])

const Message = (options = { type: MESSAGE_TYPE.INFO }) => {
  const app = createApp(CustomMessage, options)
  showMessage(app, options)
}

Object.values(MESSAGE_TYPE).forEach((type) => {
  Message[type] = (options) => {
    options.type = type
    return Message(options)
  }
})

function showMessage(app, options) {
  const fragment = document.createDocumentFragment()
  // 组件实例
  const vm = app.mount(fragment)
  messageArr.value.push(vm)
  document.body.appendChild(fragment)
  setTop(vm)
  watch(messageArr, () => setTop(vm))
  vm.setVisible(true)
  hideMessage(app, vm, options.duration)
}

function hideMessage(app, vm, duration) {
  vm.timer = setTimeout(async () => {
    await vm.setVisible(false)
    app.unmount()
    messageArr.value = messageArr.value.filter((item) => item !== vm)
    clearTimeout(vm.timer)
    vm.timer = null
  }, duration || DURATION_DEFAULT)
}

function setTop(vm) {
  const { setTop, height, margin } = vm
  const currentIndex = messageArr.value.findIndex((item) => item === vm)
  setTop(currentIndex * height + (currentIndex + 1) * margin)
}

export { MESSAGE_TYPE as types }

export default Message
