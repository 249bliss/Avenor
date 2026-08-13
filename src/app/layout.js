import "./globals.css";
import SmoothScroll from "../components/layout/SmoothScroll";

export const metadata = {
  title: "AVENOR | Extraordinary Places. For Exceptional Living.",
  description: "Luxury Real Estate Landing Page",
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
