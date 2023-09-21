import "@/styles/globals.css";
import { Dancing_Script } from "next/font/google";
import type { AppProps } from "next/app";
import theme from "@/utils/theme";
import {  ThemeProvider } from "@emotion/react";
import {StyledEngineProvider} from "@mui/material/styles"

const dancing_script = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} className={dancing_script.variable} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
