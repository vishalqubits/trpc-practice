import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const numbers = req.body;
  const a = numbers.num1;
  const b = numbers.num2;
  res.status(200).json(a + b);
}
