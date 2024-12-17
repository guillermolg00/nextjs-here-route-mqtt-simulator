import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";
import { HereServiceProvider } from "./layouts/HereServiceContext";
import { environment } from "./environment";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Next.js Here Route MQTT Simulator",
    template: "",
  },
  description: "Simulate a driver’s movement along a HERE Routing API route and publish positions to MQTT. Includes a frontend form for credentials and HERE Maps visualization. Styled with Tailwind CSS and easily deployable",
  openGraph: {
    title: "Next.js Here Route MQTT Simulator",
    description: "Simulate a driver’s movement along a HERE Routing API route and publish positions to MQTT. Includes a frontend form for credentials and HERE Maps visualization. Styled with Tailwind CSS and easily deployable",
    url: baseUrl,
    siteName: "Next.js Here Route MQTT Simulator",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-black bg-white dark:text-white dark:bg-black",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          <HereServiceProvider
            config={{
              apiKey: environment.HERE_API_KEY,
              appId: environment.HERE_APP_ID,
            }}
          >
            {children}
          </HereServiceProvider>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
