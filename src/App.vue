<template>
  <button @click="Message.success({ message: 'this is a SUCCESS message' })">成功</button>
  <button @click="Message.warning({ message: 'this is a WARNING message' })">警告</button>
  <button @click="Message({ type: 'info', message: 'this is a INFO message' })">消息</button>
  <button @click="Message({ type: 'error', message: 'this is a ERROR message' })">错误</button>
</template>

<script setup>
import Message from './components/Message/index.js'
</script>

<style></style>
