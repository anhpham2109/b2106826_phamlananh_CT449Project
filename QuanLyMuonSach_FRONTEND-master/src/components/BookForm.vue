<template>
  <Form @submit="submitBook" :validation-schema="bookFormSchema" enctype="multipart/form-data">
    <div class="form-group">
      <label for="TenSach">Tên Sách:</label>
      <Field name="TenSach" type="text" class="form-control" v-model="bookLocal.TenSach" />
      <ErrorMessage name="TenSach" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="HinhAnh">Hình ảnh:</label>
      <Field
        name="HinhAnh"
        type="file"
        class="form-control"
        v-model="bookLocal.HinhAnh"
        @change="previewImage"
      />
      <ErrorMessage name="HinhAnh" class="error-feedback" />
      <!-- Hiển thị hình ảnh xem trước -->
      <div v-if="imagePreview" class="mt-2 ml-5">
        <p>Hình ảnh xem trước:</p>
        <img :src="imagePreview" alt="Preview" class="img-thumbnail" style="max-width: 160px" />
      </div>
    </div>

    <div class="form-group">
      <label for="TacGia">Tác giả:</label>
      <Field name="TacGia" type="text" class="form-control" v-model="bookLocal.TacGia" />
      <ErrorMessage name="TacGia" class="error-feedback" />
    </div>

    <div class="form-group" v-if="bookLocal.NhaXuatBan">
      <label for="NhaXuatBan">Nhà xuất bản:</label>
      <select name="NhaXuatBan" class="form-control" v-model="this.bookLocal.NhaXuatBan._id">
        <option
          v-for="nxb in publishers"
          :key="nxb._id"
          :value="nxb._id"
          :selected="nxb._id === bookLocal.NhaXuatBan?._id"
        >
          {{ nxb.TenNXB }}
        </option>
      </select>
      <ErrorMessage name="NhaXuatBan" class="error-feedback" />
    </div>

    <div class="form-group" v-else>
      <label for="NhaXuatBan">Nhà xuất bản:</label>
      <select name="NhaXuatBan" class="form-control" v-model="NXBId">
        <option v-for="nxb in publishers" :key="nxb._id" :value="nxb._id" selected>
          {{ nxb.TenNXB }}
        </option>
      </select>
      <ErrorMessage name="NhaXuatBan" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="NamXuatBan">Năm xuất bản:</label>
      <Field name="NamXuatBan" type="text" class="form-control" v-model="bookLocal.NamXuatBan" />
      <ErrorMessage name="NamXuatBan" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="SoQuyen">Số quyển:</label>
      <Field name="SoQuyen" type="number" class="form-control" v-model="bookLocal.SoQuyen" />
      <ErrorMessage name="SoQuyen" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="DonGia">Đơn giá:</label>
      <Field name="DonGia" type="text" class="form-control" v-model="bookLocal.DonGia" />
      <ErrorMessage name="DonGia" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button v-if="bookLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteBook">
        Xóa
      </button>
      <button type="button" class="ml-2 btn btn-danger" @click="Cancel">Thoát</button>
    </div>
  </Form>
</template>

<script>
import axios from 'axios'
import * as yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'
export default {
  components: {
    Form,
    Field,
    ErrorMessage
  },
  emits: ['submit:book', 'delete:book'],
  props: {
    book: { type: Object, required: true }
  },
  data() {
    const bookFormSchema = yup.object().shape({
      TenSach: yup.string().required('Tên Sách không được để trống.'),
      TacGia: yup.string().required('Tác giả không được để trống.'),
      NamXuatBan: yup.string().required('Năm xuất bản không được để trống.'),
      DonGia: yup.string().required('Đơn giá không được để trống.'),
      SoQuyen: yup
        .number()
        .required('Số quyển không được để trống.')
        .min(0, 'Số quyển không được âm'),
      HinhAnh: yup
        .mixed()
        .required('Hình ảnh không được để trống.', () => {
          if (this.bookLocal._id) return true
        })
        .test('fileType', 'Chỉ chấp nhận hình ảnh (jpg, jpeg, png, gif)', (value) => {
          if (!value || typeof value === 'string') return true // Không kiểm tra nếu để trống hoặc là URL
          return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
        })
        .test('fileSize', 'Kích thước ảnh không vượt quá 5MB', (value) => {
          if (!value || typeof value === 'string') return true // Không kiểm tra nếu để trống hoặc là URL
          return value.size <= 5 * 1024 * 1024
        })
    })
    return {
      bookLocal: this.book,
      bookFormSchema,
      publishers: [],
      NXBId: null,
      imagePreview: null
    }
  },
  methods: {
    async fetchNhaXuatBans() {
      try {
        const response = await axios.get('http://localhost:3001/api/nhaxuatban')
        this.publishers = response.data
        // Gán NXBId là nhà xuất bản đầu tiên trong BookAdd
        if (this.publishers.length > 0 && !this.bookLocal.NhaXuatBan) {
          this.NXBId = this.publishers[0]._id
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách nhà xuất bản:', error)
      }
    },

    previewImage(event) {
      const file = event.target.files[0]
      if (file) {
        this.imagePreview = URL.createObjectURL(file) // Tạo URL xem trước
      }
    },

    submitBook() {
      const bookData = {
        ...this.bookLocal,
        NhaXuatBan: this.NXBId || this.bookLocal.NhaXuatBan
      }
      console.log(bookData)
      this.$emit('submit:book', bookData)
    },
    deleteBook() {
      this.$emit('delete:book', this.bookLocal._id)
    },
    Cancel() {
      const reply = window.confirm('You have unsaved changes! Do you want to leave?')
      if (!reply) {
        return false
      } else {
        this.$router.push({ name: 'books' })
      }
    }
  },
  mounted() {
    this.fetchNhaXuatBans()
  }
}
</script>

<style scoped>
@import '@/assets/form.css';
</style>
