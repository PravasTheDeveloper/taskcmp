"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BudgetBreakdown { label: string; amount: number }

export default function ProjectBudget({ breakdown = [] as BudgetBreakdown[], total = 120000 }: { breakdown?: BudgetBreakdown[]; total?: number }) {
  const data = breakdown.length ? breakdown : [
    { label: "Design", amount: 25000 },
    { label: "Development", amount: 70000 },
    { label: "QA", amount: 15000 },
    { label: "Ops", amount: 10000 },
  ]
  const used = data.reduce((s, d) => s + d.amount, 0)
  const remaining = total - used
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span>Total</span>
          <span className="font-medium">${total.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>Used</span>
          <span className="font-medium">${used.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>Remaining</span>
          <span className="font-medium">${remaining.toLocaleString()}</span>
        </div>
        <div className="grid gap-2 pt-2">
          {data.map((b, i) => (
            <div key={i} className="flex items-center justify-between rounded border p-2 text-sm">
              <span>{b.label}</span>
              <span className="font-medium">${b.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


