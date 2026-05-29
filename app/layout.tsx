import './globals.css';
import { metadata as seoMetadata } from './utils/seo';
import {
  organizationJsonLd,
  productJsonLd,
  websiteJsonLd,
  localBusinessJsonLd,
} from './utils/jsonLd';
import { fontVariables } from './utils/fonts';
import Navbar from './components/Navbar';

export const metadata = seoMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#16a34a" />

        {/* Favicon */}
        <link rel="icon" href="/logo/logo.webp" />
        <link rel="apple-touch-icon" href="/logo/logo.webp" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      </head>
      <body className={`${fontVariables} antialiased`}>
        <div>
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
