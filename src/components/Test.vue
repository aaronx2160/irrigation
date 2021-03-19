<template>
  <div>
    <el-button @click="getData">Get Data</el-button>
    <!--    <el-button @click="handleClick">DeleteData</el-button>-->
  </div>
</template>

<script>
import http from '@/utils/http'

export default {
  name: 'Test',
  data() {
    return { menuList: [] }
  },
  methods: {
    async getData() {
      this.menuList = await http('get', '/api/menu/3', null)
      const menuArr = []
      const arrTemp = this.menuList.slice(0)
      arrTemp.map((item) => {
        item.children = []
      })
      for (let i = 0; i < arrTemp.length; i++) {
        arrTemp.map((item) => {
          if (arrTemp[i].ParentMenuId === item.MenuCode) {
            item.children.push(arrTemp[i])
          }
        })
        if (arrTemp[i].MenuLevel === 1) {
          menuArr.push(arrTemp[i])
        }
      }
    },
  },
}
</script>

<style scoped></style>
