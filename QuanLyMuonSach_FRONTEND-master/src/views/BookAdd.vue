<template>
  <div class="page">
    <h4>Thêm Sách</h4>
    <BookForm :book="book" @submit:book="createBook" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import BookForm from '@/components/BookForm.vue'
// import BookService from '@/services/book.service'
import axios from 'axios'

export default {
  components: {
    BookForm
  },
  data() {
    return {
      book: {
        TenSach: ''
      },
      message: ''
    }
  },
  methods: {
    async createBook(data) {
      try {
        const formData = new FormData()
        formData.append('TenSach', data.TenSach)
        formData.append('HinhAnh', data.HinhAnh) // Append file directly
        formData.append('TacGia', data.TacGia)
        formData.append('NamXuatBan', data.NamXuatBan)
        formData.append('SoQuyen', data.SoQuyen)
        formData.append('DonGia', data.DonGia)
        formData.append('NXBId', data.NhaXuatBan)
        // console.log(formData)

        await axios.post('http://127.0.0.1:3000/api/sach/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        alert('Sách được thêm mới thành công')
        this.$router.push({ name: 'books' })
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
