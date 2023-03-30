import { reactive } from 'vue'
import { io } from 'socket.io-client'

// TODO move to models folder and remove any
interface socketState {
  connected: boolean
  createGameEvents: any
  roomId: string
  gameState: any
  playerId: number
}

export const state: socketState = reactive({
  connected: false,
  createGameEvents: [],
  roomId: '',
  gameState: [],
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
  state.createGameEvents.push(args)
})

socket.on('createGameSuccess', (roomId: string) => {
  state.roomId = roomId
  socket.on(`${state.roomId}`, (args: any) => {
    if(args.state){
      state.gameState = args.state
      console.log('GAME STATE: ', state.gameState)
    }else if (args.joinGameSuccess) {
      state.playerId = args.playerId
    }
  })
})
socket.on('joinGameFailure', (error: any) => {
  console.log("Error Join game: ", error)
})



