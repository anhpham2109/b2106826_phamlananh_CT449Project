<template>
  <div class="page">
    <h4>Thêm Nhà xuất bản</h4>
    <PublisherForm :publisher="publisher" @submit:publisher="createPublisher" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import PublisherForm from '@/components/PublisherForm.vue'
import PublisherService from '@/services/publisher.service'

export default {
  components: {
    PublisherForm
  },
  data() {
    return {
      publisher: {
        TenNXB: ''
      },
      message: ''
    }
  },
  methods: {
    async createPublisher(data) {
      try {
        await PublisherService.createPublisher(data)
        alert('Nhà xuất bản được thêm mới thành công')
        this.$router.push({ name: 'publishers' })
      } catch (error) {
        console.log(error)
      }
    }
  },

  created() {
    this.message = ''
  }
}
</script>
