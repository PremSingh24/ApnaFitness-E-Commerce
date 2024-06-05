import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ApnaFitness All Products Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
