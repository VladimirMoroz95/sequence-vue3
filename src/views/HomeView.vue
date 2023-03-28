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

    <create-room-form v-if="isCreateRoomMode" :userName="userName" @close="isCreateRoomMode = false" />

    <button v-else class="create-room-button empty-button" @click="isCreateRoomMode = true">Create room</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CreateRoomForm from '@/components/CreateRoomForm.vue'
import SaveIcon from '@/components/icons/SaveIcon.vue'

const userName = ref(localStorage.getItem('userName') ||
  `Player${Math.floor(Math.random() * 100)}`)
const isShowSaveButton = ref(false)
const isCreateRoomMode = ref(false)

function saveNickname () {
  isShowSaveButton.value = false
  localStorage.setItem('userName', userName.value)
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

.create-room-button {
  width: 300px;
  margin-bottom: 20px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
