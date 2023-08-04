import { OpenApiMeta } from "trpc-openapi";

import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "@/utilis/context";

export const t = initTRPC.context<Context>().create();
export const middleware = t.middleware;

export const router = t.router;
export const procedure = t.procedure;

// @ts-ignore
const isAuthed = middleware(({ next, ctx }) => {
  const token = ctx.accessToken;

  if (!token) {
    // throw new TRPCError({ code: "UNAUTHORIZED", message: "Not token !!" });
    console.log("unauthorized");
    return;
  } else {
    return next({
      ctx: {
        ...ctx,
      },
    });
  }
});

/**
 * Protected base procedure
 */
export const authedProcedure = t.procedure.use(isAuthed);

export const tSwagger = initTRPC.meta<OpenApiMeta>().create();
