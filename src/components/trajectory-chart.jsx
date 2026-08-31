import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { formatDuration, formatMoney } from '@/lib/format'

function sampleTrajectory(rows, maxPoints = 22) {
  if (!rows.length) return []

  let invested = 0
  const points = rows.map((row) => {
    invested += row.contributionAmount
    return {
      month: row.month,
      accumulated: row.accumulated,
      invested,
      profit: Math.max(0, row.accumulated - invested),
    }
  })
  const interval = Math.max(1, Math.ceil(points.length / maxPoints))

  return points.filter((_, index) => (
    index === 0 ||
    index === points.length - 1 ||
    (index + 1) % interval === 0
  ))
}

export function TrajectoryChart({ rows, className }) {
  const points = useMemo(() => sampleTrajectory(rows), [rows])
  const finalPoint = points.at(-1)

  if (!finalPoint) return null

  const halfwayPoint = points[Math.floor(points.length / 2)]
  const description = [
    `Evolução projetada até ${formatMoney(finalPoint.accumulated)} em ${formatDuration(finalPoint.month)}.`,
    'A parte neutra representa o capital investido e a parte verde representa os rendimentos.',
  ].join(' ')

  return (
    <div className={cn('space-y-3', className)}>
      <div
        role="img"
        aria-label={description}
        className="relative h-60 overflow-hidden rounded-2xl border border-border/80 bg-muted/45 px-4 pb-4 pt-6 sm:h-72 sm:px-6"
      >
        <div aria-hidden="true" className="absolute inset-x-4 top-1/4 border-t border-border/70 sm:inset-x-6" />
        <div aria-hidden="true" className="absolute inset-x-4 top-1/2 border-t border-border/70 sm:inset-x-6" />
        <div aria-hidden="true" className="absolute inset-x-4 top-3/4 border-t border-border/70 sm:inset-x-6" />

        <div aria-hidden="true" className="relative flex h-full items-end gap-1.5 sm:gap-2">
          {points.map((point) => {
            const totalHeight = Math.max(4, (point.accumulated / finalPoint.accumulated) * 100)
            const investedShare = Math.min(100, (point.invested / point.accumulated) * 100)
            const profitShare = 100 - investedShare

            return (
              <div key={point.month} className="flex h-full min-w-0 flex-1 items-end">
                <div
                  className="flex w-full flex-col overflow-hidden rounded-t-[4px]"
                  style={{ height: `${totalHeight}%` }}
                >
                  <span className="block bg-primary" style={{ height: `${profitShare}%` }} />
                  <span className="block bg-chart-invested" style={{ height: `${investedShare}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 font-mono text-[0.68rem] text-muted-foreground sm:text-xs">
        <span>{formatDuration(points[0].month)}</span>
        <span>{formatDuration(halfwayPoint.month)}</span>
        <span>{formatDuration(finalPoint.month)}</span>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-4 rounded-sm bg-chart-invested" />
          Capital investido
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-4 rounded-sm bg-primary" />
          Rendimentos
        </span>
      </div>
    </div>
  )
}
