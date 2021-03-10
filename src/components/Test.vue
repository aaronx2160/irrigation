<template>
  <div>
    <el-button @click="getData">getDeviceCode</el-button>
    <el-button @click="handleClick">DeleteData</el-button>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return { wellList: null, deviceCode: [] }
  },
  methods: {
    getData() {
      this.wellList = this.$store.getters.getWellList

      this.wellList.map(v => {
        this.deviceCode.push(v.DeviceCode)
      })
      console.log(this.deviceCode.length)
      console.log(this.deviceCode)
    },
    async handleClick() {
      const { data: res } = await this.$http.post('/api/test', this.deviceCode)
      console.log(res)
    }
  }
}
</script>

<style scoped></style>
