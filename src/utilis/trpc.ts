import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { AppRouter } from "../server/routers/_app";

function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return "";

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

async function token() {
  const getToken = await fetch("/api/auth0-token", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!getToken) {
    throw new Error("No token found");
  }

  const token = await getToken.json();
  return token;
}

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    return {
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,

          // You can pass any HTTP headers you wish here
          async headers() {
            let auth0Token = await token();
            return { authorization: auth0Token };
          },
        }),
      ],
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: false,
});
