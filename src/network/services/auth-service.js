import { logout } from '../../store/ducks/auth';
import BaseService from '@/network/base-service'

class AuthService extends BaseService {
  constructor() {
    super(`${process.env.REACT_APP_API_BASE_URL}/users`)
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    return logout();
  }

  login(payload) {
    return this.post(payload, 'login')
  }

  signUp(payload) {
    return this.post(payload, 'signup')
  }
}

export default new AuthService()
