<template>
  <h1 class="title">SEQUENCE</h1>
  <router-view/>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { socket } from '@/socket'

onMounted(() => {
  socket.connect()
})

onBeforeUnmount(() => {
  socket.disconnect()
})
</script>

<style lang="scss" scoped>
.title {
  color: $primaryColor;
  margin-bottom: 40px;
}
</style>
