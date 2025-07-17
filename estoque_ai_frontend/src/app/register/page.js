import AuthForm from '../../components/AuthForm';

export default function Register() {
  const BASE_URL = "http://localhost:3001/api/auth";
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-10'>
        <AuthForm
          isLogin={false}
          apiEndpoint={`${BASE_URL}/cadastro`}
          redirectPath='/login'
          successMessage='Cadastro efetuado! Redirecionando...'
        />
      </div>
    </div >
  );
}
