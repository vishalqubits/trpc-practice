import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./utilis/decrypt-token";

export default async function middleware(request: NextRequest) {
  const authHeader = request.headers;
  const getToken = authHeader.get("authorization");

  let token;
  if (getToken?.startsWith("Bearer")) {
    token = getToken.substring(7, getToken.length);
  } else {
    return NextResponse.json(
      { error: "Token not received !" },
      { status: 500 }
    );
  }

  if (!token) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 500 });
  }

  // try {
  //   const encryptToken = await verifyJwt(token);
  // } catch (e) {
  //   console.log("dd", e);
  //   return NextResponse.json(
  //     { error: "Token not verified !" },
  //     { status: 401 }
  //   );
  // }
  NextResponse.next();
}

export const config = {
  matcher: ["/api/hello", "/api/getDetails"],
};
