import { initTRPC } from "@trpc/server";
import { OpenApiMeta } from "trpc-openapi";

const t = initTRPC.create();

export const router = t.router;
export const procedure = t.procedure;

export const tSwagger = initTRPC.meta<OpenApiMeta>().create();
