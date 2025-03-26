import createApiClient from './api.service'

class EmployeeService {
  constructor(baseUrl = '/api/nhanvien') {
    this.api = createApiClient(baseUrl)
  }

  async getAllEmployees() {
    return (await this.api.get('/')).data
  }

  async createEmployee(data) {
    return (await this.api.post('/', data)).data
  }

  async getEmployeeById(id) {
    return (await this.api.get(`/${id}`)).data
  }

  async updateEmployee(id, data) {
    return (await this.api.put(`/${id}`, data)).data
  }

  async deleteEmployee(id) {
    return (await this.api.delete(`/${id}`)).data
  }
}

export default new EmployeeService()
