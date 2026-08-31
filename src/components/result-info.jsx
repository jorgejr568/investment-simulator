export function ResultInfo({ label, value, highlight = false }) {
  return (
    <div className="min-w-0 border-t pt-4">
      <dt className="text-xs font-semibold text-muted-foreground">{label}</dt>
      <dd className={`mt-2 break-words font-mono text-lg font-medium tracking-[-0.025em] sm:text-xl ${highlight ? 'text-primary' : 'text-foreground'}`}>
        {value}
      </dd>
    </div>
  )
}
