import { reactive } from 'vue'
import { io } from 'socket.io-client'
import { useGameStore } from '@/stores/game'

// TODO move to models folder and remove any
interface socketState {
  connected: boolean
  createGameEvents: any
  playerId: number
}

export const state: socketState = reactive({
  connected: false,
  createGameEvents: [],
  playerId: 0
})

const URL = 'http://localhost:8080'

export const socket = io(URL, {
  autoConnect: true
})

socket.on('connect', () => {
  state.connected = true
})

socket.on('disconnect', () => {
  state.connected = false
})

socket.on('createGame', (...args: any) => {
  console.log('socket create game', ...args)
  state.createGameEvents.push(args)
})

socket.on('createGameSuccess', (roomId: string) => {
  const gameStore = useGameStore()

  gameStore.setRoomId(roomId)
  socket.on(`${gameStore.roomId}`, (args: any) => {
    if (args.state) {
      gameStore.parseGameState((args.state))
    } else if (args.joinGameSuccess) {
      gameStore.setUserId(args.playerId)
    }
  })
})
socket.on('joinGameFailure', (error: any) => {
  console.error('Error Join game: ', error)
})
