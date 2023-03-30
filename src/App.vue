<template>
  <div class="main-wrapper">
    <h1 class="title">SEQUENCE</h1>
    <div>
      <router-view/>
    </div>
  </div>
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
.main-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center
}
</style>
