import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useTheme } from '@/hooks/use-theme'
import { Moon, Sun } from 'lucide-react'

export function ThemeSwitch() {
  const { dark, setDark } = useTheme()

  return (
    <div className="flex items-center gap-2">
      <Sun className="h-4 w-4 text-muted-foreground" />
      <Switch checked={dark} onCheckedChange={setDark} />
      <Moon className="h-4 w-4 text-muted-foreground" />
      <Label className="text-xs text-muted-foreground cursor-pointer" onClick={() => setDark(!dark)}>
        {dark ? 'Modo escuro' : 'Modo claro'}
      </Label>
    </div>
  )
}
