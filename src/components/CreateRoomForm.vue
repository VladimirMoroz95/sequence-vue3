<template>
  <div class="room-wrapper">
    <h2 class="room-name">New room</h2>

    <h3 class="room-type-label">Select number of players:</h3>
    <div class="room-type-wrapper">
      <span
        v-for="type in roomTypes"
        :key="type"
        :class="['room-type', { 'room-type__active': activeType === type }]"
        @click="activeType = type"
      >
        {{ type }}
      </span>
    </div>

    <button class="success-button" @click="createRoom">Create room</button>
    <button class="error-button" @click="$emit('close')">Cancel room</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { socket } from '@/socket'

const props = defineProps({
  userName: {
    type: String,
    default: 'UserName'
  }
})

const roomTypes = ref(['2', '3', '4', '6', '8'])
const activeType = ref('2')

function createRoom () {
  console.log('emit crate game')
  socket.emit('createGame', {
    name: props.userName,
    numPlayers: Number(activeType.value),
    team: 'RED'
  }, (data: any) => {
    console.log('data', data)
  })
}

</script>

<style lang="scss" scoped>
.room-wrapper {
  display: flex;
  flex-direction: column;
  border: 1px solid $primaryColor;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 25px;
  height: auto;
  width: 300px;
  box-sizing: border-box;
}

.room-name {
  font-size: 22px;
  font-weight: 700;
  color: $primaryColor;
  cursor: pointer;
  margin-bottom: 8px;
}

.room-type-label {
  font-size: 16px;
  margin-bottom: 12px;
}

.room-type-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 12px;
}

.room-type {
  font-size: 26px;
  font-weight: 800;
  color: $shadowColor;
  cursor: pointer;

  &__active {
    color: $primaryColor
  }

  &:hover {
    color: $primaryColor
  }
}

.success-button {
  margin: 15px 0
}
</style>
