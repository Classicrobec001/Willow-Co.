import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import brand from "@/config/brand";

export const metadata: Metadata = {
  title: `${brand.name} — Book Online`,
  description: brand.description,
};

// Every brand color lives in one place (src/config/brand.ts). This tag turns
// that object into the CSS variables globals.css maps into Tailwind's color
// utilities — so reskinning the whole app is a data change, not a code change.
function BrandStyleTag() {
  const c = brand.colors;
  const css = `:root{
    --brand-primary:${c.primary};
    --brand-primary-foreground:${c.primaryForeground};
    --brand-secondary:${c.secondary};
    --brand-secondary-foreground:${c.secondaryForeground};
    --brand-accent:${c.accent};
    --brand-background:${c.background};
    --brand-foreground:${c.foreground};
    --brand-muted:${c.muted};
    --brand-muted-foreground:${c.mutedForeground};
    --brand-border:${c.border};
  }`;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <BrandStyleTag />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
