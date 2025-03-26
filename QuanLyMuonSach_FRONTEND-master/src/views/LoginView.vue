<template>
  <div class="login-container">
    <div class="overlay"></div>
    <div class="login-card">
      <div class="card">
        <div class="card-header">
          <h4>Đăng nhập</h4>
          <p>Bạn là nhân viên? Vui lòng đăng nhập!</p>
        </div>
        <div class="card-body">
          <p class="text-danger text-center">{{ messageError }}</p>
          <form @submit.prevent="login">
            <div class="form-group">
              <label for="email">Email</label>
              <input
                v-model="payload.Email"
                id="email"
                type="email"
                class="form-control"
                placeholder="Nhập email"
                required
              />
            </div>
            <div class="form-group">
              <label for="password">Mật khẩu</label>
              <input
                v-model="payload.MatKhau"
                id="password"
                type="password"
                class="form-control"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary btn-block">
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/auth.service'

export default {
  data() {
    return {
      payload: {
        Email: '',
        MatKhau: '',
        VaiTro: 'nhanvien'
      },
      messageError: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await AuthService.login(this.payload)
        alert('Đăng nhập thành công')

        const token = response.token
        const payload = JSON.parse(atob(token.split('.')[1]))
        localStorage.setItem('token', token) // Store token in localStorage
        localStorage.setItem('id', payload.id) // Save user ID
        localStorage.setItem('role', payload.role) // Save user role

        this.$root.emitter.emit('loginStatusChanged')

        const redirect = this.$route.query.redirect || '/books' // Lấy đường dẫn redirect hoặc mặc định là /books
        this.$router.push(redirect)
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.messageError = error.response.data.message // Display server error message
        }
        console.error('Login failed: ', error)
      }
    }
  }
}
</script>
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
  top: 0;
  left: 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Làm mờ hình nền */
}

.login-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  position: relative;
  z-index: 1;
}

.card-header {
  text-align: center;
  margin-bottom: 20px;
}

.btn-primary {
  background-color: #000;
  border: none;
  transition: 0.3s;
}

.btn-primary:hover {
  background-color: #333;
}
</style>