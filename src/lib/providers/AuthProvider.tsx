"use client";

import { ApolloProvider } from "@apollo/client/react";
import { SaleorAuthProvider } from "@saleor/auth-sdk/react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { createSaleorAuthClient } from "@saleor/auth-sdk";

const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_API_URL!;

const getServerAuthClient = () => {
  //   const nextServerCookiesStorage = getNextServerCookiesStorage();
  return createSaleorAuthClient({
    saleorApiUrl: saleorApiUrl,
  });
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const saleorAuthClient = getServerAuthClient();

  const httpLink = new HttpLink({
    uri: saleorApiUrl,
    fetch: saleorAuthClient.fetchWithAuth,
  });

  const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return (
    <SaleorAuthProvider client={saleorAuthClient}>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </SaleorAuthProvider>
  );
}
