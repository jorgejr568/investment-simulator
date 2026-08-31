import { EstimateForm } from '@/components/estimate-form'
import { EstimatePreview } from '@/components/estimate-preview'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function Home() {
  return (
    <div className="space-y-6">
      <EstimatePreview />
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Simulador de investimentos</CardTitle>
        </CardHeader>
        <CardContent>
          <EstimateForm />
        </CardContent>
      </Card>
    </div>
  )
}
