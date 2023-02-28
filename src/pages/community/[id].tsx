import type { NextPage } from "next";
import Layout from "components/layout";
import useUser from "@libs/client/useUser";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { Answer, Post, User } from "@prisma/client";
import { useEffect } from "react";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";

interface AnswerForm {
  answer: string;
  ok: boolean;
}

interface AnswerExtendsUser extends Answer {
  user: User;
  createdAt: any;
}

interface PostExtendsUser extends Post {
  user: User;
  _count: {
    answer: number;
    wondering: number;
  };
  answer: AnswerExtendsUser[];
  wondering: number;
}

interface CommunityPostProp {
  ok: boolean;
  post: PostExtendsUser;
  isWondering: boolean;
}

const CommunityPostDetail: NextPage = () => {
  // const user = useUser();
  // const { mutate } = useSWRConfig();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<AnswerForm>();
  const {
    data,
    mutate: mutatePost,
    isLoading,
  } = useSWR<CommunityPostProp>(
    router.query.id ? `/api/community/${router.query.id}` : null,
  );

  useEffect(() => {
    if (data && !data.ok) {
      router.push("/community");
    }
  }, [data, router]);

  console.log(data);
  const [toggleWonder, { loading }] = useMutation(
    `/api/community/${router.query.id}/wonder`,
  );
  const [answer, { data: answerData, loading: answerLoading }] =
    useMutation<AnswerForm>(`/api/community/${router.query.id}/answer`);

  const onValid = (data: AnswerForm) => {
    if (answerLoading) return;
    answer(data);
    console.log("data:", data);
  };

  const onWonder = () => {
    if (!data) return;
    mutatePost(
      {
        ...data,
        post: {
          ...data?.post,
          _count: {
            ...data?.post?._count,
            wondering: data.isWondering
              ? data?.post?._count.wondering - 1
              : data?.post?._count.wondering + 1,
          },
        },
        isWondering: !data.isWondering,
      },
      false,
    );
    if (!answerLoading) {
      //이 조건이 없으면, 클릭은 빠르게 할 시 교착상태에 빠짐
      toggleWonder({});
    }
  };
  useEffect(() => {
    if (answerData && answerData?.ok) {
      reset();
      mutatePost();
    }
  }, [answerData, reset, mutatePost]);
  return (
    <Layout title="Home" hasTabBar>
      <div className="py-10">
        <span className="my-3 ml-4 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
          동네질문
        </span>
        <div className="mb-3 flex cursor-pointer items-center space-x-3  border-b px-4 pb-3">
          <div className="h-10 w-10 rounded-full bg-slate-300" />
          <div>
            <p className="text-sm font-medium text-gray-700">
              {data?.post?.user?.name}
            </p>
            <p className="text-xs font-medium text-gray-500">
              View profile &rarr;
            </p>
          </div>
        </div>
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="font-medium text-orange-500">Q.</span>{" "}
            {data?.post?.question}
          </div>
          <div className="mt-3 flex w-full space-x-5 border-t border-b-[2px] px-4 py-2.5  text-gray-700">
            <span
              onClick={onWonder}
              className={cls(
                "flex cursor-pointer items-center space-x-2 text-sm",
                data?.isWondering ? "text-red-500" : "",
              )}
            >
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
              <span>궁금해요 {data?.post?._count.wondering}</span>
            </span>
            <span
              className="flex cursor-pointer items-center space-x-2 text-sm"
              onClick={() => console.log("답변하기")}
            >
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
              <span>답변 {data?.post?._count.answer}</span>
            </span>
          </div>
        </div>
        <div className="my-5 space-y-5 px-4">
          {data?.post?.answer.map((answer) => (
            <div key={answer.id} className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-full bg-slate-200" />
              <div>
                <span className="block text-sm font-medium text-gray-700">
                  {answer?.user?.name}
                </span>
                <span className="block text-xs text-gray-500 ">
                  {String(answer?.createAt)}
                </span>
                <p className="mt-2 text-gray-700">{answer?.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <form className="px-4" onSubmit={handleSubmit(onValid)}>
          <TextArea
            required
            register={register("answer", { required: true })}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 "
            rows={4}
            placeholder="Answer this question!"
          />
          <button className="mt-2 w-full rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ">
            Reply
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
