import type { NextPage } from "next";
import React, { useState } from "react";
import { cls } from "libs/client/utils";
import Link from "next/link";
import { useRouter } from "next/router";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) {
  const router = useRouter();
  const onGoBack = () => {
    router.back();
  };

  return (
    <div className="flex w-full justify-center">
      <div className="fixed top-0 flex h-14 w-full items-center border-b bg-white bg-opacity-80 px-5 text-lg font-medium text-gray-800 backdrop-blur-sm">
        {canGoBack ? <button onClick={() => onGoBack()}>&larr;</button> : null}
        {title ? <span>{title}</span> : null}
      </div>
      <div className={cls(" w-full bg-white pt-8", hasTabBar ? "pb-14" : "")}>
        {children}
      </div>
      {hasTabBar ? (
        <nav
          className="fixed bottom-0 flex h-16 w-full justify-between border-t bg-white text-xs text-gray-700"
          style={{
            paddingLeft: 30,
            paddingRight: 30,
          }}
        >
          <Link href="/" legacyBehavior>
            <div className="flex flex-col items-center justify-center space-y-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={cls(
                  "h-6 w-6 ",
                  router.asPath === "/"
                    ? " text-teal-500"
                    : "font-extrabold text-gray-800",
                )}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <span
                className={cls(
                  "text-xs ",
                  router.asPath === "/" ? " text-teal-500" : "text-gray-800",
                )}
              >
                home
              </span>
            </div>
          </Link>
          <Link href="/community" legacyBehavior>
            <div className="flex flex-col items-center justify-center space-y-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={cls(
                  "h-6 w-6 ",
                  router.asPath === "/community"
                    ? " text-teal-500"
                    : "font-extrabold text-gray-800",
                )}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <span
                className={cls(
                  "text-xs ",
                  router.asPath === "/community"
                    ? " text-teal-500"
                    : "text-gray-800",
                )}
              >
                Near
              </span>
            </div>
          </Link>
          <Link
            href="/chats"
            className="flex flex-col items-center justify-center space-y-0"
            legacyBehavior
          >
            <div className="flex flex-col items-center justify-center space-y-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={cls(
                  "h-6 w-6 ",
                  router.asPath === "/chats"
                    ? " text-teal-500"
                    : "font-extrabold text-gray-800",
                )}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <span
                className={cls(
                  "text-xs ",
                  router.asPath === "/chats"
                    ? " text-teal-500"
                    : "text-gray-800",
                )}
              >
                chats
              </span>
            </div>
          </Link>

          <Link
            href="/streams"
            className="flex flex-col items-center justify-center space-y-0"
            legacyBehavior
          >
            <div className="flex flex-col items-center justify-center space-y-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={cls(
                  "h-6 w-6 ",
                  router.asPath === "/streams"
                    ? " text-teal-500"
                    : "font-extrabold text-gray-800",
                )}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <span
                className={cls(
                  "text-xs ",
                  router.asPath === "/streams"
                    ? " text-teal-500"
                    : "text-gray-800",
                )}
              >
                Live
              </span>
            </div>
          </Link>
          <Link
            href="/profile"
            className="flex flex-col items-center justify-center space-y-0"
            legacyBehavior
          >
            <div className="flex flex-col items-center justify-center space-y-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={cls(
                  "h-6 w-6 ",
                  router.asPath === "/profile"
                    ? " text-teal-500"
                    : "font-extrabold text-gray-800",
                )}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <span
                className={cls(
                  "text-xs ",
                  router.asPath === "/profile"
                    ? " text-teal-500"
                    : "text-gray-800",
                )}
              >
                Profile
              </span>
            </div>
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
