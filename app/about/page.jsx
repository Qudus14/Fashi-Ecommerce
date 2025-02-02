import Image from "next/image"
import TeamMember from "./team-member"
import StatsCard from "./stats-card"
import ServiceFeature from "./service-feature"
import Footer from "@/components/public/Footer"
export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Our Story Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h1 className="text-3xl font-semibold mb-6">Our Story</h1>
            <p className="text-gray-600 font-semibold mb-4">
              Launched in 2024, Fashi is built for the e-commerce marketplace with an online presence in Nigeria.
              Supported by wide range of tailored marketing plan and service solutions, Exclusive serves thousands of
              customers across the region.
            </p>
            <p className="text-gray-600 font-semibold">
              Fashi provides more than 100k+ products to offer, growing at a rate of 500+ products offers in several
              categories ranging from consumer.
            </p>
          </div>
          <div>
            <Image
              src="/img/banner-2.jpg"
              alt="Shopping experience"
              width={600}
              height={500}
              className="rounded-lg object-contain"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <StatsCard number="10.5k" label="Sellers Active our site" icon="users" />
          <StatsCard number="33k" label="Monthly Product Sale" icon="shopping-bag" />
          <StatsCard number="45.5k" label="Customer active in our site" icon="users" />
          <StatsCard number="25k" label="Annual gross sale in our site" icon="dollar-sign" />
        </div>

        {/* Team Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <TeamMember name="Adeboye Qudus" role="Founder & Chairman" image="/img/chairman.jpg" />
          <TeamMember name="Oshokoya Abubakry" role="Managing Director" image="/img/insta-1.jpg" />
          <TeamMember name="Salaudeen Aisha" role="Product Designer" image="/img/insta-4.jpg" />
        </div>

        {/* Services Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <ServiceFeature
            title="FREE AND FAST DELIVERY"
            description="Free delivery for all orders over $140"
            icon="truck"
          />
          <ServiceFeature
            title="24/7 CUSTOMER SERVICE"
            description="Friendly 24/7 customer support"
            icon="headphones"
          />
          <ServiceFeature
            title="MONEY BACK GUARANTEE"
            description="We return money within 30 days"
            icon="refresh-ccw"
          />
        </div>
      </main>
      <Footer/>
    </div>
  )
}