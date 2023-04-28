import { defineStore } from 'pinia'
import { ref } from 'vue'
import { GameState } from '@/models/game'

export const useGameStore = defineStore('game', () => {

  const board = ref([])
  const cardDeck = ref([])
  const userId = ref()
  const deadCards = ref([])
  const discardCards = ref([])
  const roomId = ref()
  const numCardsPerPerson = ref()
  const numPlayers = ref()
  const numSequences = ref()
  const numSequencesForWin = ref()
  const numTeams = ref()
  const players = ref()
  const teams = ref()

  function setRoomId (id: string): void {
    roomId.value = id
  }

  function parseGameState (gameState: GameState): void {
    board.value = gameState.board
    cardDeck.value = gameState.cardDeck
    userId.value = gameState.currentPlayer
    deadCards.value = gameState.deadCards
    discardCards.value = gameState.discardCards
    roomId.value = gameState.gameId
    numCardsPerPerson.value = gameState.numCardsPerPerson
    numPlayers.value = gameState.numPlayers
    numSequences.value = gameState.numSequences
    numSequencesForWin.value = gameState.numSequencesForWin
    numTeams.value = gameState.numTeams
    teams.value = gameState.teams
    players.value = gameState.players


  }

  function setUserId (id: number): void {
    userId.value = id
  }

  return {
    board,
    cardDeck,
    userId,
    deadCards,
    discardCards,
    roomId,
    numCardsPerPerson,
    numPlayers,
    numSequences,
    numSequencesForWin,
    numTeams,
    teams,
    players,
    setRoomId,
    parseGameState,
    setUserId,
  }
})
