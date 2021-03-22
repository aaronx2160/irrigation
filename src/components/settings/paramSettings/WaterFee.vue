<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" label-width="auto">
      <el-form-item label="用水基准单价:">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="超出额定水量单价:">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="创建时间:">
        <el-date-picker type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="编辑时间:">
        <el-date-picker type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'WaterFee',
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  margin: 15px auto 0;
  width: 450px;
}
.el-input {
  width: 120px;
}
</style>
