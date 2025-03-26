<template>
  <div v-if="reader" class="page">
    <h4>Hiệu chỉnh Độc giả</h4>
    <ReaderForm :reader="reader" @submit:reader="updateReader" @delete:reader="deleteReader" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import ReaderForm from '@/components/ReaderForm.vue'
import ReaderService from '@/services/reader.service'

export default {
  components: {
    ReaderForm
  },
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      reader: null,
      message: ''
    }
  },
  methods: {
    async getReader(id) {
      try {
        this.reader = await ReaderService.getReaderById(id)
        console.log(this.reader)
      } catch (error) {
        console.log(error)
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: 'notfound',
          params: {
            pathMatch: this.$route.path.split('/').slice(1)
          },
          query: this.$route.query,
          hash: this.$route.hash
        })
      }
    },

    async updateReader(data) {
      try {
        console.log('Clicked')
        await ReaderService.updateReader(this.reader._id, data)

        alert('Độc giả được cập nhật thành công')
        this.$router.push({ name: 'readers' })
      } catch (error) {
        console.log(error)
      }
    },

    async deleteReader() {
      if (confirm('Bạn muốn xóa Độc giả này?')) {
        try {
          await ReaderService.deleteReader(this.reader._id)
          this.$router.push({ name: 'readers' })
        } catch (error) {
          console.log(error)
        }
      }
    }
  },

  created() {
    this.getReader(this.id)
    this.message = ''
  }
}
</script>
