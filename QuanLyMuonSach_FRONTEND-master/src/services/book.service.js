import createApiClient from './api.service'

class BookService {
  constructor(baseUrl = '/api/sach') {
    this.api = createApiClient(baseUrl)
  }

  async getAllBooks() {
    return (await this.api.get('/')).data
  }

  async createBook(data) {
    return (await this.api.post('/', data)).data
  }

  async getBookById(id) {
    return (await this.api.get(`/${id}`)).data
  }

  async updateBook(id, data) {
    return (await this.api.put(`/${id}`, data)).data
  }

  async deleteBook(id) {
    return (await this.api.delete(`/${id}`)).data
  }
}

export default new BookService()
