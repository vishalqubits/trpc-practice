import { router } from "../trpc";
import { userQueryRouter } from "./user/user.query";

export const appRouter = router({
  userQuery: userQueryRouter,
});

export type AppRouter = typeof appRouter;
