import { IncomingHttpHeaders } from "http";
import { verifyJwt } from "./decrypt-token";

export default async function middleware(authHeader: IncomingHttpHeaders) {
  let token;
  if (authHeader.authorization?.startsWith("Bearer")) {
    token = authHeader.authorization.substring(
      7,
      authHeader.authorization.length
    );
  } else {
    throw new Error("Token not received !");
  }
  const verifyToken = await verifyJwt(token);
  return verifyToken;
}
