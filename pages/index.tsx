import { Inter } from "next/font/google";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Main from '@/components/Main';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar/>
      <Main/>
      <Footer />
    </>
  );
}
