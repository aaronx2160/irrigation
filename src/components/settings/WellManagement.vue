<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>机井管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div slot="header" class="card-header">
        <el-button
          type="success"
          icon="el-icon-circle-plus-outline"
          size="mini"
          @click="handleAddAWell"
          >新增
        </el-button>
        <div class="search">
          <label for="deviceCode">机井编码：</label>
          <el-input
            id="deviceCode"
            size="mini"
            @change="handleSearchInputChange"
            v-model="searchInput"
            clearable
          ></el-input>
          <el-button icon="search" type="info" size="mini" @click="handleSearch"
            >查询
          </el-button>
        </div>
      </div>
      <div class="card-body">
        <v-simple-table>
          <thead>
            <tr>
              <th>设备编码</th>
              <th>设备名称</th>
              <th>设备型号</th>
              <th>年许可取水(m3)</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pageData" :key="item.Id">
              <td>{{ item.DeviceCode }}</td>
              <td>{{ item.DeviceName }}</td>
              <td>{{ item.DeviceModel }}</td>
              <td>{{ item.AllowWater }}</td>
              <td>
                <el-button
                  size="mini"
                  type="warning"
                  @click="editRegionDialogVisible = true"
                  >修改</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeleteWell(item.Id)"
                  >删除</el-button
                >
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <div class="page">
          <el-pagination
            layout="prev, pager, next"
            :page-size="scale"
            :total="wellList.length"
            @current-change="handlePageChange"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
    <div>
      <el-dialog
        title="新增区域-所属区域【陕西省】"
        :visible.sync="addRegionDialogVisible"
        width="80%"
      >
        <el-form label-width="auto" label-position="left">
          <el-form-item>
            <el-image
              src="https://s3.ax1x.com/2021/01/06/sEEmM4.png"
            ></el-image>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addRegionDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRegionDialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
        title="修改区域"
        :visible.sync="editRegionDialogVisible"
        width="80%"
      >
        <el-form label-width="auto" label-position="left">
          <el-form-item>
            <el-image
              src="https://s3.ax1x.com/2021/01/06/sEEmM4.png"
            ></el-image>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="editRegionDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editRegionDialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { GETWELLLIST } from '../../store/types'
import pageNation from '../../utils/pagenation'

export default {
  components: {},
  data() {
    return {
      wellList: [],
      pageNum: 1,
      scale: 9,
      pageData: [],
      searchInput: '',
      provinces: [
        {
          value: '陕西省',
          label: '陕西省',
          children: [
            {
              value: '宝鸡市',
              label: '宝鸡市',
            },
            {
              value: '西安市',
              label: '西安市',
            },
          ],
        },
        {
          value: '2021',
          label: '2021',
        },
        {
          value: '2022',
          label: '2022',
        },
        {
          value: '2023',
          label: '2023',
        },
        {
          value: '2024',
          label: '2024',
        },
        {
          value: '2025',
          label: '2025',
        },
      ],
      cities: [{ value: '', label: '' }],
      provinceSelected: '',
      citySelected: '',
      regionData: [
        {
          regionCode: 0o1,
          regionName: '宝鸡市',
          regionLevel: 1,
          parentRegion: '陕西省',
          createdAt: Date.now(),
          description: '',
        },
      ],
      addRegionDialogVisible: false,
      editRegionDialogVisible: false,
    }
  },
  created() {
    console.log('created')
    this.$store.dispatch(GETWELLLIST)
  },
  mounted() {
    console.log('mounted')
    this.getWellList()
    this.pageData = pageNation(this.wellList, this.pageNum, this.scale).newArr
  },
  destroyed() {
    console.log('destroyed')
  },
  methods: {
    handleAddAWell() {
      this.$router.push('/addAWell')
    },
    getWellList() {
      this.wellList = this.$store.getters.getWellList
    },
    handlePageChange(pageNum) {
      this.pageData = pageNation(this.wellList, pageNum, this.scale).newArr
    },
    handleSearchInputChange(e) {
      this.searchInput = e.target.value
    },
    handleSearch() {
      if (this.searchInput.trim() === '') return
      return (this.deviceInfo = this.deviceInfo.filter((v) => {
        return v.DeviceCode === this.searchInput.trim()
      }))
    },

    handleDeleteWell(Id) {
      this.$confirm('此操作将永久删除该机井, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async (action) => {
          if (action === 'confirm') {
            const { data: res } = await this.$http.delete(
              '/api/deleteWell/' + Id
            )
            if (res.meta.status !== 200) {
              this.$message.error('删除失败。')
            } else {
              this.$message.success('删除成功！')
              this.$store.dispatch(GETWELLLIST).then(() => {
                this.getWellList()
                this.handlePageChange(1)
              })
            }
          }
        })
        .catch((err) => {
          if (err) return this.$message.info('取消删除。')
        })
    },
    handleProvinceChange(value) {
      this.citySelected = ''
      const provinceSelected = this.provinces.filter((item) => {
        return item.value === value
      })
      this.cities = provinceSelected[0].children
      this.citySelected = this.cities[0].label
    },
  },
}
</script>

<style lang="less" scoped>
.card-header {
  display: flex;
  justify-content: center;
  .search {
    margin-left: 10%;
    .el-input {
      width: 40%;
    }
    button {
      margin-left: 3%;
    }
  }
}
</style>
