import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import ApolloWrapper from "@/lib/apollo-wrapper";
import Header from "./components/Elements/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Real Estate App",
  description: "Real Estate App focused on Search feature, created with NextJS, MySQL and GraphQL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Header />
            {children}
          </div>
        </ApolloWrapper>
      </body>
    </html>
  );
}
