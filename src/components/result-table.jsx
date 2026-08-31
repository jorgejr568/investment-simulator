import { formatMoney, formatPercent } from '@/lib/format'

export function ResultTable({ rows }) {
  return (
    <div className="overflow-hidden rounded-[1.4rem] border bg-card">
      <div
        role="region"
        aria-label="Tabela de evolução do investimento"
        tabIndex="0"
        className="max-h-[560px] overflow-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <table className="w-full min-w-[720px] text-sm">
          <caption className="sr-only">Valores aplicados, rentabilidade e saldo acumulado por mês</caption>
          <thead className="sticky top-0 z-10 bg-card shadow-[0_1px_0_var(--color-border)]">
            <tr>
              <th scope="col" className="px-5 py-4 text-left text-xs font-semibold text-muted-foreground">Mês</th>
              <th scope="col" className="px-5 py-4 text-right text-xs font-semibold text-muted-foreground">Valor aplicado</th>
              <th scope="col" className="px-5 py-4 text-right text-xs font-semibold text-muted-foreground">Rentabilidade</th>
              <th scope="col" className="px-5 py-4 text-right text-xs font-semibold text-muted-foreground">Saldo acumulado</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.month} className="border-t transition-colors hover:bg-muted/55">
                <th scope="row" className="px-5 py-3 text-left font-mono text-xs font-medium text-muted-foreground">{row.month}</th>
                <td className="px-5 py-3 text-right font-mono text-xs tabular-nums">{formatMoney(row.contributionAmount)}</td>
                <td className="px-5 py-3 text-right font-mono text-xs tabular-nums text-muted-foreground">{formatPercent(row.profitabilityPerMonth)}</td>
                <td className="px-5 py-3 text-right font-mono text-xs font-medium tabular-nums">{formatMoney(row.accumulated)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
