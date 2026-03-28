import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Student Portfolio | Caution Tape Robotics",
  description: "Showcasing student projects from Caution Tape Robotics classes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
