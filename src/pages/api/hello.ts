// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import middleware from "@/utilis/rest-api-middleware";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const authHeader = req.headers;
  try {
    const verifiedToken = await middleware(authHeader);
  } catch (e) {
    console.log(e);
    res.status(401).json({ error: "Token not verified" });
  }
  res.status(200).json({ name: "John Doe" });
}
