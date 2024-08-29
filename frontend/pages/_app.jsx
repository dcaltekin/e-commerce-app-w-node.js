import "@/styles/globals.css";
import { TokenProvider } from "../context/TokenContext";
import "../i18n";
export default function App({ Component, pageProps }) {
  return (
    <TokenProvider>
      <Component {...pageProps} />
    </TokenProvider>
  );
}
