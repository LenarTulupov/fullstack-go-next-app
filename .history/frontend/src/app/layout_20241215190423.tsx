import type { Metadata } from "next";
import StoreProvider from "@/store/StoreProvider";
import Providers from "@/utils/Providers";
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
            <div id="dropdown-root" />
          </Providers>
        </StoreProvider>
      </body>
    </html >
  );
}
