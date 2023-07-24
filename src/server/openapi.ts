import { generateOpenApiDocument } from "trpc-openapi";
import { appRouter } from "./routers/_app";

// @ts-ignore
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "tRPC OpenAPI",
  version: "1.0.0",
  baseUrl: `${process.env.APP_URL}/api`,
});
