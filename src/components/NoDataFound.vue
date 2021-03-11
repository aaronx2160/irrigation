<template>
  <div class="wrapper">
    <el-card>
      <img src="../assets/images/noDataFound.jpg" alt="" />
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'NoDataFound'
}
</script>

<style lang="less" scoped>
.wrapper {
  .el-card {
    img {
      height: 200px;
      width: 300px;
    }
  }
}
</style>
