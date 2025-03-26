<script>
export default {
  props: {
    employees: { type: Array },
    activeIndex: { type: Number, default: -1 }
  },
  emits: ['update:activeIndex'],
  methods: {
    updateActiveIndex(index) {
      this.$emit('update:activeIndex', index)
    }
  }
}
</script>

<template>
  <table class="table table-bordered table-hover">
    <thead style="background-color: gray; ">
      <tr>
        <th scope="col">STT</th>
        <th scope="col">Họ tên</th>
        <th scope="col">Email</th>
        <th scope="col">Số điện thoại</th>
        <th scope="col">Địa chỉ</th>
        <th scope="col">Chức vụ</th>
        <th scope="col">Tùy chọn</th>
      </tr>
    </thead>
    <tbody v-for="(employee, index) in employees" :key="employee._id">
      <tr>
        <td>{{ index + 1 }}</td>
        <td scope="row">{{ employee.HoTen }}</td>
        <td>{{ employee.Email }}</td>
        <td>{{ employee.DienThoai }}</td>
        <td>{{ employee.DiaChi }}</td>
        <td>{{ employee.ChucVu }}</td>
        <td>
          <router-link
            :to="{
              name: 'employee.edit',
              params: { id: employee._id }
            }"
          >
            <button class="btn btn-sm btn-warning"><i class="fas fa-edit"></i>Hiệu chỉnh</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>
