import "@/styles/globals.css";
import type { AppProps } from "next/app";
import theme from "@/utils/theme";
import { ThemeProvider } from "@emotion/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
