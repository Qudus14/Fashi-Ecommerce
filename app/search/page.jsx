import SearchResults from '@/lib/fetchSearch'
import { Suspense } from 'react'
import Loading from './loading'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Footer from '@/components/Public/Footer';

export default async function SearchPage({ searchParams }) {
  const searchTerm = searchParams.q || '';

  return (
    <>
    <main className="container mx-auto px-1 py-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-black font-bold text-xl" href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-gray-500 capitalize font-bold text-xl">{searchTerm}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="font-bold text-lg text-gray-500 capitalize py-3">Search Results for: {searchTerm}</h1>
      <Suspense fallback={<Loading/>}>
          <SearchResults searchTerm={searchTerm} />
      </Suspense>
    </main>
    <Footer/>
    </>
  );
}
