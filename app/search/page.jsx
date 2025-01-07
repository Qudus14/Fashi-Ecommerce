import SearchResults from '@/lib/fetchSearch'
import { Suspense } from 'react'
import Loading from './loading'
import SidebarPage from './Sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { headers } from 'next/headers';

export default async function SearchPage({ searchParams }) {
  const searchTerm = searchParams.q || '';

  return (
    <main className="container mx-auto px-1 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1>Search Results for: {searchTerm}</h1>
      <Suspense fallback={<Loading/>}>
        <div className='flex space-x-1'>
          <SidebarPage/>
          <SearchResults searchTerm={searchTerm} />
        </div>
      </Suspense>
    </main>
  );
}
