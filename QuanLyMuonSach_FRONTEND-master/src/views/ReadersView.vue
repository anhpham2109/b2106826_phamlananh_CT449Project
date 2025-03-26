<template>
  <div class="page-container">
    <div class="content-wrapper">
      <div class="reader-list-header">
        <h4 class="section-title">
          Danh sách Độc giả
          <i class="fa-solid fa-user-group"></i>
        </h4>
      </div>

      <div class="action-buttons">
        <button class="add-reader-button" @click="goToAddReader">
          <i class="fas fa-plus"></i>Thêm mới
        </button>
      </div>

      <ReaderList
        v-if="filteredReadersCount > 0"
        :readers="filteredReaders"
        v-model:activeIndex="activeIndex"
      />
      <p v-else class="no-reader-message">Không có Độc giả nào.</p>
    </div>
  </div>
</template>

<script>
import ReaderList from '@/components/ReaderList.vue';
import ReaderService from '@/services/reader.service';

export default {
  components: {
    ReaderList,
  },
  data() {
    return {
      readers: [],
      activeIndex: -1,
    };
  },
  computed: {
    readerStrings() {
      return this.readers.map((reader) => {
        const { TenNXB, DiaChi } = reader;
        return [TenNXB, DiaChi].join('');
      });
    },
    filteredReaders() {
      return this.readers;
    },
    activeReader() {
      if (this.activeIndex < 0) return null;
      return this.filteredReaders[this.activeIndex];
    },
    filteredReadersCount() {
      return this.filteredReaders.length;
    },
  },
  methods: {
    async retrieveReaders() {
      try {
        this.readers = await ReaderService.getAllReaders();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveReaders();
      this.activeIndex = -1;
    },
    goToAddReader() {
      this.$router.push({
        name: 'reader.add',
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

.reader-list-header {
  margin-bottom: 2rem;
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

.add-reader-button {
  background-color: #28a745;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.no-reader-message {
  text-align: center;
  color: #777;
}
</style>