import createApiClient from './api.service'

class PublisherService {
  constructor(baseUrl = '/api/nhaxuatban') {
    this.api = createApiClient(baseUrl)
  }

  async getAllPublishers() {
    return (await this.api.get('/')).data
  }

  async createPublisher(data) {
    return (await this.api.post('/', data)).data
  }

  async getPublisherById(id) {
    return (await this.api.get(`/${id}`)).data
  }

  async updatePublisher(id, data) {
    return (await this.api.put(`/${id}`, data)).data
  }

  async deletePublisher(id) {
    return (await this.api.delete(`/${id}`)).data
  }
}

export default new PublisherService()
