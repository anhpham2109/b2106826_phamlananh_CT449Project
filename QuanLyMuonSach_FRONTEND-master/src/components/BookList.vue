<template>
  <div>
    <!-- Bảng Danh sách Sách -->
    <table class="table table-bordered table-hover">
      <thead style="background-color: gray; ">
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên Sách</th>
          <th scope="col">Hình Ảnh</th>
          <th scope="col">Tác giả</th>
          <th scope="col">Nhà xuất bản</th>
          <th scope="col">Năm xuất bản</th>
          <th scope="col">Số quyển</th>
          <th scope="col">Đơn giá</th>
          <th scope="col">Tùy chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in books" :key="book._id">
          <td>{{ index + 1 }}</td>
          <td scope="row">
            <a href="#" @click.prevent="openModal(book)">{{ book.TenSach }}</a>
          </td>
          <td>
            <img
              v-if="book.HinhAnh"
              :src="book.HinhAnh"
              alt="Hình ảnh sách"
              style="max-width: 80px"
              @click.prevent="openModal(book)"
            />
          </td>
          <td>{{ book.TacGia }}</td>
          <td>{{ book.NhaXuatBan.TenNXB }}</td>
          <td>{{ book.NamXuatBan }}</td>
          <td>{{ book.SoQuyen }}</td>
          <td>{{ book.DonGia }}</td>
          <td>
            <router-link :to="{ name: 'book.edit', params: { id: book._id } }">
              <button class="btn btn-sm btn-warning"><i class="fas fa-edit"></i> Hiệu chỉnh</button>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Chi tiết Sách -->
    <div v-if="isModalOpen" class="modal fade show" style="display: block">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{ selectedBook.TenSach }}</h4>
            <button type="button" class="close" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body container-fluid">
            <div class="row">
              <div class="col-5" v-if="selectedBook.HinhAnh">
                <!-- <p><strong>Hình ảnh:</strong></p> -->
                <img :src="selectedBook.HinhAnh" alt="Hình ảnh sách" style="max-width: 100%" />
              </div>
              <div class="col-7">
                <p><strong>Tác giả:</strong> {{ selectedBook.TacGia }}</p>
                <p><strong>Nhà xuất bản:</strong> {{ selectedBook.NhaXuatBan.TenNXB }}</p>
                <p><strong>Năm xuất bản:</strong> {{ selectedBook.NamXuatBan }}</p>
                <p><strong>Số quyển:</strong> {{ selectedBook.SoQuyen }}</p>
                <p><strong>Đơn giá:</strong> {{ selectedBook.DonGia }}</p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <router-link :to="{ name: 'book.edit', params: { id: selectedBook._id } }">
              <button class="btn btn-sm btn-warning"><i class="fas fa-edit"></i> Hiệu chỉnh</button>
            </router-link>
            <!-- <button type="button" class="btn btn-secondary" @click="closeModal">Đóng</button> -->
          </div>
        </div>
      </div>
    </div>

    <!-- Overlay khi modal mở -->
    <div v-if="isModalOpen" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
export default {
  props: {
    books: { type: Array },
    activeIndex: { type: Number, default: -1 }
  },
  emits: ['update:activeIndex'],
  data() {
    return {
      isModalOpen: false,
      selectedBook: null
    }
  },
  methods: {
    updateActiveIndex(index) {
      this.$emit('update:activeIndex', index)
    },
    openModal(book) {
      this.selectedBook = book // Lưu thông tin sách đã chọn
      this.isModalOpen = true // Mở modal
    },
    closeModal() {
      this.isModalOpen = false // Đóng modal
      this.selectedBook = null // Xóa thông tin sách
    }
  }
}
</script>

<style scoped>
/* CSS cho modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
  overflow: hidden;
  outline: 0;
}
.modal-dialog {
  max-width: 700px;
  margin: 1.75rem auto;
}
.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}
</style>
