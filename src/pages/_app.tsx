import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import useUser from "@libs/client/useUser";

function CustomUser() {
  const { user } = useUser();
  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <SWRConfig
        value={{
          fetcher: (url: string) =>
            fetch(url).then((response) => response.json()),
          // refreshInterval: 2000, // refresh 인터벌 설정 가능
        }}
      >
        <CustomUser />
        <Component {...pageProps} />
      </SWRConfig>
    </div>
  );
}
