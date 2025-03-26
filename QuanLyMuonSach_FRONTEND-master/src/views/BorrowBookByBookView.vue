<template>
  <div class="page-container">
    <div class="content-wrapper">
      <div class="borrow-book-list-header">
        <h4 class="section-title">
          Danh sách lượt Mượn sách theo Sách
          <i class="fa-solid fa-book-open-reader"></i>
        </h4>
        <h5 class="text-success ml-3">{{ book.TenSach }}</h5>
      </div>

      <div class="book-details">
        <div class="book-image">
          <img :src="book.HinhAnh" alt="Hình ảnh sách" />
        </div>
        <div class="book-info">
          <p><span class="font-weight-bold">Tác giả: </span> {{ book.TacGia }}</p>
          <p><span class="font-weight-bold">Nhà xuất bản: </span> {{ book.NhaXuatBan.TenNXB }}</p>
          <p><span class="font-weight-bold">Năm xuất bản: </span> {{ book.NamXuatBan }}</p>
          <p><span class="font-weight-bold">Số quyển: </span> {{ book.SoQuyen }} quyển</p>
          <p><span class="font-weight-bold">Đơn giá: </span> {{ book.DonGia }}</p>
        </div>
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
import BookService from '@/services/book.service';

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
      book: {},
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
        this.borrowBooks = await BorrowBookService.getAllBorrowBooksByBookId(this.id);
      } catch (error) {
        console.log(error);
      }
    },
    async getBook(id) {
      try {
        this.book = await BookService.getBookById(id);
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
      this.getBook(this.id);
    },
  },
  created() {
    this.getBook(this.id);
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

.book-details {
  display: flex;
  margin-bottom: 2rem;
}

.book-image {
  flex: 1;
  text-align: right;
}

.book-image img {
  max-width: 80%;
}

.book-info {
  flex: 1;
}

.no-borrow-book-message {
  text-align: center;
  color: #777;
}
</style>