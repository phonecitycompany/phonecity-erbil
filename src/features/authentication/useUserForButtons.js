import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUserforButtons() {
  const { isLoading : isUserloading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { isUserloading, isAdmin: user?.user_metadata?.account_type == "Admin" };
}
