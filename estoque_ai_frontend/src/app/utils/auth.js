export function getToken() {
  const token = localStorage.getItem('token');
  const expiry = localStorage.getItem('token_expire');

  if (!token || !expiry) {
    return null;
  }

  // Token expirou, apaga token
  if (Date.now() > parseInt(expiry)) {
    clearToken();
    return null;
  }

  return token;
}

export function clearToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('token_expire');
}

export function isAuthenticated() {
  return getToken() !== null;
}

/**
 * Adiciona o token para as nossas reqs
 * @param {Headers} headers - Headers obj para modificar
 */
export function addAuthHeader(headers) {
  const token = getToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
}
