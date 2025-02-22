import type { Metadata } from "next";
import Providers from "@/utils/Providers";
import StoreProvider from "@/store/store-provider";
import { Analytics } from "@vercel/analytics/react"
import "./globals.scss";

export const metadata: Metadata = {
  title: "Simple Retro | Women Designed, Everyday Retro.",
  icons: {
    icon: "/favicon/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Providers>
            {children}
            <Analytics />
            <div id="dropdown-root" />
          </Providers>
        </StoreProvider>
      </body>
    </html >
  );
}
