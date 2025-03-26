<template>
  <div class="page-container">
    <div class="content-wrapper">
      <div class="borrow-book-list-header">
        <h4 class="section-title">
          Danh sách lượt Mượn sách theo Độc giả
          <i class="fa-solid fa-book-open-reader"></i>
        </h4>
        <h5 class="text-success ml-3">{{ reader.HoTen }}</h5>
      </div>

      <div class="reader-details">
        <p><span class="font-weight-bold">Email: </span> {{ reader.Email }}</p>
        <p><span class="font-weight-bold">Số điện thoại: </span> {{ reader.DienThoai }}</p>
        <p><span class="font-weight-bold">Địa chỉ: </span> {{ reader.DiaChi }}</p>
      </div>

      <div class="action-buttons">
        <button class="refresh-button" @click="refreshList">
          <i class="fas fa-redo"></i>Làm mới
        </button>
      </div>

      <BorrowBookList
        v-if="filteredBorrowBooksCount > 0"
        :borrowBooks="filteredBorrowBooks"
        v-model:activeIndex="activeIndex"
        @bookReturned="handleBookReturned"
      />
      <p v-else class="no-borrow-book-message">Không có lượt Mượn sách nào.</p>
    </div>
  </div>
</template>

<script>
import BorrowBookList from '@/components/BorrowBookList.vue';
import BorrowBookService from '@/services/borrowBook.service';
import ReaderService from '@/services/reader.service';

export default {
  components: {
    BorrowBookList,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      borrowBooks: [],
      activeIndex: -1,
      reader: {},
    };
  },
  computed: {
    filteredBorrowBooks() {
      return this.borrowBooks;
    },
    filteredBorrowBooksCount() {
      return this.filteredBorrowBooks.length;
    },
  },
  methods: {
    async retrieveBorrowBooks() {
      try {
        this.borrowBooks = await BorrowBookService.getAllBorrowBooksByReaderId(this.id);
      } catch (error) {
        console.log(error);
      }
    },
    async getReader(id) {
      try {
        this.reader = await ReaderService.getReaderById(id);
      } catch (error) {
        console.log(error);
        this.$router.push({
          name: 'notfound',
          params: { pathMatch: this.$route.path.split('/').slice(1) },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    refreshList() {
      this.retrieveBorrowBooks();
      this.activeIndex = -1;
    },
    handleBookReturned(borrowBook) {
      alert(`Sách "${borrowBook.Sach.TenSach}" đã được trả bởi Độc giả "${borrowBook.DocGia.HoTen}"`);
      this.refreshList();
    },
  },
  created() {
    this.getReader(this.id);
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page-container {
 background-image: url('/image/hinhnen1.jpg'); /* Đặt đường dẫn hình nền của bạn */
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed; /* Giữ hình nền cố định khi cuộn */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  
  background-position: center;
  width: 100vw; /* Chiều rộng full */
  height: 100vh; /* Chiều cao full */
  display: flex;
  justify-content: center;
  position: fixed; /* Cố định toàn màn hình */
  top: 50px;
  left: 0;
  overflow: auto;
  
}

.content-wrapper {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.borrow-book-list-header {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
}

.reader-details {
  margin-left: 1rem;
  margin-bottom: 2rem;
}

.action-buttons {
  text-align: right;
  margin-bottom: 1rem;
}

.refresh-button {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.no-borrow-book-message {
  text-align: center;
  color: #777;
}
</style>