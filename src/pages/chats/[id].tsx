import type { NextPage } from "next";

const ChatDetail: NextPage = () => {
  return (
    <div className="space-y-4 px-4 py-10">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-slate-300" />
        <div className="rounded-full border p-2 px-4 text-sm text-gray-700">
          <p>Hi how much are you selling them for?</p>
        </div>
      </div>
      <div className="flex flex-row-reverse items-center space-x-2 space-x-reverse">
        <div className="h-8 w-8 rounded-full bg-slate-300" />
        <div className="rounded-full border p-2 px-4 text-sm text-gray-700">
          <p>I want ￦20,000</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-slate-300" />
        <div className="rounded-full border p-2 px-4 text-sm text-gray-700">
          <p>미쳤어?</p>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-4 mx-auto w-full max-w-md">
        <div className="relative flex flex-row items-center">
          <input
            type="text"
            className="w-full rounded-full border-gray-400 pr-12 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500"
          />
          <div className="absolute right-0 flex py-1.5 px-1.5 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="teal"
              className="h-10 w-10 transition hover:fill-teal-400"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
