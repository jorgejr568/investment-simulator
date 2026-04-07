import { EstimateForm } from '@/components/estimate-form'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function Home() {
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Simulador de investimentos</CardTitle>
      </CardHeader>
      <CardContent>
        <EstimateForm />
      </CardContent>
    </Card>
  )
}
