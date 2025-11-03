import * as React from 'react'
export function Table({ children }: { children: React.ReactNode }) { return <table className="w-full text-sm">{children}</table> }
export function THead({ children }: { children: React.ReactNode }) { return <thead className="bg-slate-50 text-left">{children}</thead> }
export function TBody({ children }: { children: React.ReactNode }) { return <tbody className="divide-y">{children}</tbody> }
export function TH({ children }: { children: React.ReactNode }) { return <th className="p-2 font-medium text-slate-700">{children}</th> }
export function TD({ children, className }: { children: React.ReactNode; className?: string }) { return <td className={`p-2 ${className || ''}`}>{children}</td> }
