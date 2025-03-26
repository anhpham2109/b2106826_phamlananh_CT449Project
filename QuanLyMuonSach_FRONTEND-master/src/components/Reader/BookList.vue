<script>
import BorrowBookService from '@/services/borrowBook.service'

export default {
  props: {
    books: { type: Array },
    activeIndex: { type: Number, default: -1 }
  },
  emits: ['update:activeIndex'],
  methods: {
    updateActiveIndex(index) {
      this.$emit('update:activeIndex', index)
    },
    async borrowBook(book) {
      try {
        const check = await BorrowBookService.checkBookAvailable(book._id)
        console.log(check)
        if (check.available) {
          try {
            const data = {
              DocGiaId: localStorage.getItem('id'),
              SachId: book._id
            }
            await BorrowBookService.createBorrowBook(data)
            alert(`Bạn đã mượn sách "${book.TenSach}"!`)
            this.$emit('refresh-list')
          } catch (error) {
            console.log(error)
          }
        } else {
          alert(`Sách "${book.TenSach}" hiện tại đã hết. Hãy mượn sách khác nhé!`)
        }
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
    <tbody v-for="(book, index) in books" :key="book._id">
      <tr>
        <td>{{ index + 1 }}</td>
        <td scope="row">{{ book.TenSach }}</td>
        <td>
          <img
            v-if="book.HinhAnh"
            :src="book.HinhAnh"
            alt="Hình ảnh sách"
            style="max-width: 90px"
          />
        </td>
        <td>{{ book.TacGia }}</td>
        <td>{{ book.NhaXuatBan.TenNXB }}</td>
        <td>{{ book.NamXuatBan }}</td>
        <td>{{ book.SoQuyen }}</td>
        <td>{{ book.DonGia }}</td>
        <td>
          <button type="button" class="btn btn-success" @click="borrowBook(book)">Mượn sách</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
