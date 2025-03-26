<template>
  <div class="page-container">
    <div class="content-wrapper">
      <div class="borrow-list-header">
        <h4 class="section-title">
          Danh sách lượt Mượn sách
          <i class="fa-solid fa-book-open-reader"></i>
        </h4>
      </div>

      <BorrowBookList
        v-if="filteredBorrowBooksCount > 0"
        :borrowBooks="filteredBorrowBooks"
        v-model:activeIndex="activeIndex"
        @bookReturned="handleBookReturned"
      />
      <p v-else class="no-borrow-message">Không có lượt Mượn sách nào.</p>
    </div>
  </div>
</template>

<script>
import BorrowBookList from '@/components/BorrowBookList.vue';
import BorrowBookService from '@/services/borrowBook.service';

export default {
  components: {
    BorrowBookList,
  },
  data() {
    return {
      borrowBooks: [],
      activeIndex: -1,
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
        this.borrowBooks = await BorrowBookService.getAllBorrowBooks();
      } catch (error) {
        console.log(error);
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
  background-repeat: no-repeat;
  width: 100vw; /* Chiều rộng full */
  height: 100vh; /* Chiều cao full */
  display: flex;
  justify-content: center;
  align-items: center;
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

.borrow-list-header {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
}

.no-borrow-message {
  text-align: center;
  color: #777;
}
</style>