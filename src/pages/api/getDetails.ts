import middleware from "@/utilis/rest-api-middleware";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authHeader = req.headers;
  try {
    const verifiedToken = await middleware(authHeader);
  } catch (e) {
    console.log(e);
    res.status(401).json({ error: "Token not verified" });
  }
  res.status(200).json("My country is Nepal");
}
