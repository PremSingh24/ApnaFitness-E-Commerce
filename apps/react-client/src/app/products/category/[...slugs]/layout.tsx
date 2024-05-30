import { Metadata } from "next";
type props = {
  params: {
    slugs: string[];
  };
};

export const generateMetadata = ({ params }: props): Metadata => {
  return {
    title: `Apna Fitness ${params.slugs[0]} products`,
  };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
