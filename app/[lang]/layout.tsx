import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { DisableDraftMode } from "@/components/sanity/disable-draft-mode";
import { Header } from "@/components/layout/header";
import { SanityLive } from "@/sanity/lib/live";
import { Metadata } from "next";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Devemite - Where every grain holds a story",
  description:
    "Devemite - Where every grain holds a story. A portfolio/blog website of a developer Szymon Nawrocki",
};

export default async function FrontendLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const messages = await getMessages();

  return (
    <>
      <html lang={lang} suppressHydrationWarning>
        <head />
        <body className="bg-background min-h-screen">
          <NextIntlClientProvider locale={lang} messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              {children}
              <Footer />
            </ThemeProvider>
          </NextIntlClientProvider>
          <SanityLive />
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}
        </body>
      </html>
    </>
  );
}
