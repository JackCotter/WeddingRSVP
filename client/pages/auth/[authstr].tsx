import { useAuth } from "@/components/context/authContext";
import { CircularProgress, Stack, Typography } from "@mui/material";
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

  return (
    <Stack
      direction="row"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        direction="column"
        spacing={2}
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress
          style={{
            display: "flex",
          }}
        />
        <Typography> Authenticating... </Typography>
      </Stack>
    </Stack>
  );
};

export default AuthPage;
