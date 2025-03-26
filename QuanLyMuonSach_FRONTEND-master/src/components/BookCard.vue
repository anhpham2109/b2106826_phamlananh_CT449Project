<script>
export default {
  props: {
    book: { type: Object, required: true }
  }
}
</script>

<template>
  <div>
    <div class="p-1">
      <strong>Hình ảnh:</strong>
      {{ book.HinhAnh }}
    </div>
    <div class="p-1">
      <strong>Tên sách:</strong>
      {{ book.TenSach }}
    </div>
    <div class="p-1">
      <strong>Tác giả:</strong>
      {{ book.TacGia }}
    </div>
    <div class="p-1">
      <strong>Đơn giá:</strong>
      {{ book.DonGia }}
    </div>
    <div class="p-1">
      <strong>Số quyển:</strong>
      {{ book.SoQuyen }}
    </div>
    <div class="p-1">
      <strong>Năm xuất bản:</strong>
      {{ book.NamXuatBan }}
    </div>
    <div class="p-1">
      <strong>Nhà xuất bản:</strong>
      {{ book.NhaXuatBan.TenNXB }}
    </div>

    <!-- <div class="p-1">
      <strong>Liên hệ yêu thích:&nbsp;</strong>
      <i v-if="book.favorite" class="fas fa-check"></i>
      <i v-else class="fas fa-times"></i>
    </div> -->
  </div>
</template>
