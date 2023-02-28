import type { NextPage } from "next";
import Layout from "@components/layout";
import { set, useForm } from "react-hook-form";
import useUser from "@libs/client/useUser";
import { useEffect, useState } from "react";
import useMutation from "@libs/client/useMutation";
import Input from "@components/input";
import { useRouter } from "next/router";

interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  formErrors?: string;
  avatar?: FileList;
}
interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const [avatarPreview, setAvatarPreiview] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    reset,
    resetField,
  } = useForm<EditProfileForm>();
  useEffect(() => {
    if (user?.name) setValue("name", user.name);
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
  }, [user, setValue]);

  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me`);

  const avatar = watch("avatar");
  console.log("아바타", avatar);

  useEffect(() => {
    if (avatar && avatar.length >= 1) {
      const file = avatar[0];
      setAvatarPreiview(URL.createObjectURL(file));
    } else {
      setAvatarPreiview("");
    }
  }, [avatar]);

  const onValid = async ({ email, phone, name, avatar }: EditProfileForm) => {
    if (loading) return;
    if (email === "" && phone === "" && name === "") {
      return setError("formErrors", {
        message: "Email OR Phone number are required. You need to choose one.",
      });
    }
    if (avatar && avatar.length > 0) {
      const cloudflareRequest = await fetch(`/api/files`);
      const { uploadURL } = await cloudflareRequest.json();
      const form = new FormData();
      form.append("file", avatar[0]);
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();
      return;
      editProfile({
        email,
        phone,
        name,
        avatarId: id,
      });
    } else {
      editProfile({
        email,
        phone,
        name,
      });
    }
  };
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError]);

  useEffect(() => {
    if (data?.ok === true) {
      router.push("/profile");
    }
  }, [data, router]);

  return (
    <Layout title="Home" hasTabBar>
      <form className="space-y-4 py-10 px-4" onSubmit={handleSubmit(onValid)}>
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="h-14 w-14 rounded-full bg-slate-500"
            />
          ) : (
            <div className="h-14 w-14 rounded-full bg-slate-500" />
          )}
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 shadow-sm focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Change
            <input
              {...register("avatar")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
          <div
            onClick={() => {
              resetField("avatar");
            }}
          >
            cancel
          </div>
        </div>
        <Input
          register={register("name")}
          required={false}
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register("email")}
          required={false}
          label="Email address"
          name="email"
          type="email"
        />
        <Input
          register={register("phone")}
          required={false}
          label="Phone number"
          name="phone"
          type="text"
          kind="phone"
        />
        <button className="mt-5 w-full rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ">
          Update profile
        </button>
      </form>
    </Layout>
  );
};

export default EditProfile;
