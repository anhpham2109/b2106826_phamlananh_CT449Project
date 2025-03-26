<template>
  <div class="page">
    <h4>Thêm Độc giả</h4>
    <ReaderForm :reader="reader" @submit:reader="createReader" />
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
  data() {
    return {
      reader: {
        HoTen: ''
      },
      message: ''
    }
  },
  methods: {
    async createReader(data) {
      try {
        // console.log(data)
        await ReaderService.createReader(data)
        alert('Độc giả được thêm mới thành công')
        this.$router.push({ name: 'readers' })
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
