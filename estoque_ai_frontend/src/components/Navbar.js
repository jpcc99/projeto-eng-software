import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold text-gray-800">
          Estoque_ai
        </Link>
        <div className="flex space-x-4">
          <Link href="/login" className="text-gray-600 hover:text-gray-900">
            Login
          </Link>
          <Link href="/register" className="text-gray-600 hover:text-gray-900">
            Cadastro
          </Link>
        </div>
      </div>
    </nav>
  );
}
