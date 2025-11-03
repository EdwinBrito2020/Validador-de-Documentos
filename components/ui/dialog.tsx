import * as React from 'react'
export function Dialog({ open, children }: { open: boolean, children: React.ReactNode }) { return open ? <div className="fixed inset-0 bg-black/30 grid place-items-center p-4"><div className="bg-white rounded shadow p-4 w-full max-w-lg">{children}</div></div> : null }
export function DialogHeader({ children }: { children: React.ReactNode }) { return <div className="mb-2 font-semibold">{children}</div> }
export function DialogFooter({ children }: { children: React.ReactNode }) { return <div className="mt-4 flex justify-end gap-2">{children}</div> }
