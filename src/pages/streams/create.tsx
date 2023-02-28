import Input from "@components/input";
import TextArea from "@components/textarea";
import useMutation from "@libs/client/useMutation";
import { Stream } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface CreateStreamProps {
  name: string;
  price: string;
  description: string;
}
interface CreateResponeProps {
  ok: boolean;
  createStream: Stream;
}

const Create: NextPage = () => {
  const router = useRouter();
  const [createStream, { loading, data }] = useMutation<CreateResponeProps>(
    "/api/streams/create",
  );
  const { register, handleSubmit } = useForm<CreateStreamProps>();
  const onValid = (data: CreateStreamProps) => {
    if (loading) return;
    createStream(data);
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streams/${data.createStream.id}`);
    }
  }, [data, router]);
  return (
    <div className=" py-10 px-4">
      <form className="space-y-5" onSubmit={handleSubmit(onValid)}>
        <Input
          label={"Name"}
          required
          name={"name"}
          register={register("name", { required: true })}
        />
        <Input
          label={"Price"}
          required
          kind={"price"}
          name={"price"}
          register={register("price", { required: true })}
        />

        <TextArea
          label={"Description"}
          name={"description"}
          register={register("description", { required: true })}
        />

        <button className=" w-full rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ">
          {loading ? "Loading" : "Go live"}
        </button>
      </form>
    </div>
  );
};

export default Create;
