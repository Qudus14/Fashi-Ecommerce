import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Twitter, Instagram, Linkedin } from "lucide-react"

export default function TeamMember({ name, role, image }) {
  return (
    <Card className="overflow-hidden border-none">
      <CardContent className="p-0">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={400}
          height={400}
          className="w-full object-contain aspect-square"
        />
        <div className="p-4 text-center">
          <h3 className="font-bold text-lg mb-1">{name}</h3>
          <p className="text-gray-600 text-sm mb-3">{role}</p>
          <div className="flex justify-center space-x-3">
            <Twitter className="h-5 w-5 hover:animate-bounce text-blue-600" />
            <Instagram className="h-5 w-5 hover:animate-bounce text-pink-500" />
            <Linkedin className="h-5 w-5 hover:animate-bounce text-blue-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

