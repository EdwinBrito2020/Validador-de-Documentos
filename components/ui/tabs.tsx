import * as React from 'react'

interface TabsProps { value: string, onValueChange: (val: string) => void, children: React.ReactNode }
export function Tabs({ value, onValueChange, children }: TabsProps) {
  return <div data-tabs-value={value}>{children}</div>
}
export function TabsList({ children }: { children: React.ReactNode }) { return <div className="flex gap-2 border-b mb-4">{children}</div> }
export function TabsTrigger({ value, current, onClick, children }: { value: string, current: string, onClick: (v: string)=>void, children: React.ReactNode }) {
  const active = current === value
  return <button className={`px-3 py-2 text-sm ${active ? 'border-b-2 border-blue-600 text-blue-700' : 'text-slate-600'}`} onClick={()=>onClick(value)}>{children}</button>
}
export function TabsContent({ value, current, children }: { value: string, current: string, children: React.ReactNode }) {
  return current === value ? <div>{children}</div> : null
}
