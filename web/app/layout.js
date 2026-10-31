import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import styles from './layout.module.css';
import "./globals.css";
import { NotificationProvider } from "./context/NotificationContext";
import NotificationStatus from "./context/NotificationStatus";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Yumi",
    template: "%s | Yumi",
  },
  description: "Anime List REST API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <NotificationProvider>
          <header className={styles.header}>
            <Link className={styles.logo} href='/'>
              <Image src='/logo.svg' width={64} height={64} alt="Logo" />
              Yumi
            </Link>
            <nav className={styles.nav}>
              <Link href='/watchlists'>Your watchlists</Link>
              <Link href='/watchlist-entries'>Watchlist entries</Link>
              <Link href='/search'>Search Anime</Link>
            </nav>
          </header>
          <main className={styles.main}>
            <NotificationStatus />
            {children}
          </main>
        </NotificationProvider>
      </body>
    </html>
  );
}
