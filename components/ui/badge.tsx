export function Badge({ children, color = 'slate' }: { children: React.ReactNode, color?: 'green'|'red'|'yellow'|'slate'|'blue' }) {
  const classes: Record<string, string> = {
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    slate: 'bg-slate-100 text-slate-700',
    blue: 'bg-blue-100 text-blue-700'
  }
  return <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${classes[color]}`}>{children}</span>
}
