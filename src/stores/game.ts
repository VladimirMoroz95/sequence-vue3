import { defineStore } from 'pinia'
import { ref } from 'vue'
import { GameState } from '@/models/game';

export const useGameStore = defineStore('game', () => {
  const roomId = ref('')
  const teams = ref()
  const players = ref()
  const gameId = ref()
  const userId = ref()

  function setRoomId (id: string): void {
    roomId.value = id
  }

  function parseGameState (gameState: GameState): void {
    teams.value = gameState.teams
    players.value = gameState.players
    gameId.value = gameState.gameId
    userId.value = gameState.currentPlayer
  }

  function setUserId (id: number): void {
    userId.value = id
  }

  return {
    roomId,
    userId,
    players,
    gameId,
    setRoomId,
    parseGameState,
    setUserId
  }
})
