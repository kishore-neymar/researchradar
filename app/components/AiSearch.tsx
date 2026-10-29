'use client'

import { Search, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

export function AiSearch({ query, onQueryChange }: { query: string; onQueryChange: (value: string) => void }) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

  useEffect(() => {
    if (query.trim().length < 2) { setSuggestions([]); setOpen(false); return }
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`${apiUrl}/api/ai/autocomplete`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query }),
        })
        if (!response.ok) return
        const data = await response.json()
        setSuggestions(data.suggestions || [])
        setOpen(true)
      } catch { setSuggestions([]) }
    }, 300)
    return () => window.clearTimeout(timer)
  }, [query, apiUrl])

  return (
    <div className="relative w-[310px]">
      <Search className="absolute left-3 top-2.5 text-slate-400" size={17} />
      <input value={query} onChange={(event) => onQueryChange(event.target.value)} onFocus={() => suggestions.length > 0 && setOpen(true)} placeholder="Search opportunities, topics..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-sm outline-none focus:border-blue-400" />
      <Sparkles className="absolute right-3 top-2.5 text-blue-500" size={17} />
      {open && suggestions.length > 0 && (
        <div className="absolute right-0 top-full z-40 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">AI suggestions</div>
          {suggestions.map((suggestion) => (
            <button key={suggestion} type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => { onQueryChange(suggestion); setOpen(false) }} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-blue-50">
              <Sparkles size={13} className="text-blue-500" /> {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
