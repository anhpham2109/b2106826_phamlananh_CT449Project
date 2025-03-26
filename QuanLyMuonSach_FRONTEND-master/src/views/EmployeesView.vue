<template>
  <div class="page-container">
    <div class="content-wrapper">
      <div class="employee-list-header">
        <h4 class="section-title">
          Danh sách Nhân viên
          <i class="fa-solid fa-users-gear"></i>
        </h4>
      </div>

      <div class="action-buttons">
        <button class="add-employee-button" @click="goToAddEmployee">
          <i class="fas fa-plus"></i>Thêm mới
        </button>
      </div>

      <EmployeeList
        v-if="filteredEmployeesCount > 0"
        :employees="filteredEmployees"
        v-model:activeIndex="activeIndex"
      />
      <p v-else class="no-employee-message">Không có Nhân viên nào.</p>
    </div>
  </div>
</template>

<script>
import EmployeeList from '@/components/EmployeeList.vue';
import EmployeeService from '@/services/employee.service';

export default {
  components: {
    EmployeeList,
  },
  data() {
    return {
      employees: [],
      activeIndex: -1,
    };
  },
  computed: {
    employeeStrings() {
      return this.employees.map((employee) => {
        const { TenNXB, DiaChi } = employee;
        return [TenNXB, DiaChi].join('');
      });
    },
    filteredEmployees() {
      return this.employees;
    },
    activeEmployee() {
      if (this.activeIndex < 0) return null;
      return this.filteredEmployees[this.activeIndex];
    },
    filteredEmployeesCount() {
      return this.filteredEmployees.length;
    },
  },
  methods: {
    async retrieveEmployees() {
      try {
        this.employees = await EmployeeService.getAllEmployees();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveEmployees();
      this.activeIndex = -1;
    },
    goToAddEmployee() {
      this.$router.push({
        name: 'employee.add',
      });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page-container {
  background-image: url('/image/hinhnen1.jpg'); /* Đặt đường dẫn hình nền của bạn */
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed; /* Giữ hình nền cố định khi cuộn */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw; /* Chiều rộng full */
  height: 100vh; /* Chiều cao full */
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed; /* Cố định toàn màn hình */
  top: 50px;
  left: 0;
  overflow: auto;
  
}

.content-wrapper {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.employee-list-header {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
}

.action-buttons {
  margin-top: 1rem;
  text-align: right;
}

.add-employee-button {
  background-color: #28a745;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.no-employee-message {
  text-align: center;
  color: #777;
}
</style>