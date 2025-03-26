<script>
export default {
  props: {
    publishers: { type: Array },
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
        <th scope="col">Tên Nhà xuất bản</th>
        <th scope="col">Địa chỉ</th>
        <th scope="col">Tùy chọn</th>
      </tr>
    </thead>
    <tbody v-for="(publisher, index) in publishers" :key="publisher._id">
      <tr>
        <td>{{ index + 1 }}</td>
        <td scope="row">{{ publisher.TenNXB }}</td>
        <td>{{ publisher.DiaChi }}</td>
        <td>
          <router-link
            :to="{
              name: 'publisher.edit',
              params: { id: publisher._id }
            }"
          >
            <button class="btn btn-sm btn-warning"><i class="fas fa-edit"></i>Hiệu chỉnh</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>
