import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apna Fitness",
  description: "fitness and gym products website and platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return;
  <html lang="en">
    <body>
      <div id="root">{children}</div>
    </body>
  </html>;
}
