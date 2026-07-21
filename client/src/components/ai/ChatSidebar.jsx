function formatChatDate(dateValue) {
  if (!dateValue) {
    return ''
  }

  const date = new Date(dateValue)
  const now = new Date()

  const isToday =
    date.toDateString() === now.toDateString()

  if (isToday) {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
  }).format(date)
}

function ChatSidebar({
  isOpen,
  chats,
  selectedChatId,
  isLoading,
  isCreating,
  deletingChatId,
  onClose,
  onCreateChat,
  onSelectChat,
  onDeleteChat,
}) {
  async function handleDeleteClick(event, chat) {
    event.stopPropagation()

    const shouldDelete = window.confirm(
      `Delete "${chat.title}"? This conversation cannot be recovered.`,
    )

    if (!shouldDelete) {
      return
    }

    await onDeleteChat(chat._id)
  }

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close conversation sidebar"
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-black/70 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-[70] flex w-[300px] flex-col border-r border-slate-800 bg-slate-950 transition-transform duration-300 lg:static lg:z-auto lg:w-80 lg:translate-x-0 ${
          isOpen
            ? 'translate-x-0'
            : '-translate-x-full'
        }`}
      >
        <header className="border-b border-slate-800 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                DevFlow AI
              </p>

              <h2 className="mt-1 text-lg font-bold text-white">
                Conversations
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close conversation sidebar"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
            >
              ✕
            </button>
          </div>

          <button
            type="button"
            onClick={onCreateChat}
            disabled={isCreating}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span
              aria-hidden="true"
              className="text-lg"
            >
              +
            </span>

            {isCreating
              ? 'Creating...'
              : 'New Conversation'}
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-3">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="h-20 animate-pulse rounded-xl border border-slate-800 bg-slate-900"
                />
              ))}
            </div>
          ) : chats.length === 0 ? (
            <div className="flex h-full min-h-72 flex-col items-center justify-center px-5 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-2xl text-blue-300">
                ✦
              </div>

              <h3 className="mt-5 font-bold text-white">
                No conversations
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Create your first conversation to start using
                the AI developer assistant.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {chats.map((chat) => {
                const isSelected =
                  selectedChatId === chat._id

                const isDeleting =
                  deletingChatId === chat._id

                return (
                  <div
                    key={chat._id}
                    className={`group relative rounded-xl border transition ${
                      isSelected
                        ? 'border-blue-500/40 bg-blue-500/10'
                        : 'border-transparent hover:border-slate-800 hover:bg-slate-900'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        onSelectChat(chat._id)
                      }
                      className="w-full px-4 py-3 pr-12 text-left"
                    >
                      <p
                        className={`truncate text-sm font-semibold ${
                          isSelected
                            ? 'text-blue-200'
                            : 'text-slate-200'
                        }`}
                      >
                        {chat.title || 'New Chat'}
                      </p>

                      <div className="mt-2 flex items-center justify-between gap-3">
                        <p className="truncate text-xs text-slate-500">
                          {chat.messages?.length || 0}{' '}
                          {(chat.messages?.length || 0) === 1
                            ? 'message'
                            : 'messages'}
                        </p>

                        <p className="shrink-0 text-xs text-slate-600">
                          {formatChatDate(
                            chat.updatedAt ||
                              chat.createdAt,
                          )}
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={(event) =>
                        handleDeleteClick(event, chat)
                      }
                      disabled={isDeleting}
                      aria-label={`Delete ${chat.title}`}
                      className="absolute right-2 top-2 rounded-lg p-2 text-slate-600 opacity-100 transition hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40 lg:opacity-0 lg:group-hover:opacity-100"
                    >
                      {isDeleting ? '…' : '×'}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <footer className="border-t border-slate-800 p-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs font-semibold text-slate-300">
              AI Developer Tools
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Generate, explain, debug, improve and document
              code using Gemini.
            </p>
          </div>
        </footer>
      </aside>
    </>
  )
}

export default ChatSidebar