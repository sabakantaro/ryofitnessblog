import '../styles/globals.css';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Footer from '@/components/Footer';
import Head from './head';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <Head />
      <body>
        <Header />
        <Banner />
        {children}
        <Footer />
      </body>
    </html>
  );
}
