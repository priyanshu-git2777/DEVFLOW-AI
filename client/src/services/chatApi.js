import api from './api'

async function getChats() {
  const response = await api.get('/chats')

  return response.data.chats || []
}

async function getChatById(chatId) {
  const response = await api.get(`/chats/${chatId}`)

  return response.data.chat
}

async function createChat(title = 'New Chat') {
  const response = await api.post('/chats', {
    title,
  })

  return response.data.chat
}

async function deleteChat(chatId) {
  const response = await api.delete(`/chats/${chatId}`)

  return response.data
}

export {
  createChat,
  deleteChat,
  getChatById,
  getChats,
}