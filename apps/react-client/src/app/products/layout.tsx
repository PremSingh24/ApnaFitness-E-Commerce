import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ApnaFitness All Fitness Product Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
