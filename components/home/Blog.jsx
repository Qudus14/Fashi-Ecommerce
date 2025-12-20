"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader2, Trash } from "lucide-react";
import Loading from "@/app/search/loading";
import Link from "next/link";
import requests from "@/lib/requests";
import axiosInstance from "@/Axios";
import ReviewLoading from "../loading/reviewLoading";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = requests.fetchReviews;
        const response = await axiosInstance.get(url);

        console.log("Review Response:", response.data);

        const reviewsData = response.data?.data?.reviews;

        if (response.data?.status === "OK" && Array.isArray(reviewsData)) {
          setReviews(reviewsData);
        } else {
          setError("Failed to get customer reviews");
        }
      } catch (err) {
        console.error(err);
        setError("Review's is temporarily unavailable");
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Customer Reviews</h2>
          <p className="text-gray-600 text-lg font-semibold mt-2">
            See what our customers are saying
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <ReviewLoading />
          </div>
        )}

        {error && (
          <div className="text-center py-10">
            <p className="text-red-500 font-bold text-lg">{error}</p>
          </div>
        )}

        {!loading && !error && reviews.length === 0 && (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Trash />
              </EmptyMedia>
              <EmptyTitle>No Projects Yet</EmptyTitle>
            </EmptyHeader>
          </Empty>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 shadow-lg">
          {reviews.slice(0, 6).map((review) => (
            <div
              key={review.review_id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {review.review_author_photo ? (
                    <div className="relative w-10 h-10 mr-3 rounded-full overflow-hidden">
                      <Image
                        src={review.review_author_photo || "/placeholder.svg"}
                        alt={review.review_author || "/placeholder.svg"}
                        width={50}
                        height={50}
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 mr-3 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 font-semibold">
                        {review.review_author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold">{review.review_author}</h4>
                    <p className="text-sm text-gray-500">
                      {review.review_date}
                    </p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-2">
                  {review.review_title}
                </h3>

                <p className="text-gray-700 mb-4 line-clamp-4">
                  {review.review_text}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                  <span>Source: {review.review_source}</span>
                  <Link
                    href={review.review_source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Original
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
