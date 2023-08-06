import { OpenApiMeta } from "trpc-openapi";

import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "@/utilis/context";
import { verifyJwt } from "@/utilis/decrypt-token";

export const t = initTRPC.context<Context>().create();
export const middleware = t.middleware;

export const router = t.router;
export const procedure = t.procedure;

// @ts-ignore
const isAuthed = middleware(async ({ next, ctx }) => {
  const token = ctx.accessToken;

  if (!token) {
    // throw new TRPCError({ code: "UNAUTHORIZED", message: "Not token !!" });
    console.log("No token received !");
    return;
  }

  try {
    const encryptToken = await verifyJwt(token);

    if (encryptToken) {
      return next({
        ctx: {
          ...ctx,
        },
      });
    }
  } catch (e) {
    console.log(e);
    console.log("Unauthenticated !");
  }
});

/**
 * Protected base procedure
 */
export const authedProcedure = t.procedure.use(isAuthed);

export const tSwagger = initTRPC.meta<OpenApiMeta>().create();
