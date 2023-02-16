import { Inter } from "@next/font/google";
import Layout from "../../components/layout";
import React, { useState } from "react";
import HomeList from "./home";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const [count, setCount] = useState(1);
  // const addCount = (num: number) => {
  //   return setCount(num + 1);
  // };
  // const minusCount = (num: number) => {
  //   return setCount(num - 1);
  // };
  return (
    <Layout title="Home" hasTabBar={true}>
      <>
        <HomeList />
        {/* <div className="grid min-h-screen w-full place-content-center gap-10 space-y-10 bg-white px-10  py-20 lg:grid-cols-3"> */}

        {/* <div className="flex flex-col justify-between rounded-2xl bg-white p-10 shadow-xl">
          <span className="text-3xl font-bold">Select Item</span>
          <ul>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="my-2 flex flex-row justify-between odd:bg-blue-50 "
              >
                <span className="text-gray-500">Grey chair {i}</span>
                <span className="font-bold">$10.20</span>
              </div>
            ))}
          </ul>
          <div className="flex flex-row justify-between ">
            <span className=" text-gray-500">Tooly Talbe</span>
            <span className="font-bold">$19.50</span>
          </div>
          <div className="mt-2 flex justify-between border-t-2 border-dashed pt-4">
            <span>Total</span>
            <span className="font-bold">$29.70</span>
          </div>
          <div className="mx-auto mt-5 flex w-full  justify-center">
            <button className=" w-1/2 rounded-full bg-blue-600 py-2 text-center text-white hover:bg-teal-500 active:bg-yellow-500">
              CheckOut
            </button>
          </div>
        </div>
        <div className="group overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="bg-blue-500 p-6 pb-14 xl:pb-40 ">
            <span className="text-2xl font-bold text-white">Profile</span>
          </div>
          <div className="relative -top-5 rounded-3xl bg-white p-6">
            <div className="relative -top-16 flex flex-row items-end justify-between">
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-500">Order</span>
                <span className="font-medium">340</span>
              </div>
              <div className="h-24 w-24 rounded-full bg-black transition-colors duration-700 group-hover:bg-red-400" />
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-500">Spent</span>
                <span className="font-medium">$2,430</span>
              </div>
            </div>
            <div className="relative -mt-10 -mb-5 flex flex-col items-center">
              <span className="text-lg font-medium">Jun Seok </span>
              <span className="text-sm text-gray-500">Seoul, Korea</span>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-10 shadow-xl">
          <div className="mb-5 flex flex-row items-center justify-between">
            <span>←</span>
            <div className="space-x-3">
              <span>⭐️ 4.9</span>
              <span className="rounded-md p-2 shadow-xl">💖</span>
            </div>
          </div>
          <div className="mb-5 h-72 rounded-3xl bg-zinc-400" />
          <div className="flex flex-col">
            <span className="mb-1.5 text-xl font-medium">Swoon Lounge</span>
            <span className="text-xs text-gray-500">Chair</span>
            <div className="mt-3 mb-5 flex flex-row items-center justify-between">
              <div className="space-x-3">
                <button className="h-5 w-5 rounded-full bg-yellow-300  ring-yellow-300  ring-offset-2 transition duration-700 focus:ring-2 " />
                <button className="h-5 w-5 rounded-full bg-indigo-300  ring-indigo-300  ring-offset-2 transition duration-700 focus:ring-2" />
                <button className="h-5 w-5 rounded-full bg-teal-300  ring-teal-300  ring-offset-2 transition duration-700 focus:ring-2" />
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    if (count < 2) {
                      setCount(1);
                    } else {
                      minusCount(count);
                    }
                  }}
                  className="flex aspect-square w-10 items-center justify-center rounded-lg bg-blue-200  text-xl font-medium text-gray-600"
                >
                  -
                </button>
                <span className="mx-auto min-w-[11px] max-w-[11px] items-center ">
                  {count}
                </span>
                <button
                  onClick={() => {
                    addCount(count);
                  }}
                  className="flex aspect-square w-10 items-center justify-center rounded-lg bg-blue-200  text-xl font-medium text-gray-600"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-medium">$450</span>
              <button className="rounded-lg bg-blue-500 px-5 py-2 text-center text-sm text-white">
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-10 shadow-xl">
          <details className="select-none open:bg-indigo-500 open:text-white">
            <summary className="cursor-pointer">what is your fav food?</summary>
            <span className="selection:bg-indigo-500 selection:text-white">
              Kimchi
            </span>
          </details>
          <input
            type="file"
            className="file:h-10 file:w-40 file:rounded-md file:border-0 file:bg-purple-200 file:hover:bg-teal-500"
          />
        </div>
        <form className="flex flex-col space-y-2 bg-blue-500 p-5 lg:col-span-2">
          <input
            type="text"
            required
            placeholder="Username"
            className="peer  rounded-sm  pl-2 focus:outline-red-500"
          />
          <span className="hidden peer-invalid:block peer-invalid:text-red-500">
            This labe is invalid
          </span>
          <input
            type="password"
            required
            placeholder="Password"
            className="rounded-sm pl-2"
          />
          <input type="submit" value="Login" className="bg-white" />
        </form> */}
        {/* </div> */}
      </>
    </Layout>
  );
}
