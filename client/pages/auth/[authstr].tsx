import { useAuth } from "@/components/context/authContext";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

const AuthPage = () => {
  const router = useRouter();
  const { authstr } = router.query;
  const { setAuthString } = useAuth();

  useEffect(() => {
    if (authstr === undefined) return;
    setAuthString(authstr as string);
    router.push("/");
  }, [authstr]);

  return <div></div>;
};

export default AuthPage;
