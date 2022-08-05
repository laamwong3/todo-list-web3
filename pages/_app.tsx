import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import darkTheme from "../configs/darkTheme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MoralisProvider
        appId={process.env.NEXT_PUBLIC_APP_ID ?? ""}
        serverUrl={process.env.NEXT_PUBLIC_SERVER_URL ?? ""}
      >
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </MoralisProvider>
    </>
  );
}

export default MyApp;
