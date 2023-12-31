import { appRouter } from "@/server/routers/_app";
import { NextApiRequest, NextApiResponse } from "next";
import cors from "nextjs-cors";
import { createOpenApiNextHandler } from "trpc-openapi";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Setup CORS
  await cors(req, res);
  // Handle incoming OpenAPI requests
  return createOpenApiNextHandler({
    // @ts-ignore
    router: appRouter,
  })(req, res);
};
export default handler;
