import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MB Maison",
  description: "Italian craftsmanship, sustainability, and elegance for your home.",
  openGraph: {
    title: "MB Maison",
    description: "Italian craftsmanship, sustainability, and elegance for your home.",
    images: ['/og.jpg'],
  },
};

const Header = () => (
  <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-zinc-200">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <Link href="/" className="flex items-center">
          <Image src="/logo-grey.png" alt="MB Maison" width={120} height={40} className="h-8 w-auto" priority />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Home</Link>
          <Link href="/products" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Products</Link>
          <Link href="/customize" className="text-sm font-medium text-zinc-900 hover:text-white hover:bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-900 transition-all">Customize</Link>
          <Link href="/about" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">About</Link>
          <Link href="/contact" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Contact</Link>
          <Link href="/cart" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Cart</Link>
        </nav>
        <div className="md:hidden">
          <Link href="/cart" className="text-sm border border-zinc-900 text-zinc-900 px-4 py-2 rounded-xl hover:bg-zinc-900 hover:text-white transition-all">
            Cart
          </Link>
        </div>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-white border-t border-zinc-200/60 py-12">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 text-sm text-zinc-500">
        <span>© {new Date().getFullYear()}</span>
        <span>•</span>
        <Link href="/privacy" className="hover:text-zinc-700 transition-colors">Privacy</Link>
        <span>•</span>
        <Link href="/terms" className="hover:text-zinc-700 transition-colors">Terms</Link>
      </div>
    </div>
  </footer>
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-zinc-800 min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
