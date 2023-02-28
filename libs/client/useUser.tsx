import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export default function useUser() {
  //캐쉬에 넣었으면 다시 api 요청 안하기 위해서
  const { data, error } = useSWR(
    "/api/users/me", // 이건 api 주고이자 key다. 유니크 키라서, useUser을 다른 컴포넌트에서도 사용해도 이게 하나의 id라는 것을 알 고 있다.
    // fetcher, (글로벌 fethcer 둘어가 있으면 이 동작 필요 없음)
  ); //swr로 아래 동작을 대체할 수 있음.
  const router = useRouter();

  useEffect(() => {
    if (data && data.ok && router.pathname === "/enter") {
      router.replace("/profile");
    }
    if (data && !data?.ok) {
      router.replace("/enter");
    }
  }, [data, router]);

  //   useEffect(() => {
  //     fetch("api/users/me")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (!data.ok) {
  //           return router.replace("/enter");
  //         } else {
  //           setUser(data.profile);
  //         }
  //       });
  //   }, []);

  return { user: data?.profile, isLoading: !data && !error };
}
