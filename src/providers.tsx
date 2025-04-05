"use client";

import { type ReactNode } from "react";

import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export function PProvider(props: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider
        appId="cm94529q900hbl50me614q6sf"
        clientId="client-WY5iiuipR1MQhrieGfivT6z7WiWtGVpsyHqxsFowH1qGG"
        config={{
          appearance: {
            theme: "light",
            accentColor: "#676FFF",
            logo: "https://your-logo-url",
          },
          loginMethods: ["farcaster"],
          embeddedWallets: { createOnLogin: "users-without-wallets" },
        }}
      >
        {props.children}
      </PrivyProvider>
    </QueryClientProvider>
  );
}
