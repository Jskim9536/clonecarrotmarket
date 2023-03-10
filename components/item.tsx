import type { NextPage } from "next";
// import Link from "next/link";
import { useRouter } from "next/router";

interface ItemProp {
  id?: number;
  title?: string;
  color?: number;
  price?: number;
  like?: boolean;
  likeCount?: number;
  commentCount?: number;
  img?: string;
  //   children: React.ReactNode;
}

export default function Item({
  title,
  color,
  price,
  like,
  likeCount,
  commentCount,
  img,
  id,
}: ItemProp) {
  const router = useRouter();

  return (
    // <Link href={`/items/${key}`} legacyBehavior>
    <div
      // href={`/items/${key}`}
      onClick={() => router.push(`/products/${id}`)}
      className="cursor-pointer rounded-xl bg-white px-9 py-8 shadow-sm transition duration-300 hover:bg-opacity-60"
    >
      <div className="flex flex-row gap-3">
        <div className="h-20 w-20 rounded-xl bg-gray-400" />
        <div className=" flex flex-col pt-2 ">
          <h3 className="text-md font-semibold">{title}</h3>
          <span className="text-xs text-gray-500">{color}</span>
          <span className=" text-md mt-1 font-bold">${price}</span>
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
          <span className="text-sm font-light">{likeCount}</span>
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
          <span className="text-sm font-light">{commentCount}</span>
        </div>
      </div>
    </div>
    // </Link>
  );
}
