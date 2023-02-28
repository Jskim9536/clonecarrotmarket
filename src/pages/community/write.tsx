import TextArea from "@components/textarea";
import useCoords from "@libs/client/useCoords";
import useMutation from "@libs/client/useMutation";
import { Post } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface WriteProps {
  question: string;
}

interface WriteMutateProps {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WriteProps>();
  const router = useRouter();

  const { latitude, longitude } = useCoords();
  console.log(latitude, longitude);

  const [post, { loading, data, error }] =
    useMutation<WriteMutateProps>("/api/community");

  const onValid = (data: WriteProps) => {
    if (loading) return; //user가 여러번 제출 버튼 클릭한것을 막기 위한 함수
    post({ ...data, latitude: latitude, longitude: longitude });
    // console.log(data);
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);
  return (
    <form className="px-4 py-10" onSubmit={handleSubmit(onValid)}>
      <TextArea
        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 "
        rows={4}
        placeholder="Ask a question!"
        required
        register={register("question", { required: true })}
      />
      <button className="mt-2 w-full rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ">
        {loading ? "Loading" : "Send"}
      </button>
    </form>
  );
};

export default Write;
