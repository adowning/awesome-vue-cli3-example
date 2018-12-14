<!-- @format -->

<template>
  <div class="error-404">
    <div class="error-404-body">
      <div class="error-404-body-title">
        <span class="left-four">4</span> <span class="cener-zero">0</span>
        <span class="right-four">4</span>
      </div>
      <p class="error-404-body-message">YOU&nbsp;&nbsp;LOOK&nbsp;&nbsp;LOST</p>
      <div class="error-404-btns">
        <a href="javascript:;" @click="onGoHomeClick"> 返回首页 </a>
        <a href="javascript:;" @click="onBackPageClick">返回上一页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',

  methods: {
    onBackPageClick() {
      this.$router.go(-1)
    },
    onGoHomeClick() {
      this.$router.push('/')
    }
  }
}
</script>

<style></style>
