import { Card, CardContent } from "@/components/ui/card"
import { Truck, HeadphonesIcon, RefreshCcw } from "lucide-react"

export default function ServiceFeature({ title, description, icon }) {
  const Icon = {
    truck: Truck,
    headphones: HeadphonesIcon,
    "refresh-ccw": RefreshCcw,
  }[icon]

  return (
    <Card className="border-gray-200">
      <CardContent className="p-6 text-center">
        <div className="inline-block p-3 rounded-full bg-gray-100 mb-4">{Icon && <Icon className="h-6 w-6" />}</div>
        <h3 className="font-bold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}

