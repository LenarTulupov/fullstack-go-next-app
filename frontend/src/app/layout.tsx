import type { Metadata } from "next";
import Providers from "@/utils/Providers";
import "./globals.scss";
import StoreProvider from "@/store/store-provider";
import { Analytics } from "@vercel/analytics/react"

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
