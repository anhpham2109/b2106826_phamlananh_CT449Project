import createApiClient from './api.service'

class ReaderService {
  constructor(baseUrl = '/api/docgia') {
    this.api = createApiClient(baseUrl)
  }

  async getAllReaders() {
    return (await this.api.get('/')).data
  }

  async createReader(data) {
    return (await this.api.post('/', data)).data
  }

  async getReaderById(id) {
    return (await this.api.get(`/${id}`)).data
  }

  async updateReader(id, data) {
    return (await this.api.put(`/${id}`, data)).data
  }

  async deleteReader(id) {
    return (await this.api.delete(`/${id}`)).data
  }
}

export default new ReaderService()
