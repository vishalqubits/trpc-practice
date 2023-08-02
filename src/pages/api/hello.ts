// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { verifyJwt } from "@/utilis/decrypt-token";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const authHeader = req.headers;

  let token;
  if (authHeader.authorization?.startsWith("Bearer")) {
    token = authHeader.authorization.substring(
      7,
      authHeader.authorization.length
    );
  } else {
    res.status(500).json({ name: "Token not received !" });
  }

  if (!token) {
    res.status(500).json({ name: "Unauthenticated" });
    return;
  }

  const encryptToken = await verifyJwt(token);

  res.status(200).json({ name: "John Doe" });
}
