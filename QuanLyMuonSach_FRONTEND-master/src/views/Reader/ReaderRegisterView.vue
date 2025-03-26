<template>
  <div class="login-container">
    <div class="overlay">
      <div class="col-md-6">
        <div class="login-card">
          <div class="card-header text-center">
            <h4>Đăng ký tài khoản</h4>
            <p>Bạn chưa có tài khoản? Hãy đăng ký ngay nhé!</p>
          </div>
          <div class="card-body">
            <!-- Thông báo lỗi chung nếu có -->
            <p class="text-danger text-center">{{ messageError }}</p>
            <!-- Thêm xử lý schema trong onSubmit để bắt lỗi -->
            <Form @submit="handleSubmit" :validation-schema="readerFormSchema">
              <div class="form-group">
                <label for="HoTen">Họ tên:</label>
                <Field name="HoTen" type="text" class="form-control" />
                <ErrorMessage name="HoTen" class="error-feedback" />
              </div>

              <div class="form-group">
                <label for="Email">Email:</label>
                <Field name="Email" type="text" class="form-control" />
                <ErrorMessage name="Email" class="error-feedback" />
              </div>

              <div class="form-group">
                <label for="MatKhau">Mật khẩu:</label>
                <Field name="MatKhau" type="password" class="form-control" />
                <ErrorMessage name="MatKhau" class="error-feedback" />
              </div>

              <div class="form-group">
                <label for="Phai">Phái:</label>
                <div>
                  <Field name="Phai" type="radio" :value="false" /> Nam
                  <Field name="Phai" type="radio" :value="true" /> Nữ
                </div>
                <ErrorMessage name="Phai" class="error-feedback" />
              </div>

              <div class="form-group">
                <label for="DienThoai">Số điện thoại:</label>
                <Field name="DienThoai" type="text" class="form-control" />
                <ErrorMessage name="DienThoai" class="error-feedback" />
              </div>

              <div class="form-group">
                <label for="DiaChi">Địa chỉ:</label>
                <Field name="DiaChi" type="text" class="form-control" />
                <ErrorMessage name="DiaChi" class="error-feedback" />
              </div>

              <button type="submit" class="btn btn-primary btn-block">Đăng ký</button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/auth.service'
import ReaderService from '@/services/reader.service'
import * as yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'

export default {
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    const readerFormSchema = yup.object().shape({
      HoTen: yup.string().required('Họ tên Độc giả không được để trống.'),
      MatKhau: yup
        .string()
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự.')
        .required('Mật khẩu không được để trống.'),
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
      readerFormSchema,
      payload: {
        HoTen: '',
        Email: '',
        MatKhau: '',
        Phai: '',
        DienThoai: '',
        DiaChi: ''
      },
      messageError: ''
    }
  },
  methods: {
    async handleSubmit(values) {
      try {
        await ReaderService.createReader(values)
        alert('Đăng ký tài khoản thành công. Hãy đăng nhập ngay!')
        this.$router.push({ name: 'reader.login' })
      } catch (error) {
        this.messageError = 'Đăng ký thất bại. Vui lòng thử lại sau.'
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
@import '@/assets/form.css';
</style>
<style scoped>
.login-container {
  background-image: url('/image/hinhnen1.jpg'); /* Đổi đường dẫn ảnh nếu cần */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw; /* Chiều rộng full */
  height: 100vh; /* Chiều cao full */
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed; /* Cố định toàn màn hình */
  top: 30px;
  left: 0;
  overflow: auto;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Làm mờ hình nền */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: fixed; /* Thay đổi thành fixed */
  top: 54%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000; /* Đặt z-index cao để khung nằm trên cùng */
}

.card-header {
  text-align: center;
  margin-bottom: 30px;
}

.btn-primary {
  background-color: #000;
  border: none;
  transition: 0.3s;
}

.btn-primary:hover {
  background-color: #333;
}
@media (max-width: 600px) {
  .login-card {
    width: 95%;
    padding: 20px;
  }
}
.card {
  width: 100%;

}
</style>