<script>
export default {
  props: {
    readers: { type: Array },
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
        <th scope="col">Phái</th>
        <th scope="col">Địa chỉ</th>
        <th scope="col">Số điện thoại</th>
        <th scope="col">Tùy chọn</th>
      </tr>
    </thead>
    <tbody v-for="(reader, index) in readers" :key="reader._id">
      <tr>
        <td>{{ index + 1 }}</td>
        <td scope="row">{{ reader.HoTen }}</td>
        <td>{{ reader.Email }}</td>
        <td v-if="reader.Phai">Nữ</td>
        <td v-else>Nam</td>
        <td>{{ reader.DiaChi }}</td>
        <td>{{ reader.DienThoai }}</td>
        <td>
          <router-link
            :to="{
              name: 'reader.edit',
              params: { id: reader._id }
            }"
          >
            <button class="btn btn-sm btn-warning"><i class="fas fa-edit"></i>Hiệu chỉnh</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>
