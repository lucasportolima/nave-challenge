import BaseService from '@/network/base-service'

class NaverService extends BaseService {
  constructor() {
    super(`${process.env.REACT_APP_API_BASE_URL}/navers`)
  }

  index() {
    return this.get();
  }

  create(payload) {
    return this.post(payload);
  }

  show(id) {
    return this.get(`${id}`);
  }

  update({ data, id }) {
    return this.put(data, `${id}`);
  }

  delete(id) {
    return this.delete(`${id}`)
  }
}

export default new NaverService()
