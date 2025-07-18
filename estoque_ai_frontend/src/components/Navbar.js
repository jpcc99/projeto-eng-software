'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, clearToken, isAuthenticated } from '../app/utils/auth'

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const BASE_URL = "http://localhost:3001/api"

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = isAuthenticated();
      setIsLoggedIn(loggedIn);

      // Fetch tipo_usuario
      if (loggedIn) {
        try {
          const response = await fetch(`${BASE_URL}/usuario`, {
            headers: {
              'Authorization': `Bearer ${getToken()}`
            }
          });

          if (response.ok) {
            const userResponse = await response.json();
            const userData = userResponse.data;
            setUserType(userData.tipo_usuario);

            // Fetch notifications
            const notificationsResponse = await fetch(`${BASE_URL}/notificacoes`, {
              headers: {
                'Authorization': `Bearer ${getToken()}`
              }
            });

            if (notificationsResponse.ok) {
              const notificationsData = notificationsResponse.json();
              setNotifications(notificationsData.data);
            }
          }

        } catch (err) {
          console.error(`Error ao buscar dados de usuário: ${err}`);
        }
      }
    };

    checkAuth();
  }, [router.pathname]);

  const handleLogout = () => {
    clearToken();
    setIsLoggedIn(false);
    router.push('/');
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`${BASE_URL}/notificacoes${id}/marcar-lida`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });

      // Update notficações locais
      setNotifications(notifications.map(notif => notif.id_notificacao === id ? { ...notif, lida: true } : notif));
    } catch (err) {
      console.error(`Erro ao marcar notificação como lida ${err}`);
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href={isLoggedIn ? "/dashboard" : "/"} className="text-xl font-semibold text-gray-800">
          Estoque_ai
        </Link>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-1 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {notifications.some(n => !n.lida) && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden z-20">
                    <div className="py-1">
                      {notifications.length > 0 ? (
                        notifications.map(notification => (
                          <div
                            key={notification.id_notificacao}
                            className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${!notification.lida ? 'bg-blue-50' : ''}`}
                            onClick={() => {
                              markAsRead(notification.id_notificacao);
                              // Navigate based on notification type
                              if (notification.tipo === 'solicitacao') {
                                router.push(`/solicitacoes/${notification.id_referencia}`);
                              }
                            }}
                          >
                            <p className="text-sm font-medium text-gray-800">{notification.mensagem}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(notification.data_hora).toLocaleString()}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="px-4 py-2 text-sm text-gray-500">Nenhuma notificação</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User role-based menu */}
              <div className="hidden md:flex space-x-4">
                {userType === 'Usuario' && (
                  <>
                    <Link href="/solicitacoes/nova" className="text-gray-600 hover:text-gray-900">
                      Nova Solicitação
                    </Link>
                    <Link href="/solicitacoes/minhas" className="text-gray-600 hover:text-gray-900">
                      Minhas Solicitações
                    </Link>
                  </>
                )}

                {userType === 'Coordenador' && (
                  <>
                    <Link href="/solicitacoes" className="text-gray-600 hover:text-gray-900">
                      Solicitações
                    </Link>
                    <Link href="/planejamentos/novo" className="text-gray-600 hover:text-gray-900">
                      Novo Planejamento
                    </Link>
                    <Link href="/planejamentos" className="text-gray-600 hover:text-gray-900">
                      Planejamentos
                    </Link>
                    <Link href="/usuarios/adicionar" className="text-gray-600 hover:text-gray-900">
                      Adicionar Usuário
                    </Link>
                  </>
                )}

                {userType === 'ControleMateriais' && (
                  <>
                    <Link href="/materiais" className="text-gray-600 hover:text-gray-900">
                      Materiais
                    </Link>
                    <Link href="/planejamentos" className="text-gray-600 hover:text-gray-900">
                      Planejamentos
                    </Link>
                  </>
                )}

                {userType === 'Admin' && (
                  <>
                    <Link href="/usuarios" className="text-gray-600 hover:text-gray-900">
                      Usuários
                    </Link>
                    <Link href="/setores" className="text-gray-600 hover:text-gray-900">
                      Setores
                    </Link>
                  </>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <Link href="/register" className="text-gray-600 hover:text-gray-900">
                Registrar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav >
  );
}
