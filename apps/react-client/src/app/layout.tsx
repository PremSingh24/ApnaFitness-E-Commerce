import type { Metadata } from "next";
import NavBar from "../components/navbar";
import PhoneBottomNavigation from "../components/phoneBottomNavigation";
import { Toaster } from "sonner";

const metadata: Metadata = {
  title: "ApnaFitness Online Store",
  description: "fitness and gym products platform",
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
        <PhoneBottomNavigation />
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}

export { metadata };
