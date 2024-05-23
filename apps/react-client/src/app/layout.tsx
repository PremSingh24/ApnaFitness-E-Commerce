import type { Metadata } from "next";
import NavBar from "../components/navbar";

export const metadata: Metadata = {
  title: "ApnaFitness",
  description: "fitness and gym products website and platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: "1px" }}>
          <NavBar />
        </header>
        {children}
      </body>
    </html>
  );
}
