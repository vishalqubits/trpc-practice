import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  const token = opts.req.headers.authorization;
  return { accessToken: token };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
