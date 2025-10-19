import { api } from "@workspace/backend/_generated/api";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";

export const useGetCurrentUserQuery = () =>
  useQuery({
    ...convexQuery(api.users.queries.getCurrentUser, {}),
  });
