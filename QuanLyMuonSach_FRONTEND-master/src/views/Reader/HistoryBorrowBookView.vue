<template>
  <div class="page-container">
    <div class="content-wrapper">
      <div class="history-header">
        <h4 class="section-title">
          Lịch sử mượn sách
          <i class="fa-solid fa-clock-rotate-left"></i>
        </h4>
        <h5 class="reader-name">
          {{ reader.HoTen }}
        </h5>
      </div>

      <div class="reader-info">
        <p>
          <span class="info-label">Email:</span>
          {{ reader.Email }}
        </p>
        <p>
          <span class="info-label">Số điện thoại:</span>
          {{ reader.DienThoai }}
        </p>
        <p>
          <span class="info-label">Địa chỉ:</span>
          {{ reader.DiaChi }}
        </p>
      </div>

      <BorrowBookList
        v-if="filteredBorrowBooksCount > 0"
        :borrowBooks="filteredBorrowBooks"
        v-model:activeIndex="activeIndex"
        @bookReturned="handleBookReturned"
      />
      <p v-else class="no-history-message">Không có lượt Mượn sách nào.</p>
    </div>
  </div>
</template>

<script>
import BorrowBookList from '@/components/Reader/BorrowBookList.vue';
import BorrowBookService from '@/services/borrowBook.service';
import ReaderService from '@/services/reader.service';

export default {
  components: {
    BorrowBookList,
  },
  data() {
    return {
      borrowBooks: [],
      activeIndex: -1,
      reader: {},
    };
  },
  computed: {
    borrowBookStrings() {
      return this.borrowBooks.map((borrowBook) => {
        const { TenNXB, DiaChi } = borrowBook;
        return [TenNXB, DiaChi].join('');
      });
    },
    filteredBorrowBooks() {
      return this.borrowBooks;
    },
    activeBorrowBook() {
      if (this.activeIndex < 0) return null;
      return this.filteredBorrowBooks[this.activeIndex];
    },
    filteredBorrowBooksCount() {
      return this.filteredBorrowBooks.length;
    },
  },
  methods: {
    async retrieveBorrowBooks() {
      try {
        const id = localStorage.getItem('id');
        if (!id) {
          console.error('Lỗi: ID không tồn tại trong localStorage');
          return;
        }
        this.borrowBooks = await BorrowBookService.getAllBorrowBooksByReaderId(id);
      } catch (error) {
        console.log(error);
      }
    },
    async getReader(id) {
      try {
        this.reader = await ReaderService.getReaderById(id);
        console.log(this.reader);
      } catch (error) {
        console.log(error);
        this.$router.push({
          name: 'notfound',
          params: {
            pathMatch: this.$route.path.split('/').slice(1),
          },
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
    this.getReader(localStorage.getItem('id'));
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
  align-items: center;
  position: fixed; /* Cố định toàn màn hình */
  top: 30px;
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
  margin: auto;
}

.history-header {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.reader-name {
  color: #28a745;
  margin-left: 1rem;
}

.reader-info {
  margin-left: 2rem;
  margin-bottom: 2rem;
}

.info-label {
  font-weight: bold;
}

.no-history-message {
  text-align: center;
  color: #777;
}
</style>