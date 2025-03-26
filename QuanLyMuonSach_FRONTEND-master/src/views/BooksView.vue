<template>
  <div class="page-container">
    <div class="content-wrapper">
      <div class="search-bar">
        <InputSearch v-model="searchText" />
      </div>

      <div class="book-list-section">
        <h4 class="section-title">
          Danh sách Sách
          <i class="fa-solid fa-book-open"></i>
        </h4>

        <div class="action-buttons">
          <button class="add-book-button" @click="goToAddBook">
            <i class="fas fa-plus"></i>Thêm mới
          </button>
        </div>

        <BookList
          v-if="filteredBooksCount > 0"
          :books="filteredBooks"
          v-model:activeIndex="activeIndex"
        />
        <p v-else class="no-books-message">Không có Sách nào.</p>
      </div>
    </div>
  </div>
</template>

<script>
import BookList from '@/components/BookList.vue';
import InputSearch from '@/components/InputSearch.vue';
import BookService from '@/services/book.service';

export default {
  components: {
    InputSearch,
    BookList,
  },
  data() {
    return {
      books: [],
      activeIndex: -1,
      searchText: '',
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    bookStrings() {
      return this.books.map((book) => {
        const { TenSach, TacGia, DonGia, SoQuyen, NamXuatBan, HinhAnh, NhaXuatBan } = book;
        return [TenSach, TacGia, DonGia, SoQuyen, NamXuatBan, HinhAnh, NhaXuatBan].join('');
      });
    },
    filteredBooks() {
      if (!this.searchText) {
        return this.books;
      }
      return this.books.filter((book, index) => this.bookStrings[index].includes(this.searchText));
    },
    activeBook() {
      if (this.activeIndex < 0) return null;
      return this.filteredBooks[this.activeIndex];
    },
    filteredBooksCount() {
      return this.filteredBooks.length;
    },
  },
  methods: {
    async retrieveBooks() {
      try {
        this.books = await BookService.getAllBooks();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveBooks();
      this.activeIndex = -1;
    },
    goToAddBook() {
      this.$router.push({
        name: 'book.add',
      });
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

.search-bar {
  margin-bottom: 2rem;
}

.book-list-section {
  margin-top: 2rem;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
}

.action-buttons {
  margin-top: 1rem;
  text-align: right;
}

.add-book-button {
  background-color: #28a745;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.no-books-message {
  text-align: center;
  color: #777;
}
</style>