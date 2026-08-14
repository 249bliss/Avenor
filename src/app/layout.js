import "./globals.css";
import SmoothScroll from "../components/layout/SmoothScroll";

export const metadata = {
  title: "AVENOR | Extraordinary Places. For Exceptional Living.",
  description: "Avenor Homes curates exceptional luxury residences in the world’s most desirable locations, connecting discerning buyers with timeless architecture and enduring value.",
  icons: {
    icon: '/assets/favicon.png',
  },
  openGraph: {
    title: "AVENOR | Extraordinary Places. For Exceptional Living.",
    description: "Avenor Homes curates exceptional luxury residences in the world’s most desirable locations, connecting discerning buyers with timeless architecture and enduring value.",
    images: [
      {
        url: '/assets/website_social_cover.jpg',
        width: 1200,
        height: 630,
        alt: 'AVENOR Homes',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "AVENOR | Extraordinary Places. For Exceptional Living.",
    description: "Avenor Homes curates exceptional luxury residences in the world’s most desirable locations, connecting discerning buyers with timeless architecture and enduring value.",
    images: ['/assets/website_social_cover.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style>
          {`
            @font-face {
              font-family: 'Metropolis';
              src: local('Metropolis Regular'), local('Metropolis-Regular');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
          `}
        </style>
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
