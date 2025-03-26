<template>
  <Form @submit="submitEmployee" :validation-schema="employeeFormSchema">
    <div class="form-group">
      <label for="HoTen">Họ tên Nhân viên:</label>
      <Field name="HoTen" type="text" class="form-control" v-model="employeeLocal.HoTen" />
      <ErrorMessage name="HoTen" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="Email">Email:</label>
      <Field name="Email" type="text" class="form-control" v-model="employeeLocal.Email" />
      <ErrorMessage name="Email" class="error-feedback" />
    </div>

    <div class="form-group" v-if="!employeeLocal._id">
      <label for="MatKhau">Mật khẩu:</label>
      <Field
        name="MatKhau"
        type="password"
        class="form-control"
        required
        v-model="employeeLocal.MatKhau"
      />
      <ErrorMessage name="MatKhau" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="DienThoai">Số điện thoại:</label>
      <Field name="DienThoai" type="text" class="form-control" v-model="employeeLocal.DienThoai" />
      <ErrorMessage name="DienThoai" class="error-feedback" />
    </div>

    <!-- <div class="form-group">
      <label for="ChucVu">Chức vụ:</label>
      <Field name="ChucVu" type="text" class="form-control" v-model="employeeLocal.ChucVu" />
      <ErrorMessage name="ChucVu" class="error-feedback" />
    </div> -->

    <div class="form-group">
      <label for="DiaChi">Địa chỉ:</label>
      <Field name="DiaChi" type="text" class="form-control" v-model="employeeLocal.DiaChi" />
      <ErrorMessage name="DiaChi" class="error-feedback" />
    </div>

    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button
        v-if="employeeLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteEmployee"
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
  emits: ['submit:employee', 'delete:employee'],
  props: {
    employee: { type: Object, required: true }
  },
  data() {
    const employeeFormSchema = yup.object().shape({
      HoTen: yup.string().required('Họ tên Nhân viên không được để trống.'),
      MatKhau: yup.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự.'),
      Email: yup
        .string()
        .required('Email không được để trống.')
        .matches(/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i, 'Email không hợp lệ'),
      DienThoai: yup
        .string()
        .required('Số điện thoại không được để trống.')
        .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, 'Số điện thoại không hợp lệ'),
      //   ChucVu: ,
      DiaChi: yup.string().required('Địa chỉ không được để trống.')
    })
    return {
      employeeLocal: this.employee,
      employeeFormSchema,
      employees: []
    }
  },
  methods: {
    submitEmployee() {
      this.$emit('submit:employee', this.employeeLocal)
    },
    deleteEmployee() {
      this.$emit('delete:employee', this.employeeLocal._id)
    },
    Cancel() {
      const reply = window.confirm('You have unsaved changes! Do you want to leave?')
      if (!reply) {
        return false
      } else {
        this.$router.push({ name: 'employees' })
      }
    }
  },
  mounted() {}
}
</script>

<style scoped>
@import '@/assets/form.css';
</style>
