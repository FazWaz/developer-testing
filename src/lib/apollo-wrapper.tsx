// 'use-client';
// import { getClient } from "./client";
// import { ApolloProvider } from "@apollo/client";

// const client = getClient();

// const ApolloWrapper = ({ children }: React.PropsWithChildren<{}>) => {
//   return <ApolloProvider client={client}>{children}</ApolloProvider>
// };

// export default ApolloWrapper;

"use client";
import { getClient } from "./client";
import { ApolloProvider } from "@apollo/client";

const client = getClient();
const ApolloWrapper = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};

export default ApolloWrapper;