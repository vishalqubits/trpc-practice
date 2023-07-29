export async function getManagementApiAccesstoken(): Promise<string> {
  const secret = await fetch(
    `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
    {
      method: "POST",
      body: JSON.stringify({
        client_id: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
        client_secret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
        audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
        grant_type: "client_credentials",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (secret.status === 200) {
    const data = await secret.json();
    return data?.access_token;
  }
  throw new Error(`Failed to get access token, ${secret.statusText}`);
}
