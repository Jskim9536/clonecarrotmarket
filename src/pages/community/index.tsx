import type { NextPage } from "next";
import Layout from "components/layout";
import FloatingButtion from "components/floatingButton";
import useMutation from "@libs/client/useMutation";
import useSWR, { useSWRConfig } from "swr";
import { Post, User } from "@prisma/client";
import useCoords from "@libs/client/useCoords";

interface PostExtendsProps extends Post {
  user: User;
  _count: {
    //include 시켰을 때
    answer: number;
    wondering: number;
  };
}
interface PostProps {
  posts: PostExtendsProps[];
}

const Community: NextPage = () => {
  const { longitude, latitude } = useCoords(); //next js가 새로 시작할 때는 초기값으로 시작해서 서버사이드 렌더링 한다음 다시 state를 변경함.
  const { data } = useSWR<PostProps>(
    longitude && latitude
      ? `/api/community?latitude=${latitude}&longitude=${longitude}`
      : null, //next js에서는 서버사이드에서 기존 디폴트값으로 설정해두는데, 맨처음 latitude, longitude는 null이 기본값이라 실행 시 에러 발생
  ); //Get 요청보내기, POST 요청은 Mutation
  console.log(data);

  return (
    <Layout title="Community" hasTabBar={true}>
      <div className="space-y-8 py-12 px-5 ">
        {data?.posts?.map((post) => (
          <div
            key={post?.id}
            className="flex cursor-pointer flex-col items-start "
          >
            <span className="flex items-center justify-center rounded-full bg-gray-200 px-2.5 py-0.5 text-xs">
              동네질문
            </span>
            <div className="mt-2 text-gray-700">
              <span className="font-medium text-teal-500">Q.</span>{" "}
              {post?.question}
            </div>
            <div className="mt-5 flex w-full items-center justify-between text-xs font-medium text-gray-500">
              <span>{post?.user?.name}</span>
              <span>18시간 전</span>
            </div>
            <div className="mt-3 flex w-full space-x-5 border-t border-b py-2.5 text-gray-700">
              <span className="flex flex-row items-center justify-center gap-2">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>궁금해요 {post?._count?.wondering}</span>
              </span>
              <span className="flex flex-row items-center justify-center gap-2">
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
                <span>답변 {post?._count?.answer}</span>
              </span>
            </div>
          </div>
        ))}
        <FloatingButtion href={"/community/write"}>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </FloatingButtion>
      </div>
    </Layout>
  );
};

export default Community;
