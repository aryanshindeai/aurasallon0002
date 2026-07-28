import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aura The Salon | The Billion-Dollar Luxury Salon Experience',
  description: 'Step into Aura The Salon, Chandrapur. World-class hair coloring, silk keratin treatments, HD bridal couture, 24K gold hydra facials, and AI hair consultation.',
  keywords: [
    'Aura The Salon',
    'Luxury Salon Chandrapur',
    'Best Salon Chandrapur',
    'Hair Spa Chandrapur',
    'Bridal Makeup Chandrapur',
    'Keratin Chandrapur',
    'Hair Color Chandrapur'
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#070606] text-[#F7F4EF] antialiased selection:bg-[#D4AF37] selection:text-black min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
