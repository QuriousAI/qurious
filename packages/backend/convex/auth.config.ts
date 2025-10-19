import { envVariables } from "./env";

export default {
  providers: [
    {
      domain: envVariables.CLERK_ISSUER_URL,
      applicationID: "convex",
    },
  ],
};
