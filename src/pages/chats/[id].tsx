import useInfiniteScroll from "@libs/client/useInfiniteScroll";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { cls } from "@libs/client/utils";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

interface ChatProps {
  chat: string;
  pages: number;
}

const ChatDetail: NextPage = () => {
  const router = useRouter();
  console.log(router?.query.id);
  const { user } = useUser();
  // const getKey = (pageIndex: number, previousPageData: ChatProps) => {
  //   if (router?.query.id && pageIndex === 0)
  //     return `/api/chats/${router.query.id}?page=1`;
  //   if (router?.query.id && pageIndex + 1 > previousPageData.pages) return null;
  //   return `/api/chats/${router.query.id}?page=${pageIndex + 1}`;
  // };
  // const fetcher = (url: string) => fetch(url).then((res) => res.json());

  // const { data: ScrollData, setSize } = useSWRInfinite<ChatProps>(
  //   getKey,
  //   fetcher,
  // );
  // const page = useInfiniteScroll();
  const { data, mutate, isLoading } = useSWR(
    router.query.id ? `/api/chats/${router.query.id}` : null,
  );
  const [sendChat, { data: MutateDate, error, loading }] = useMutation(
    `/api/chats/${router.query.id}/sendChat`,
  );
  const { register, handleSubmit, watch, reset, resetField } =
    useForm<ChatProps>();

  const onValid = async (data: ChatProps) => {
    if (isLoading) return;
    sendChat(data);
    if (MutateDate?.ok && !error) resetField("chat");
  };

  // useEffect(() => {
  //   if (data && data?.ok) {

  //   }
  // }, [data]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  });

  // useEffect(() => {
  //   setSize(page);
  // }, [setSize, page]);
  return (
    <div className="space-y-4 px-4 py-10">
      {data?.chatList.map((chat: any) => (
        <div
          key={chat?.id}
          className={cls(
            user?.id === chat?.user?.id
              ? "flex flex-row-reverse items-center space-x-2 space-x-reverse"
              : "flex items-center space-x-2",
          )}
        >
          <div className="h-8 w-8 rounded-full bg-slate-300" />
          <div className="rounded-full border p-2 px-4 text-sm text-gray-700">
            <p>{chat?.chats}</p>
          </div>
        </div>
      ))}
      <div className="h-5" ref={scrollRef} />
      <div className="fixed inset-x-0 bottom-4 mx-auto w-full max-w-md">
        <form
          className="relative flex flex-row items-center"
          onSubmit={handleSubmit(onValid)}
        >
          <input
            {...register("chat")}
            type="text"
            className="w-full rounded-full border-gray-400 pr-12 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500"
          />
          <button
            className="absolute right-0 flex py-1.5 px-1.5 "
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="teal"
              className="h-10 w-10 transition hover:fill-teal-400"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatDetail;
