<template>
  <div>
    <div v-if="!isCreateRoomMode && !isJoinGameMode" class="room-button-wrap">
      <button class="room-button empty-button" @click="isCreateRoomMode = true">Create room</button>
      <button class="room-button empty-button" @click="isJoinGameMode = true">Join room</button>
    </div>
    <div v-if="isCreateRoomMode" class="room-wrapper">
      <h2 class="room-name">New room</h2>

      <h3 class="type-label">Select number of players:</h3>
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
      <h3 class="type-label">Select team color:</h3>
      <div class="team-wrapper">
        <div
          v-for="type in colorTypes"
          :key="type"
          :class="['team-button', `team-button__color${type}`, { 'team-button__active': activeColor === type }]"
          @click="activeColor = type"
        />
      </div>

      <button class="success-button" @click="createRoom">Create room</button>
      <button class="error-button" @click="isCreateRoomMode = false">Cancel room</button>
    </div>

    <div v-if="isJoinGameMode" class="room-wrapper">
      <h2 class="room-name">Join room</h2>
      <div class="room-id-wrapper">
        <p>Room ID:</p>
        <input v-model="roomId" />
      </div>
      <h3 class="type-label">Select team color:</h3>
      <div class="team-wrapper">
        <div
          v-for="type in colorTypes"
          :key="type"
          :class="['team-button', `team-button__color${type}`, { 'team-button__active': activeColor === type }]"
          @click="activeColor = type"
        />
      </div>
      <button class="success-button" @click="joinRoom">Join room</button>
      <button class="error-button" @click="isJoinGameMode = false">Cancel room</button>
    </div>
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

const isCreateRoomMode = ref(false)
const isJoinGameMode = ref(false)
const roomTypes = ref([2, 3, 4, 6, 8])
const activeType = ref(2)
const roomId = ref()
const colorTypes = ref([1, 2, 3])
const activeColor = ref(1)

function createRoom () {
  console.log('emit crate game')
  socket.emit('createGame', {
    name: props.userName,
    numPlayers: activeType.value,
    team: activeColor.value
  }, (data: any) => {
    console.log('data', data)
  })
}

function joinRoom () {
  console.log('emit join game', props.userName, roomId.value?.toUpperCase(), activeColor.value)
  socket.emit('joinGame',{
    name: props.userName,
    roomId: roomId.value?.toUpperCase(),
    team: activeColor.value
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
.team-button {
  width: 30px;
  height: 30px;
  border: 2px solid #FFFFFF;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.33);
  border-radius: 50%;
  opacity: 0.25;

  &__color1 {
    background-color: #2ecc71;
  }
  &__color2 {
    background-color: #e74c3c;
  }
  &__color3 {
    background-color: #3498db;
  }
  &__active {
    opacity: 1;
  }
}
.room-name {
  font-size: 22px;
  font-weight: 700;
  color: $primaryColor;
  cursor: pointer;
  margin-bottom: 8px;
}

.type-label {
  font-size: 16px;
  margin-bottom: 12px;
}

.room-type-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 12px;
  margin-bottom: 10px;
}

.room-id-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
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
.team-wrapper {
  display: flex;
  justify-content: center;
  gap: 20px
}

.room-button-wrap {
  display: flex;
  flex-direction: column;
}
.success-button {
  margin: 15px 0
}

.room-button {
  width: 300px;
  margin-bottom: 20px;
}

</style>
