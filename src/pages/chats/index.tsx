import type { NextPage } from "next";
import Layout from "components/layout";
import useSWR from "swr";
import useUser from "@libs/client/useUser";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import { Suspense } from "react";

interface ChatsProps {
  name: string;
  avatar: string;
  id: number;
}

const Chats: NextPage = () => {
  const { data } = useSWR("/api/chats");
  const { user } = useUser();
  const router = useRouter();

  return (
    <Layout title="Home" hasTabBar>
      <div className=" divide-y-[1px] py-5  ">
        {data?.chatRooms.map(
          (chat: any) =>
            chat?.chats[0]?.chats && (
              <div
                onClick={() => router.push(`/chats/${chat?.id}`)}
                key={chat?.id}
                className="flex cursor-pointer items-center space-x-3 px-6 py-6"
              >
                <Suspense fallback={<Skeleton />}>
                  <div className="h-12 w-12 rounded-full bg-slate-300" />
                </Suspense>
                <div>
                  <p className="text-gray-700">
                    {user?.name === chat?.chatBy?.name
                      ? chat?.chatFor?.name
                      : chat?.chatBy?.name}
                  </p>
                  <p className="text-sm  text-gray-500">
                    {chat?.chats[0]?.chats}
                  </p>
                </div>
              </div>
            ),
        )}
      </div>
    </Layout>
  );
};

export default Chats;
