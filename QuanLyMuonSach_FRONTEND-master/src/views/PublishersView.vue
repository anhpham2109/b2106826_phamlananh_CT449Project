<template>
  <div class="page-container">
    <div class="content-wrapper">
      <div class="publisher-list-header">
        <h4 class="section-title">
          Danh sách Nhà xuất bản
          <i class="fa-solid fa-building"></i>
        </h4>
      </div>

      <div class="action-buttons">
        <button class="add-publisher-button" @click="goToAddPublisher">
          <i class="fas fa-plus"></i>Thêm mới
        </button>
      </div>

      <PublisherList
        v-if="filteredPublishersCount > 0"
        :publishers="filteredPublishers"
        v-model:activeIndex="activeIndex"
      />
      <p v-else class="no-publisher-message">Không có Nhà xuất bản nào.</p>
    </div>
  </div>
</template>

<script>
import PublisherList from '@/components/PublisherList.vue';
import PublisherService from '@/services/publisher.service';

export default {
  components: {
    PublisherList,
  },
  data() {
    return {
      publishers: [],
      activeIndex: -1,
    };
  },
  computed: {
    publisherStrings() {
      return this.publishers.map((publisher) => {
        const { TenNXB, DiaChi } = publisher;
        return [TenNXB, DiaChi].join('');
      });
    },
    filteredPublishers() {
      return this.publishers;
    },
    activePublisher() {
      if (this.activeIndex < 0) return null;
      return this.filteredPublishers[this.activeIndex];
    },
    filteredPublishersCount() {
      return this.filteredPublishers.length;
    },
  },
  methods: {
    async retrievePublishers() {
      try {
        this.publishers = await PublisherService.getAllPublishers();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrievePublishers();
      this.activeIndex = -1;
    },
    goToAddPublisher() {
      this.$router.push({
        name: 'publisher.add',
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
  width: 100%;
  max-width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.publisher-list-header {
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

.add-publisher-button {
  background-color: #28a745;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.no-publisher-message {
  text-align: center;
  color: #777;
}
</style>