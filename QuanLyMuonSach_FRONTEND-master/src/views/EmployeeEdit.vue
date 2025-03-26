<template>
  <div v-if="employee" class="page">
    <h4>Hiệu chỉnh Nhân viên</h4>
    <EmployeeForm
      :employee="employee"
      @submit:employee="updateEmployee"
      @delete:employee="deleteEmployee"
    />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import EmployeeForm from '@/components/EmployeeForm.vue'
import EmployeeService from '@/services/employee.service'

export default {
  components: {
    EmployeeForm
  },
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      employee: null,
      message: ''
    }
  },
  methods: {
    async getEmployee(id) {
      try {
        this.employee = await EmployeeService.getEmployeeById(id)
        console.log(this.employee)
      } catch (error) {
        console.log(error)
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: 'notfound',
          params: {
            pathMatch: this.$route.path.split('/').slice(1)
          },
          query: this.$route.query,
          hash: this.$route.hash
        })
      }
    },

    async updateEmployee(data) {
      try {
        console.log('Clicked')
        await EmployeeService.updateEmployee(this.employee._id, data)

        alert('Nhân viên được cập nhật thành công')
        this.$router.push({ name: 'employees' })
      } catch (error) {
        console.log(error)
      }
    },

    async deleteEmployee() {
      if (confirm('Bạn muốn xóa Nhân viên này?')) {
        try {
          await EmployeeService.deleteEmployee(this.employee._id)
          this.$router.push({ name: 'employees' })
        } catch (error) {
          console.log(error)
        }
      }
    }
  },

  created() {
    this.getEmployee(this.id)
    this.message = ''
  }
}
</script>
