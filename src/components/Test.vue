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
      console.log(this.menuList)
      this.menuList.map(item => {
        item.children = []
      })
      const menuLevel = 3
      let menuArr = []
      for (let i = menuLevel; i > 1; i--) {
        this.menuList.map(item => {
          if (item.MenuLevel === i) {
            let arr = this.menuList.filter(v => {
              return v.MenuCode === item.ParentMenuId
            })

            arr[0]['children'].push(item)
            menuArr.push(arr)
          }
        })
      }
      console.log(menuArr)
    }
  }
}
</script>

<style scoped></style>
