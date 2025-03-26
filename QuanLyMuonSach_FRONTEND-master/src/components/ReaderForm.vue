<template>
  <Form @submit="submitReader" :validation-schema="readerFormSchema">
    <div class="form-group">
      <label for="HoTen">Họ tên Độc giả:</label>
      <Field name="HoTen" type="text" class="form-control" v-model="readerLocal.HoTen" />
      <ErrorMessage name="HoTen" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="Email">Email:</label>
      <Field name="Email" type="text" class="form-control" v-model="readerLocal.Email" />
      <ErrorMessage name="Email" class="error-feedback" />
    </div>

    <div class="form-group" v-if="!readerLocal._id">
      <!-- <div class="form-group"> -->
      <label for="MatKhau">Mật khẩu:</label>
      <Field
        name="MatKhau"
        type="password"
        class="form-control"
        required
        v-model="readerLocal.MatKhau"
      />
      <ErrorMessage name="MatKhau" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="Phai">Phái:</label>
      <!-- Code -->
      <div>
        <Field name="Phai" type="radio" :value="false" v-model="readerLocal.Phai" /> Nam
        <Field name="Phai" type="radio" :value="true" v-model="readerLocal.Phai" /> Nữ
      </div>
      <ErrorMessage name="Phai" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="DienThoai">Số điện thoại:</label>
      <Field name="DienThoai" type="text" class="form-control" v-model="readerLocal.DienThoai" />
      <ErrorMessage name="DienThoai" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="DiaChi">Địa chỉ:</label>
      <Field name="DiaChi" type="text" class="form-control" v-model="readerLocal.DiaChi" />
      <ErrorMessage name="DiaChi" class="error-feedback" />
    </div>

    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button
        v-if="readerLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteReader"
      >
        Xóa
      </button>
      <button type="button" class="ml-2 btn btn-danger" @click="Cancel">Thoát</button>
    </div>
  </Form>
</template>

<script>
import * as yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'
export default {
  components: {
    Form,
    Field,
    ErrorMessage
  },
  emits: ['submit:reader', 'delete:reader'],
  props: {
    reader: { type: Object, required: true }
  },
  data() {
    const readerFormSchema = yup.object().shape({
      HoTen: yup.string().required('Họ tên Độc giả không được để trống.'),
      MatKhau: yup.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự.'),
      Email: yup
        .string()
        .required('Email không được để trống.')
        .matches(/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i, 'Email không hợp lệ'),
      DienThoai: yup
        .string()
        .required('Số điện thoại không được để trống.')
        .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'Số điện thoại không hợp lệ'),
      DiaChi: yup.string().required('Địa chỉ không được để trống.'),
      Phai: yup.boolean().required('Giới tính không được để trống.')
    })
    return {
      readerLocal: this.reader,
      readerFormSchema,
      readers: []
    }
  },
  methods: {
    submitReader() {
      this.$emit('submit:reader', this.readerLocal)
    },
    deleteReader() {
      this.$emit('delete:reader', this.readerLocal._id)
    },
    Cancel() {
      const reply = window.confirm('You have unsaved changes! Do you want to leave?')
      if (!reply) {
        return false
      } else {
        this.$router.push({ name: 'readers' })
      }
    }
  },
  mounted() {}
}
</script>

<style scoped>
@import '@/assets/form.css';
</style>
