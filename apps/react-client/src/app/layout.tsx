import type { Metadata } from "next";
import PhoneBottomNavigation from "../components/phoneBottomNavigation";
import { Toaster } from "sonner";
import Footer from "../components/footer";
import NavBar from "../components/navbar";

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
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}

export { metadata };
