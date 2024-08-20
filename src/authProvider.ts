// Authenticated by default
import { AuthProvider } from 'react-admin';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const baseUrl = process.env.REACT_APP_API_URL;

const authProvider: AuthProvider = {
  login: ({ email, password }) => new Promise((resolve: any, reject: any) => {
    const data = {
      email,
      password,
    };
    axios.post(`${baseUrl}/auth/login`, data)
      .then((response: any) => {
        if (response.data?.access_token) {
          const decodedResponse: any = jwt_decode(response.data.access_token);
          if (decodedResponse.user_claims?.roles.includes('ADMIN')) {
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            localStorage.setItem('decodedResponse', JSON.stringify(decodedResponse));
            resolve();
          } else {
            reject();
          }
        } else {
          reject();
        }
      }, (err) => {
        if (err.response.data.message) reject(new Error(err.response.data.message));
        else if (err.response.data.schema_errors?.password) reject(new Error(`Password: ${err.response.data.schema_errors?.password.join(' ')}`));
        else reject();
      })
      .catch(() => {
        reject();
      });
  }),
  logout: () => {
    localStorage.clear();
    return Promise.resolve();
  },
  checkError: (err) => {
    if (err && err.status === 401) {
      localStorage.removeItem('auth');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () => new Promise((resolve: any, reject: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    localStorage.getItem('access_token') ? resolve() : reject();
  }),
  // eslint-disable-next-line prefer-promise-reject-errors
  getPermissions: () => Promise.reject('Unknown method'),
  getIdentity: () => new Promise((resolve) => {
    const token = localStorage.getItem('access_token');
    axios.get(`${baseUrl}/contact`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response: any) => {
        if (response.data) {
          resolve({
            id: 'admin-user',
            fullName: `${response.data.first_name} ${response.data.last_name}`,
            avatar:
              'data:image/png;base64,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',
          });
        }
      });
  }),
};

export default authProvider;
