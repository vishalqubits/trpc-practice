import { decode, verify } from "jsonwebtoken";
import * as jwks from "jwks-rsa";

//verifying tokens
export const verifyJwt = (token: string): Promise<unknown> => {
  // @ts-ignore
  const client = jwks({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.JWKSURI,
  });

  const getKey = async (header: any, cb: any) => {
    const key = await client.getSigningKey(header.kid);
    if (key) {
      cb(null, key.getPublicKey());
    } else {
      cb("error", null);
    }
  };

  return new Promise((resolve, reject) => {
    verify(
      token,
      getKey,
      {
        audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
        issuer: `${process.env.AUTH0_ISSUER_BASE_URL}/`,
        algorithms: ["RS256"],
      },
      (e, verified) => {
        if (e) {
          return reject(e);
        }

        resolve(verified);
      }
    );
  });
};

// to show token datas
export const decodeJwt = (token: string): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    try {
      const decoded = decode(token, { complete: true });
      resolve(decoded);
    } catch (error) {
      reject(error);
    }
  });
};
