import AuthForm from '../../components/AuthForm';

export default function Login() {
  const BASE_URL = "http://localhost:3001/api/auth";
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-10'>
        <AuthForm
          isLogin={true}
          apiEndpoint={`${BASE_URL}/login`}
          redirectPath='/dashboard'
          successMessage='Login efetuado! Redirecionando...'
        />
      </div>
    </div >
  );
}
