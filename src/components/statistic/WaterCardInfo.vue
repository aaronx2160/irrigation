<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计分析</el-breadcrumb-item>
      <el-breadcrumb-item>水卡信息查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div slot="header" class="card-header">
        <el-form label-width="100px" :model="searchForm" ref="search_form">
          <el-form-item label="用户名:" prop="OwnerName">
            <el-input
              v-model.trim="searchForm.OwnerName"
              @input="handleKeyIn('OwnerName')"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="卡号:" prop="CardCode">
            <el-input
              v-model.trim="searchForm.CardCode"
              @input="handleKeyIn('CardCode')"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="电话号码:" prop="OwnerTelphone">
            <el-input
              v-model.trim="searchForm.OwnerTelphone"
              @input="handleKeyIn('OwnerTelphone')"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-button
            type="success"
            icon="el-icon-search"
            size="mini"
            @click="handleSearch"
            :disabled="this.$store.getters.getDisabled"
            >查询</el-button
          >
          <el-button
            type="info"
            icon="el-icon-eleme"
            size="mini"
            @click="handleSearchReset"
            >重置</el-button
          >
        </el-form>
      </div>
      <div>
        <v-simple-table>
          <thead>
            <tr>
              <th>
                水卡编号
              </th>
              <th>
                持卡人姓名
              </th>
              <th>
                持卡人电话
              </th>
              <th>
                剩余金额
              </th>
              <th>
                执行水价
              </th>
              <th>
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pageData" :key="item.Id">
              <td>{{ item.CardCode }}</td>

              <td>{{ item.OwnerName }}</td>
              <td>{{ item.OwnerTelphone }}</td>
              <td>{{ item.RemainMoney }}</td>
              <td>{{ item.ExecutePrice }}</td>
              <td>
                <el-button
                  type="danger"
                  circle
                  icon="el-icon-delete"
                  size="mini"
                  @click="handleDelete(item.Id)"
                ></el-button>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>

      <el-pagination
        layout="prev, pager, next"
        :total="filterOn ? dataFiltered.length : cardInfo.length"
        @current-change="handlePageChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import pageNation from '@/utils/pagenation'
import { GETDISABLED } from '@/store/types'

export default {
  name: 'WaterCardInfo',
  data() {
    return {
      deviceList: null,
      cardInfo: null,
      pageNum: 1,
      pageData: [],
      searchForm: { OwnerName: '', CardCode: '', OwnerTelphone: '' },
      dataFiltered: null,
      filterOn: false,
      searchType: ''
    }
  },
  mounted() {
    this.deviceList = this.$store.getters.getWellList
    this.getData()
  },
  methods: {
    async getData() {
      const deviceId = this.deviceList.map(v => {
        return v.Id
      })
      const { data: res } = await this.$http.post('/api/waterCard', deviceId)
      if (res.meta.status !== 200) {
        this.$message.error('获取水卡信息失败')
      } else {
        this.cardInfo = res.data
        this.pageData = pageNation(this.cardInfo, this.pageNum, 10).newArr
      }
    },
    handlePageChange(pageNum) {
      const dataToPagenate = this.filterOn ? this.dataFiltered : this.cardInfo
      this.pageData = pageNation(dataToPagenate, pageNum, 10).newArr
    },
    handleKeyIn(key) {
      this.searchType = key
      const searchFormKeyArr = Object.keys(this.searchForm)
      for (let i = 0; i < searchFormKeyArr.length; i++) {
        if (searchFormKeyArr[i] !== key)
          this.searchForm[searchFormKeyArr[i]] = ''
      }
    },
    handleSearch() {
      if (this.searchType === '') {
        return this.$message.error('请输入筛选关键字')
      }
      this.$store.dispatch(GETDISABLED)
      this.filterOn = true
      this.dataFiltered = this.cardInfo.filter(item => {
        return item[this.searchType] === this.searchForm[this.searchType]
      })
      this.handlePageChange(1)
    },
    handleSearchReset() {
      this.filterOn = false
      this.$refs.search_form.resetFields()
      this.getData()
    },
    async handleDelete(id) {
      this.$confirm('此操作将永久删除该水卡, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async action => {
          if (action === 'confirm') {
            const { data: res } = await this.$http.delete(
              '/api/waterCard/' + id
            )
            if (res.meta.status !== 200) {
              this.$message.error('删除失败。')
            } else {
              this.$message.success('删除成功！')
              await this.getData()
            }
          }
        })
        .catch(err => {
          if (err) return this.$message.info('取消删除。')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  display: flex;
  align-items: center;
  /*justify-content: space-around;*/
  margin: 0;
  padding: 0;
  .el-form-item {
    margin: 0;
    padding: 0;
    .el-input,
    .el-select {
      width: 120px;
    }
  }
  .el-button:first-of-type {
    margin-left: 15px;
  }
}
</style>
