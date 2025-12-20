import { Card, CardContent } from "@/components/ui/card"
import { Users, ShoppingBag, DollarSign } from "lucide-react"

export default function StatsCard({ number, label, icon }) {
  const Icon = {
    users: Users,
    "shopping-bag": ShoppingBag,
    "dollar-sign": DollarSign,
  }[icon]

  return (
    <Card className="border-gray-200">
      <CardContent className="p-6 text-center">
        <div className="inline-block p-3 rounded-full bg-gray-100 mb-4">{Icon && <Icon className="h-6 w-6" />}</div>
        <div className="text-2xl font-bold mb-2">{number}</div>
        <div className="text-gray-600 text-sm">{label}</div>
      </CardContent>
    </Card>
  )
}

