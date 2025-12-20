import SearchResults from "@/lib/fetchSearch";
import { Suspense } from "react";
import Loading from "./loading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Footer from "@/components/Public/Footer";

export default async function SearchPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const searchTerm = resolvedSearchParams.q || "";

  return (
    <>
      <main className="container mx-auto px-1 py-6">
        <Breadcrumb className="ml-5">
          <BreadcrumbList className="items-center">
            <BreadcrumbItem>
              <BreadcrumbLink className="text-black font-bold text-xl" href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-500 capitalize font-bold text-xl">
                {searchTerm}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="ml-5 font-bold text-lg text-gray-500 capitalize py-3">
          Search Results for: {searchTerm}
        </h1>

        {/* Pass the searchTerm into your component. 
            Suspense will catch the loading state of SearchResults. 
        */}
        <Suspense fallback={<Loading />}>
          <SearchResults searchTerm={searchTerm} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
