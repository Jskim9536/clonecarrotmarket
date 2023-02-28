import useMutation from "@libs/client/useMutation";
import { Fav, Product } from "@prisma/client";
import type { NextPage } from "next";
import useSWR, { useSWRConfig } from "swr";

interface ProductWithCount extends Product {
  _count: {
    Fav: number;
  };
}

interface LovedProductExtends extends Fav {
  product: ProductWithCount;
}

interface LovedProps {
  ok: boolean;
  loved: LovedProductExtends[];
  // product: Product;
}

const Loved: NextPage = () => {
  const { data } = useSWR<LovedProps>("/api/users/me/loved");

  return (
    <div className="grid min-h-screen w-full gap-6 bg-gray-200 py-14 px-8 sm:grid-cols-2 xl:grid-cols-3">
      {data?.loved?.map((product) => (
        <div
          key={product?.id}
          className="cursor-pointer  rounded-xl bg-white px-9 py-8 shadow-sm transition duration-300 hover:bg-opacity-60"
        >
          <div className="flex flex-row gap-3">
            <div className="h-20 w-20 rounded-xl bg-gray-400" />
            <div className=" flex flex-col pt-2 ">
              <h3 className="text-md font-semibold">
                {product?.product?.name}
              </h3>
              <span className="text-xs text-gray-500">Black</span>
              <span className=" text-md mt-1 font-bold">
                ${product?.product?.price}
              </span>
            </div>
          </div>
          <div className="-mb-1 flex w-full flex-row justify-end gap-3">
            <div className="flex flex-row items-center justify-center gap-1">
              <svg
                className="h-4 w-4 text-red-500"
                fill="red"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
              <span className="text-sm font-light">
                {product.product?._count.Fav}
              </span>
            </div>
            <div className="flex flex-row items-center justify-center gap-1">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span className="text-sm font-light">1</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Loved;
