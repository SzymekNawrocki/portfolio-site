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
import { sanityFetch } from "@/sanity/lib/live";
import { HEADER_QUERY, FOOTER_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { JetBrains_Mono } from "next/font/google";

const jbMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-jb-mono",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { data: settings } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
    params: { lang },
  });

  return {
    title: settings?.title || "Devemite",
    description: settings?.description,
  };
}

export default async function FrontendLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const messages = await getMessages();

  const [headerData, footerData, settingsData] = await Promise.all([
    sanityFetch({ query: HEADER_QUERY, params: { lang } }),
    sanityFetch({ query: FOOTER_QUERY, params: { lang } }),
    sanityFetch({ query: SITE_SETTINGS_QUERY, params: { lang } }),
  ]);

  return (
    <html lang={lang} className={jbMono.variable} suppressHydrationWarning>
      <body className="bg-background min-h-screen antialiased">
          <NextIntlClientProvider locale={lang} messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header data={headerData.data} />
              {children}
              <Footer data={footerData.data} copyrightText={settingsData.data?.copyrightText ?? undefined} />
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
  );
}
