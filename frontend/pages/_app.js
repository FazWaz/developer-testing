import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
  }, []);

  return (
    <ApolloProvider client={client}>
      <div className={roboto.className}>
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
}

export default MyApp;
