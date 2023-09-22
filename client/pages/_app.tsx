import "@/styles/globals.css";
import { Dancing_Script } from "next/font/google";
import type { AppProps } from "next/app";
import theme from "@/utils/theme";
import { ThemeProvider } from "@emotion/react";
import { StyledEngineProvider } from "@mui/material/styles";
import { RsvpContextProvider } from "@/components/context/rsvpContext";
import { QueryClientProvider } from "@tanstack/react-query";

const dancing_script = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

const QueryClient = require("react-query").QueryClient;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={new QueryClient()}>
          <RsvpContextProvider>
            <Component {...pageProps} className={dancing_script.variable} />
          </RsvpContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
