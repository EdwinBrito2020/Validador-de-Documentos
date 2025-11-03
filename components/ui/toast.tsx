'use client'
import React from 'react'

export function useToast() {
  const [messages, setMessages] = React.useState<{ id: number, text: string }[]>([])
  const push = (text: string) => {
    const id = Date.now() + Math.random()
    setMessages(m => [...m, { id, text }])
    setTimeout(() => setMessages(m => m.filter(x => x.id != id)), 3000)
  }
  const Toasts = () => (
    <div className="fixed bottom-4 right-4 space-y-2">
      {messages.map(m => (
        <div key={m.id} className="bg-slate-900 text-white text-sm px-3 py-2 rounded shadow">{m.text}</div>
      ))}
    </div>
  )
  return { push, Toasts }
}
