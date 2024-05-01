import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/Providers";
import {Toaster} from 'react-hot-toast'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "sabanci-university",
  description: "sabanci-university",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body className={inter.className}>{children}
          <Toaster />
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
