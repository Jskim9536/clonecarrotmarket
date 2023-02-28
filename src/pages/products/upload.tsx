import Input from "@components/input";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import TextArea from "@components/textarea";
import useMutation from "@libs/client/useMutation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Product } from "@prisma/client";

interface ProductProps {
  name: string;
  price: number;
  description: string;
  photo?: FileList;
}
interface ProductMutationProps {
  ok: boolean;
  product: Product;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductProps>();

  const [upLoadProduct, { loading, data }] =
    useMutation<ProductMutationProps>("/api/products");

  const photo = watch("photo");
  const [photoPreview, setPhotoPreview] = useState("");
  useEffect(() => {
    if (photo && photo.length > 0) {
      const file = photo[0];
      setPhotoPreview(URL.createObjectURL(file));
    }
  }, [photo]);

  const onValid = async ({ name, price, description }: ProductProps) => {
    if (loading) return;
    // if (photo && photo.length > 0) {
    //   const { uploadURL } = await (await fetch(`/api/files`)).json();
    //   const form = new FormData();
    //   form.append("file", photo[0], name); //file레지스터에 값을 photo[0]으로 보내고, 파일명은 name으로 보낸다.
    //   const {
    //     result: { id },
    //   } = await (
    //     await fetch(uploadURL, { method: "POST", body: form })
    //   ).json;
    //   upLoadProduct({ name, price, description, photoId: id });
    // } else {
    //   upLoadProduct({ name, price, description });
    // }
    upLoadProduct({ name, price, description });
  };

  useEffect(() => {
    if (data?.ok) {
      router.replace(`/products/${data?.product.id}`);
    }
  }, [data, router]);

  return (
    <div className="px-4 py-16">
      <div>
        {photoPreview ? (
          <img
            src={photoPreview}
            className="flex h-48 w-full items-center justify-center rounded-md  hover:border-teal-500 hover:text-teal-500"
          />
        ) : (
          <label className="flex h-48 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-600 hover:border-teal-500 hover:text-teal-500">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              {...register("photo")}
              accept="image/*"
              type="file"
              className="hidden"
            />
          </label>
        )}
      </div>
      <form className="my-5 space-y-4" onSubmit={handleSubmit(onValid)}>
        <div>
          <Input
            label={"Name"}
            name={"name"}
            required
            register={register("name", { required: true })}
          />
          <Input
            label={"Price"}
            name={"price"}
            kind={"price"}
            required
            register={register("price", {
              required: true,
              valueAsNumber: true,
            })}
          />
          <>{console.log("error:", errors)}</>
          <TextArea
            register={register("description", { required: true })}
            name="description"
            label="Description"
            required
          />
        </div>

        <button className="mx-auto mt-4 w-full rounded-full bg-teal-500 py-2 font-bold text-white shadow-sm transition duration-500 hover:bg-teal-400">
          {loading ? "Loading" : "Upload product"}
        </button>
      </form>
    </div>
  );
};

export default Upload;
