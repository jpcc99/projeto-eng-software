'use client'

import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../utils/auth";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
