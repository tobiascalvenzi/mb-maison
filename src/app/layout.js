import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
  <header className="bg-white border-b border-zinc-200/60 shadow-sm">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex justify-between items-center py-8">
        <Link href="/" className="text-2xl font-serif font-bold text-zinc-900 hover:text-zinc-700 transition-colors">
          MB Maison
        </Link>
        <nav className="hidden md:flex space-x-12">
          <Link href="/" className="uppercase tracking-wide text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Home</Link>
          <Link href="/products" className="uppercase tracking-wide text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Products</Link>
          <Link href="/about" className="uppercase tracking-wide text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">About</Link>
          <Link href="/contact" className="uppercase tracking-wide text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Contact</Link>
          <Link href="/cart" className="uppercase tracking-wide text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Cart</Link>
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-900 min-h-screen flex flex-col`}
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
