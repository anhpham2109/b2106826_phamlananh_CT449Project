<template>
  <Form @submit="submitPublisher" :validation-schema="publisherFormSchema">
    <div class="form-group">
      <label for="TenNXB">Tên Nhà xuất bản:</label>
      <Field name="TenNXB" type="text" class="form-control" v-model="publisherLocal.TenNXB" />
      <ErrorMessage name="TenNXB" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="DiaChi">Địa chỉ:</label>
      <Field name="DiaChi" type="text" class="form-control" v-model="publisherLocal.DiaChi" />
      <ErrorMessage name="DiaChi" class="error-feedback" />
    </div>

    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button
        v-if="publisherLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deletePublisher"
      >
        Xóa
      </button>
      <button type="button" class="ml-2 btn btn-danger" @click="Cancel">Thoát</button>
    </div>
  </Form>
</template>

<script>
import * as yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'
export default {
  components: {
    Form,
    Field,
    ErrorMessage
  },
  emits: ['submit:publisher', 'delete:publisher'],
  props: {
    publisher: { type: Object, required: true }
  },
  data() {
    const publisherFormSchema = yup.object().shape({
      TenNXB: yup.string().required('Tên Nhà xuất bản không được để trống.'),
      DiaChi: yup.string().required('Địa chỉ không được để trống.')
    })
    return {
      publisherLocal: this.publisher,
      publisherFormSchema,
      publishers: []
    }
  },
  methods: {
    submitPublisher() {
      this.$emit('submit:publisher', this.publisherLocal)
    },
    deletePublisher() {
      this.$emit('delete:publisher', this.publisherLocal._id)
    },
    Cancel() {
      const reply = window.confirm('You have unsaved changes! Do you want to leave?')
      if (!reply) {
        return false
      } else {
        this.$router.push({ name: 'publishers' })
      }
    }
  },
  mounted() {}
}
</script>

<style scoped>
@import '@/assets/form.css';
</style>
