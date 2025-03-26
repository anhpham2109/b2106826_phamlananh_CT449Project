<template>
  <div class="page-container">
    <div class="content-wrapper">
      <div class="search-container">
        <InputSearch v-model="searchText" />
      </div>

      <div class="book-list-section">
        <h4 class="section-title">Mượn sách</h4>
        <BookList
          v-if="filteredBooksCount > 0"
          :books="filteredBooks"
          v-model:activeIndex="activeIndex"
          @refresh-list="refreshList"
        />
        <p v-else class="no-books-message">Không có Sách nào.</p>
      </div>
    </div>
  </div>
</template>

<script>
import BookList from '@/components/Reader/BookList.vue';
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
      console.log('Clicked');
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
  width: 100%; /* Chiều rộng full */
  height: 100%; /* Chiều cao full */
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed; /* Cố định toàn màn hình */
  top: 30px;
  left: 0;
  overflow: auto;
  
}

.content-wrapper {
  background-color: rgba(255, 255, 255, 0.8); /* Nền mờ cho nội dung */
  padding: 2rem;
  border-radius: 6px;
  width: 90%;
  max-width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.search-container {
  margin-bottom: 2rem;
}

.book-list-section {
  margin-top: 1rem;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
}

.no-books-message {
  text-align: center;
  color: #777;
}
</style>