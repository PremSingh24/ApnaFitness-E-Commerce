import type { Metadata } from "next";
import PhoneBottomNavigation from "../components/phoneBottomNavigation";
import { Toaster } from "sonner";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import FetchAllData from "./_app";

const metadata: Metadata = {
  title: "ApnaFitness Online Store",
  description: "fitness and gym products platform",
  verification: { google: "OK6p7AVoQrr833tUpShyCjWjGUhyw990oEAezjrhI3Y" },
  other: {
    "google-site-verification": "OK6p7AVoQrr833tUpShyCjWjGUhyw990oEAezjrhI3Y",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ height: "100%", boxSizing: "border-box" }}>
      <body
        style={{
          position: "relative",
          margin: 0,
          minHeight: "100%",
          paddingBottom: "6.7rem",
          boxSizing: "inherit",
        }}
      >
        <FetchAllData>
          <header style={{ padding: "1px" }}>
            <NavBar />
          </header>
          {children}
          <PhoneBottomNavigation />
        </FetchAllData>
        <Toaster richColors closeButton />
        <footer
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          <Footer />
        </footer>
      </body>
    </html>
  );
}

export { metadata };
