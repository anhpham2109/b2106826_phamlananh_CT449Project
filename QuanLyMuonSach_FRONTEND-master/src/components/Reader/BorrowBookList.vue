<script>
import moment from 'moment'
// import BorrowBookService from '@/services/borrowBook.service'

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
    test(sach) {
      console.log(sach)
    }
    // async returnBook(borrowBook) {
    //   try {
    //     await BorrowBookService.returnBook(borrowBook._id)
    //     this.$emit('bookReturned', borrowBook)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  }
}
</script>

<template >
  <table class="table table-bordered table-hover">
    <thead style="background-color: gray; ">
      <tr>
        <th scope="col">STT</th>
        <th scope="col">Sách</th>
        <th scope="col">Ngày mượn</th>
        <th scope="col">Ngày trả</th>
        <th scope="col">Tùy chọn</th>
      </tr>
    </thead>
    <tbody v-for="(borrowBook, index) in borrowBooks" :key="borrowBook._id">
      <tr>
        <td>{{ index + 1 }}</td>
        <td @click="test(borrowBook.Sach)">
          {{ borrowBook.Sach.TenSach }}
        </td>
        <td>{{ formatDate(borrowBook.NgayMuon) }}</td>
        <td v-if="borrowBook.NgayTra">{{ formatDate(borrowBook.NgayTra) }}</td>
        <td v-else class="text-danger">Chưa trả</td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>
