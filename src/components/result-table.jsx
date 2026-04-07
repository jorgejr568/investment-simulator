import { formatMoney, formatPercent } from '@/lib/format'

export function ResultTable({ rows }) {
  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="max-h-[500px] overflow-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-muted">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Mês</th>
              <th className="px-4 py-3 text-right font-medium">Valor aplicado</th>
              <th className="px-4 py-3 text-right font-medium">Rendimento mensal</th>
              <th className="px-4 py-3 text-right font-medium">Valor acumulado</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.month} className="border-t">
                <td className="px-4 py-2">{row.month}</td>
                <td className="px-4 py-2 text-right">{formatMoney(row.contributionAmount)}</td>
                <td className="px-4 py-2 text-right">{formatPercent(row.profitabilityPerMonth)}</td>
                <td className="px-4 py-2 text-right font-medium">{formatMoney(row.accumulated)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
