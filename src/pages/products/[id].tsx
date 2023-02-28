import Layout from "@components/layout";
import useMutation from "@libs/client/useMutation";
import { Product, User } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { cls } from "@libs/client/utils";
import useUser from "@libs/client/useUser";

interface ProductWithUser extends Product {
  user: User;
}

interface ItemDetailsProp {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
  isLiked: boolean;
}

const ItemDetail: NextPage = () => {
  const user = useUser();
  console.log("user", user);
  33;
  const router = useRouter();
  // if (!user.user) {
  //   router.push("/enter");
  // }
  const { mutate } = useSWRConfig();
  const {
    data,
    mutate: boundMutate,
    isLoading,
  } = useSWR<ItemDetailsProp>(
    router.query.id ? `/api/products/${router.query.id}` : null,
  );
  const [toggleFav, loading] = useMutation(
    `/api/products/${router.query.id}/fav`,
  );
  const onFavClick = () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    mutate("/api/users/me", (prev: any) => ({ ok: false }), false);
    if (!loading) {
      toggleFav({});
    }
  };
  return (
    <Layout canGoBack={true}>
      <div className="px-4 py-10">
        <div>
          <div className="h-96 rounded-md bg-slate-200" />
          <div className="flex items-center space-x-3 border-b border-t py-3">
            <div className="h-12 w-12 rounded-full bg-slate-300" />
            <div className="cursor-pointer">
              <p className="text-sm font-medium text-gray-700">
                {data?.product?.user?.name}
              </p>
              {/* <Link href={`/users/profile/${data?.product?.user?.id}`}> */}{" "}
              <a className="text-xs text-gray-500">View profile &rarr;</a>
              {/* </Link> */}
            </div>
          </div>
          <div className="pt-8">
            <h1 className="text-3xl font-bold text-gray-800">
              {data?.product?.name}
            </h1>
            <span className="mt-3 block text-3xl text-gray-500">
              $ {data?.product?.price}
            </span>
            <p className="my-6 text-base text-gray-700">
              {data?.product?.description}
            </p>
            <div className="flex items-center justify-between space-x-2">
              <button className="flex-1 rounded-md bg-teal-600 py-2 font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
                Talk to seller
              </button>
              <button
                onClick={onFavClick}
                className={cls(
                  "flex items-center justify-center rounded-md  p-3",
                  data?.isLiked
                    ? " text-red-400 hover:text-red-500"
                    : "text-gray-400 hover:text-gray-500",
                )}
              >
                <svg
                  className={cls(
                    "h-6 w-6",
                    data?.isLiked ? "fill-red-400" : "",
                  )}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Similar items
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {data?.relatedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => router.push(`/products/${product.id}`)}
              >
                <div className="mb-2 h-56 w-full rounded-md bg-slate-300" />
                <h3 className="font-bold text-gray-900">{product?.name}</h3>
                <p className="font-semibold text-gray-800">${product?.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
