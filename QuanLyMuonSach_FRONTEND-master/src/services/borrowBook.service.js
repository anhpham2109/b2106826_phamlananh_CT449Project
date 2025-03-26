import createApiClient from './api.service'

class BorrowBookService {
  constructor(baseUrl = '/api/theodoimuonsach') {
    this.api = createApiClient(baseUrl)
  }

  async getAllBorrowBooks() {
    return (await this.api.get('/')).data
  }

  async getAllBorrowBooksByReaderId(id) {
    return (await this.api.get(`/docgia/${id}`)).data
  }

  async getAllBorrowBooksByBookId(id) {
    return (await this.api.get(`/sach/${id}`)).data
  }

  async createBorrowBook(data) {
    return (await this.api.post('/muonsach', data)).data
  }

  async returnBook(id) {
    return (await this.api.put(`/trasach/${id}`)).data
  }

  async checkBookAvailable(id) {
    return (await this.api.get(`/kiemTraSachCoSan/${id}`)).data
  }
}

export default new BorrowBookService()
