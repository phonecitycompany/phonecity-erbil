import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useCurrentUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["userforediting"],
    queryFn: getCurrentUser,
  });

  return { isLoading, user};
}
