<template>
  <div class="home">
    <div class="user-name">
      <p>Your nickname:</p>
      <input v-model="userName" />

      <transition name="fade">
        <div v-show="isShowSaveButton" class="save-icon" @click.stop="saveNickname">
          <save-icon color="#0B61A4" />
        </div>
      </transition>
    </div>

    <create-room-form v-if="!roomId" :userName="userName" />

    <div v-else class="room-panel">
      <h2>Room ID: {{ roomId }}</h2>
      <button class="success-button" @click="startGame" >Start game</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import CreateRoomForm from '@/components/CreateRoomForm.vue'
import SaveIcon from '@/components/icons/SaveIcon.vue'
import { useGameStore } from '@/stores/game'
import router from "@/router";

const gameStore = useGameStore()
const userName = ref(localStorage.getItem('userName') ||
  `Player${Math.floor(Math.random() * 100)}`)
const isShowSaveButton = ref(false)
const roomId = computed(() => gameStore.roomId)

function saveNickname () {
  isShowSaveButton.value = false
  localStorage.setItem('userName', userName.value)
}

function startGame () {
  router.push('/game')
  console.log('start game')
}

</script>

<style lang="scss" scoped>
.home-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-name {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;
  height: 40px;
  width: 300px;

  p {
    white-space: nowrap
  }

  input {
    font-size: 14px;
    font-weight: 500;
    color: $primaryColor;
  }
}

.save-icon {
  cursor: pointer
}

.success-button {
  margin: 15px 0
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
