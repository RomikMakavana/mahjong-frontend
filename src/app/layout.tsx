"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store/slices/index";
import Notification from "@/components/NotificationComponent";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Provider store={store}>
            {children}
            <Notification />
          </Provider>
      </body>
    </html>
  );
}
