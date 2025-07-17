//'use client'

import "./globals.css";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isAuthenticated } from "./utils/auth";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const protectedRoutes = ['/dashboard'];
    const isProtected = protectedRoutes.includes(router.pathname);

    if (isProtected && !isAuthenticated()) {
      router.push('/login');
    }
  }, [router.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}
