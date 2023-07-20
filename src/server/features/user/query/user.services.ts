import { IGetUserQuery } from "./user.utilis";

export const userQueryServices = {
  getUserQuery,
};

async function getUserQuery({ input }: IGetUserQuery) {
  const greetingMessage = `hello ${input.text}`;
  return {
    greeting: greetingMessage,
  };
}
