import { useTheme } from '@/hooks/use-theme'
import { Moon, Sun } from 'lucide-react'

export function ThemeSwitch() {
  const { dark, setDark } = useTheme()

  return (
    <button
      type="button"
      aria-label={dark ? 'Ativar tema claro' : 'Ativar tema escuro'}
      onClick={() => setDark(!dark)}
      className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-3 text-sm font-semibold text-muted-foreground transition-[background-color,color,border-color,transform] hover:border-primary/40 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
    >
      {dark ? (
        <Sun aria-hidden="true" className="size-4" strokeWidth={1.8} />
      ) : (
        <Moon aria-hidden="true" className="size-4" strokeWidth={1.8} />
      )}
      <span className="hidden sm:inline">{dark ? 'Tema claro' : 'Tema escuro'}</span>
    </button>
  )
}
