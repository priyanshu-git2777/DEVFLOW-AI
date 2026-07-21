import {
  useCallback,
  useEffect,
  useState,
} from 'react'
import {
  createChat as createChatRequest,
  deleteChat as deleteChatRequest,
  getChatById,
  getChats,
} from '../services/chatApi'

function getRequestErrorMessage(
  requestError,
  fallbackMessage,
) {
  return (
    requestError.response?.data?.message ||
    requestError.message ||
    fallbackMessage
  )
}

function useChats() {
  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [isLoadingChats, setIsLoadingChats] =
    useState(true)
  const [isLoadingSelectedChat, setIsLoadingSelectedChat] =
    useState(false)
  const [isCreatingChat, setIsCreatingChat] =
    useState(false)
  const [deletingChatId, setDeletingChatId] =
    useState(null)
  const [error, setError] = useState('')

  const loadChats = useCallback(async () => {
    try {
      setIsLoadingChats(true)
      setError('')

      const loadedChats = await getChats()

      setChats(loadedChats)

      setSelectedChat((currentSelectedChat) => {
        if (!currentSelectedChat) {
          return null
        }

        const selectedChatStillExists =
          loadedChats.some(
            (chat) =>
              chat._id === currentSelectedChat._id,
          )

        return selectedChatStillExists
          ? currentSelectedChat
          : null
      })
    } catch (requestError) {
      setError(
        getRequestErrorMessage(
          requestError,
          'Unable to load conversations',
        ),
      )
    } finally {
      setIsLoadingChats(false)
    }
  }, [])

  useEffect(() => {
    loadChats()
  }, [loadChats])

  const selectChat = useCallback(async (chatId) => {
    try {
      setIsLoadingSelectedChat(true)
      setError('')

      const chat = await getChatById(chatId)

      setSelectedChat(chat)

      return chat
    } catch (requestError) {
      setError(
        getRequestErrorMessage(
          requestError,
          'Unable to open this conversation',
        ),
      )

      return null
    } finally {
      setIsLoadingSelectedChat(false)
    }
  }, [])

  const createNewChat = useCallback(
    async (title = 'New Chat') => {
      try {
        setIsCreatingChat(true)
        setError('')

        const newChat = await createChatRequest(title)

        setChats((currentChats) => [
          newChat,
          ...currentChats,
        ])

        setSelectedChat(newChat)

        return newChat
      } catch (requestError) {
        setError(
          getRequestErrorMessage(
            requestError,
            'Unable to create a conversation',
          ),
        )

        return null
      } finally {
        setIsCreatingChat(false)
      }
    },
    [],
  )

  const removeChat = useCallback(
    async (chatId) => {
      try {
        setDeletingChatId(chatId)
        setError('')

        await deleteChatRequest(chatId)

        setChats((currentChats) =>
          currentChats.filter(
            (chat) => chat._id !== chatId,
          ),
        )

        setSelectedChat((currentSelectedChat) =>
          currentSelectedChat?._id === chatId
            ? null
            : currentSelectedChat,
        )

        return true
      } catch (requestError) {
        setError(
          getRequestErrorMessage(
            requestError,
            'Unable to delete the conversation',
          ),
        )

        return false
      } finally {
        setDeletingChatId(null)
      }
    },
    [],
  )

  const clearError = useCallback(() => {
    setError('')
  }, [])

  return {
    chats,
    selectedChat,
    isLoadingChats,
    isLoadingSelectedChat,
    isCreatingChat,
    deletingChatId,
    error,
    loadChats,
    selectChat,
    createNewChat,
    removeChat,
    setSelectedChat,
    clearError,
  }
}

export default useChats