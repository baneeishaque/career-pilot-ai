import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareerPilot AI - Automate Your Job Application",
  description: "Leverage AI agents and MCP servers to validate your resume, analyze job requirements, and generate tailored cover letters and resumes in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" rel="stylesheet" />
      </head>
      <body className="bg-black text-on-surface min-h-full antialiased">
        {children}
      </body>
    </html>
  );
}
