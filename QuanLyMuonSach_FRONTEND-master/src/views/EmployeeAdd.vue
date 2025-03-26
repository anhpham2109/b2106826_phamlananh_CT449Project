<template>
  <div class="page">
    <h4>Thêm Nhân viên</h4>
    <EmployeeForm :employee="employee" @submit:employee="createEmployee" />
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
  data() {
    return {
      employee: {
        HoTen: ''
      },
      message: ''
    }
  },
  methods: {
    async createEmployee(data) {
      try {
        // console.log(data)
        await EmployeeService.createEmployee(data)
        alert('Nhân viên được thêm mới thành công')
        this.$router.push({ name: 'employees' })
      } catch (error) {
        console.log(error)
      }
    }
  },

  created() {
    this.message = ''
  }
}
</script>
