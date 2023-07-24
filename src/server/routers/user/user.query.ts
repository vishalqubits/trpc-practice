import { userQueryServices } from "@/server/features/user/query/user.services";
import {
  getUserQueryInputSchema,
  getUserQueryOuputSchema,
} from "@/server/features/user/query/user.validations";
import { procedure, router } from "@/server/trpc";

export const userQueryRouter = router({
  hello: procedure
    .meta({
      openapi: { method: "GET", path: "/say-hello" },
    })
    .input(getUserQueryInputSchema)
    .output(getUserQueryOuputSchema)
    .query(async ({ input, ctx }) => {
      return await userQueryServices.getUserQuery({
        input,
      });
    }),
});
