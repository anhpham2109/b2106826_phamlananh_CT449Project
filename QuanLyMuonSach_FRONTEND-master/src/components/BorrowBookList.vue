<script>
import moment from 'moment'
import BorrowBookService from '@/services/borrowBook.service'

export default {
  props: {
    borrowBooks: { type: Array },
    activeIndex: { type: Number, default: -1 }
  },
  emits: ['update:activeIndex'],
  methods: {
    updateActiveIndex(index) {
      this.$emit('update:activeIndex', index)
    },
    formatDate(date) {
      //   return date ? moment(date).format('DD/MM/YYYY') : 'Chưa trả' // Nếu `NgayTra` là null hoặc không có, sẽ hiển thị 'Chưa trả'
      return moment(date).format('DD/MM/YYYY')
    },
    async returnBook(borrowBook) {
      try {
        await BorrowBookService.returnBook(borrowBook._id)
        this.$emit('bookReturned', borrowBook)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<template>
  <table class="table table-bordered table-hover">
    <thead style="background-color: gray; "> 
      <tr>
        <th scope="col">STT</th>
        <th scope="col">Độc giả</th>
        <th scope="col">Sách</th>
        <th scope="col">Ngày mượn</th>
        <th scope="col">Ngày trả</th>
        <th scope="col">Tùy chọn</th>
      </tr>
    </thead>
    <tbody v-for="(borrowBook, index) in borrowBooks" :key="borrowBook._id">
      <tr>
        <td>{{ index + 1 }}</td>
        <td scope="row">
  <router-link
    v-if="borrowBook?.DocGia?._id"
    :to="{ name: 'borrowBooksByReader', params: { id: borrowBook.DocGia._id } }"
  >
    {{ borrowBook?.DocGia?.HoTen || 'Không xác định' }}
  </router-link>
  <span v-else class="text-danger">Dữ liệu không hợp lệ</span>
</td>
<td>
  <router-link
    v-if="borrowBook?.Sach?._id"
    :to="{ name: 'borrowBooksByBook', params: { id: borrowBook.Sach._id } }"
  >
    {{ borrowBook?.Sach?.TenSach || 'Không xác định' }}
  </router-link>
  <span v-else class="text-danger">Dữ liệu không hợp lệ</span>
</td>

        <td>{{ formatDate(borrowBook.NgayMuon) }}</td>
        <td v-if="borrowBook.NgayTra">{{ formatDate(borrowBook.NgayTra) }}</td>
        <td v-else class="text-danger">Chưa trả</td>
        <td>
          <!-- CHỨC NĂNG TRẢ SÁCH -->
          <button
            v-if="!borrowBook.NgayTra"
            type="button"
            class="ml-2 btn btn-success"
            @click="returnBook(borrowBook)"
          >
            Trả sách
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
