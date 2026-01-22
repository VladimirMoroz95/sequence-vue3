<template>
  <div class="home">
    <div class="room-panel">
      <h4>Room ID: {{ roomId }}</h4>
    </div>
    <div class="game-board">
      <img class="card"
           alt={{card.name.slice(1)}}
           @click="clickCart(card.name)"
           src="/cards/overlay.png"
           :style="{background: `url(/cards/${card.name.slice(1)}.png) no-repeat center center`, backgroundSize: 'contain'}"
           v-for="card in boardGameCards"
           :key="`${card.name}`"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>

import { computed } from 'vue'
import { useGameStore } from '@/stores/game'


const gameStore = useGameStore()
const roomId = computed(() => gameStore.roomId)
const boardGameCards = gameStore.board

function clickCart (card: any) {
  console.log("CARD", card )
}

</script>

<style lang="scss" scoped>
.home-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.room-panel {
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
}
.card {
  width: 10%;
  box-sizing: border-box;
  padding: 0.25rem 0.25rem;
  cursor: pointer;
}
.game-board {
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  margin-top:-10%;
  margin-left: 28%;
  margin-right: 28%;
  resize: both;
  rotate: -90deg;
}

</style>
