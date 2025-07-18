"use client"

import Link from 'next/link';
import Navbar from '../components/Navbar';
import { isAuthenticated } from './utils/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  useState(() => {
    if (isAuthenticated()) {
      router.push("/dashboard");
    }
  }, []);
  return (
    <div className='min-h-scren bg-gray-50'>
      <Navbar />
      <main className='container mx-auto px-4 py-10'>
        <div className='max-w-2x1 mx-autho text-center'>
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Bem-vindo ao Estoque_ai</h1>
          <p className='text-lg text-gray-600 mb-8'>
            Um projeto de Engenharia de Software para Controle de Materiais de Escritório.
            Por favor, faça o login para acessar nossos serviços, ou cadastre-se se você é novo aqui.
          </p>
          <div className='flex justify-center gap-4'>
            <Link href="/login" className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
              Login
            </Link>
            <Link href="/register" className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
              Cadastre-se
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
