import { reactive } from 'vue'
import { io } from 'socket.io-client'

// TODO move to models folder and remove any
interface socketState {
  connected: boolean
  createGameEvents: any
}

export const state: socketState = reactive({
  connected: false,
  createGameEvents: []
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
