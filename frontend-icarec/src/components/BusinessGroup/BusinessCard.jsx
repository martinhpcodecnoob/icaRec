import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const BusinessCard = ({ business }) => {
  const router = useRouter();

  const onClickBusiness = () => {
    router.push(`/myweb/${business._id}`);
  };
  return (
    <div className="max-w-full md:max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="relative w-full h-[7.5rem] md:h-40">
        <Image
          src={business.images[0].url_cloudinary}
          alt={business.business_name}
          width={1000}
          height={1000}
          className="w-[100%] h-[100%] object-center object-cover rounded-t-lg"
        />
      </div>
      <div className="p-5 bg-orange-100">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {business.business_name}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {business.description}
        </p>
        <span
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:underline cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onClickBusiness();
          }}
        >
          Ver más
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default BusinessCard;
