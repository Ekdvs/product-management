import "./globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="transition-colors duration-300">
        <div
          id="app-root"
          className="min-h-screen bg-gray-100 text-black dark:bg-gray-900 dark:text-white transition-colors duration-300"
        >
          <Toaster position="top-right" />
          {children}
        </div>
      </body>
    </html>
  );
}