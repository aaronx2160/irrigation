<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计分析</el-breadcrumb-item>
      <el-breadcrumb-item>数据下载</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="el-card__header">
        <h3>机井用水数据下载</h3>
      </div>
      <el-form :model="getDataForm" class="get-data-form">
        <el-form-item label="查询日期" prop="dataRange">
          <el-date-picker
            v-model="getDataForm.dataRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="机井编码" prop="DeviceCode">
          <el-input
            v-model="getDataForm.DeviceCode"
            size="mini"
            @input="handleInputKeyIn('DeviceCode')"
          ></el-input>
        </el-form-item>
        <el-form-item label="机井名称" prop="DeviceName">
          <el-input
            v-model="getDataForm.DeviceName"
            size="mini"
            @input="handleInputKeyIn('DeviceName')"
          ></el-input>
        </el-form-item>
        <el-form-item label="水卡卡号" prop="CardCode">
          <el-input
            v-model="getDataForm.CardCode"
            size="mini"
            @input="handleInputKeyIn('CardCode')"
          ></el-input>
        </el-form-item>
        <download-excel
          :fields="formData.fields"
          type="xls"
          name="filename.xls"
          :fetch="getDataSubmit"
          :before-generate="startDownload"
          :before-finish="finishDownload"
        >
          <el-button type="success" size="mini" icon="el-icon-search"
            >下载
          </el-button>
        </download-excel>
        <el-button type="info" size="mini">重置</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import getDeviceNames from '../../utils/getDeviceNames'
export default {
  name: 'DataDownload',
  data() {
    return {
      wellList: [],
      getDataForm: {
        searchType: '',
        DeviceCode: '',
        DeviceName: '',
        CardCode: '',
        dataRange: []
      },
      deviceNameArr: [],
      formData: {
        fields: {
          机井编码: 'DeviceCode',
          机井名称: 'DeviceName',
          水卡卡号: 'CardCode',
          已用水量: 'UseWater',
          剩余水量: 'RemainWater',
          已用电量: 'UsePower',
          已用费用: 'UseMoney',
          剩余金额: 'RemainMoney',
          开泵时间: 'OpenPumpTime',
          关泵时间: 'StopPumpTime'
        },
        data: []
      }
    }
  },
  mounted() {
    this.wellList = this.$store.getters.getWellList
  },
  methods: {
    handleInputKeyIn(key) {
      const keys = Object.keys(this.getDataForm)
      this.getDataForm.searchType = key
      for (let i = 0; i < keys.length; i++) {
        if (
          keys[i] !== key &&
          keys[i] !== 'dataRange' &&
          keys[i] !== 'searchType'
        ) {
          this.getDataForm[keys[i]] = ''
        }
      }
    },
    async getDataSubmit() {
      if (
        this.getDataForm.searchType === '' &&
        this.getDataForm.dataRange.length === 0
      ) {
        return this.$message.error('失败：数据查询标准未填写')
      } else {
        this.$loading({ fullscreen: true, text: '努力获取数据中...' })
        const { data: res } = await this.$http.post(
          '/api/DownloadData',
          this.getDataForm
        )
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        } else {
          this.deviceNameArr = getDeviceNames(
            this.wellList,
            res.data,
            'DeviceName'
          )
          res.data.map((item, index) => {
            item.DeviceName = this.deviceNameArr[index]
            this.formData.data.push(item)
          })
          return this.formData.data
        }
      }
    },
    finishDownload() {
      console.log('finished loading')
      this.$loading({ fullscreen: true }).close()
    }
  }
}
</script>

<style lang="less" scoped>
.get-data-form {
  width: 30%;
  margin: 15px auto;
  .el-form-item {
  }
  .el-button {
    float: right;
    margin-left: 15px;
    margin-bottom: 30px;
  }
}
</style>
