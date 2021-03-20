<template>
  <div class="wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/baseDeviceInfo/index.do' }"
        >机井管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>添加机井</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div
        slot="header"
        class="card-header"
        ref="card_header"
        :class="{ fixed: fixed }"
      >
        <span class="iconfont icon-fanhui back" @click="handleGoBack"
          ><tag type="info">返回</tag></span
        >
        <h3>机井添加页面</h3>
        <el-button type="success" size="small" @click="handleSubmit"
          >提交</el-button
        >
      </div>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="9" md="3">
              <v-text-field
                label="水管区域"
                dense
                disabled
                :value="waterAreas.WaterAreaName"
              ></v-text-field>
            </v-col>
            <v-col cols="9" md="3">
              <v-text-field
                label="水管区域码"
                :value="waterAreas.WaterAreaCode"
                dense
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="9" md="3">
              <v-select
                v-model="areaSelected"
                :items="areas"
                :item-text="item=>`${item.village}`"
                :item-value="item=>`${item.areaCode}`"
                label="行政区域"
                dense
                @change="handleSelectChange($event, 'Area')"
              ></v-select>
            </v-col>

            <v-col cols="9" md="3">
              <v-select
                v-model="areaSelected"
                :items="areas"
                :item-text="item=>`${item.areaCode}`"
                :item-value="item=>`${item.areaCode}`"
                label="行政区域码"
                dense
                @change="handleSelectChange($event, 'AreaCode')"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9" md="3">
              <v-text-field
                v-model="extendedWellInfo.DeviceCode"
                label="设备编码"
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="9" md="3">
              <v-text-field
                v-model="extendedWellInfo.DevicePlate"
                label="机井号牌"
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="9" md="3">
              <v-text-field
                v-model="extendedWellInfo.DeviceName"
                label="设备名称"
                dense
                required
              ></v-text-field>
            </v-col>

            <v-col cols="9" md="3">
              <v-text-field
                type="number"
                v-model="extendedWellInfo.PipeDiameter"
                label="管道口径"
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9" md="3">
              <v-select
                v-model="extendedWellInfo.DeviceModel"
                :items="deviceModel"
                :item-text="item => `${item.DeviceModel}`"
                label="设备型号"
                dense
              ></v-select>
            </v-col>
            <v-col cols="9" md="3">
              <v-text-field
                type="number"
                v-model="extendedWellInfo.PipeDiameter"
                label="井管内径(mm)"
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="9" md="3">
              <v-text-field
                type="number"
                v-model="extendedWellInfo.DeviceNo"
                label="设备号"
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="9" md="3">
              <v-select
                v-model="extendedWellInfo.PumpMaterial"
                :items="pumpMaterial"
                :item-text="item => `${item.PumpMaterial}`"
                label="泵管材质"
                dense
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9" md="3">
              <v-text-field
                v-model="extendedWellInfo.DTUNo"
                label="DTU号码"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="9" md="3">
              <v-text-field
                v-model="extendedWellInfo.CreateTime"
                label="成井时间"
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="9" md="3">
              <v-text-field
                type="number"
                v-model="extendedWellInfo.OwnerTelphone"
                label="手机号码"
                dense
                required
              ></v-text-field>
            </v-col>

            <v-col cols="9" md="3">
              <v-text-field
                type="number"
                v-model="extendedWellInfo.WellDepth"
                label="井深(m)"
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9" md="3">
              <v-select
                v-model="extendedWellInfo.SimOperator"
                :items="operator"
                :item-text="item => `${item.Operator}`"
                label="手机卡运营商"
                dense
              ></v-select>
            </v-col>
            <v-col cols="9" md="3">
              <v-text-field
                type="number"
                v-model="extendedWellInfo.GroundWaterDepth"
                label="地下水埋深(m)"
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="9" md="3">
              <v-select
                v-model="extendedWellInfo.UseWaterType"
                :items="useWaterType"
                :item-text="item => `${item.UseWaterType}`"
                label="取水类型"
                dense
              ></v-select>
            </v-col>

            <v-col cols="9" md="3">
              <v-text-field
                v-model="extendedWellInfo.DeviceType"
                label="水泵型号"
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9" md="3">
              <v-text-field
                type="number"
                v-model="extendedWellInfo.Latitude"
                label="纬度"
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="9" md="3">
              <v-text-field
                type="number"
                v-model="extendedWellInfo.DeviceName"
                label="水泵额定扬程(m)"
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="9" md="3">
              <v-text-field
                type="number"
                v-model="extendedWellInfo.Longitude"
                label="经度"
                dense
                required
              ></v-text-field>
            </v-col>

            <v-col cols="9" md="3">
              <v-text-field
                type="number"
                v-model="extendedWellInfo.RatedFlow"
                label="水泵额定流量(m³)"
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9" md="3">
              <v-text-field
                v-model="extendedWellInfo.InstallTime"
                label="安装时间"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="9" md="3">
              <v-text-field
                type="number"
                v-model="extendedWellInfo.RatedPower"
                label="水泵额定功率(KW)"
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="9" md="3">
              <v-select
                v-model="extendedWellInfo.ApplyStatus"
                :items="applyStatus"
                :item-text="item => `${item.ApplyStatus}`"
                label="应用状况"
                dense
              ></v-select>
            </v-col>

            <v-col cols="9" md="3">
              <v-select
                v-model="extendedWellInfo.WellUse"
                :items="wellUse"
                :item-text="item => `${item.WellUse}`"
                label="水井用途"
                dense
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9" md="3">
              <v-select
                v-model="extendedWellInfo.IrrigationMode"
                :items="irrigationMode"
                :item-text="item => `${item.IrrigationMode}`"
                label="灌溉模式"
                dense
              ></v-select>
            </v-col>
            <v-col cols="9" md="3">
              <v-text-field
                type="number"
                v-model="extendedWellInfo.KZArea"
                label="控制面积(亩)"
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="9" md="3">
              <v-text-field
                type="number"
                v-model="extendedWellInfo.SJArea"
                label="实际灌溉面积(亩)"
                dense
                required
              ></v-text-field>
            </v-col>

            <v-col cols="9" md="3">
              <v-text-field
                type="number"
                v-model="extendedWellInfo.SJSupplyWaterPeople"
                label="实际供水人口"
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9" md="3">
              <span
                >是否办理取水许可证:
                <el-radio v-model="extendedWellInfo.IsHandleDocument" :label="1"
                  >是</el-radio
                >
                <el-radio v-model="extendedWellInfo.IsHandleDocument" :label="0"
                  >否</el-radio
                >
              </span>
            </v-col>
            <v-col
              cols="9"
              md="3"
              v-show="extendedWellInfo.IsHandleDocument === 1"
            >
              <v-text-field
                v-model="extendedWellInfo.WaterIntakeNo"
                label="取水许可证编号"
                dense
              ></v-text-field>
            </v-col>

            <v-col
              cols="9"
              md="3"
              v-show="extendedWellInfo.IsHandleDocument === 1"
            >
              <v-text-field
                type="number"
                v-model="extendedWellInfo.AllowWater"
                label="年许可取水(m³)"
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="9" md="3">
              <span
                >是否办理工业取水手续:
                <el-radio
                  v-model="extendedWellInfo.IsIndustryProcedure"
                  :label="1"
                  >是</el-radio
                >
                <el-radio
                  v-model="extendedWellInfo.IsIndustryProcedure"
                  :label="0"
                  >否</el-radio
                >
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="9"
              md="3"
              v-show="extendedWellInfo.IsIndustryProcedure === 1"
            >
              <v-text-field
                type="number"
                v-model="extendedWellInfo.IndustryApprovedWater"
                label="年核定水量(m³)"
                dense
              ></v-text-field>
            </v-col>
            <v-col
              cols="9"
              md="3"
              v-show="extendedWellInfo.IsIndustryProcedure === 1"
            >
              <v-text-field
                type="number"
                v-model="extendedWellInfo.IndustryProductionCapacity"
                label="生产规模(万元)"
                dense
              ></v-text-field>
            </v-col>

            <v-col
              cols="9"
              md="3"
              v-show="extendedWellInfo.IsIndustryProcedure === 1"
            >
              <v-text-field
                type="number"
                v-model="extendedWellInfo.IndustryArea"
                label="工业区面积(亩)"
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="9" md="3">
              <span
                >是否安装水量计量设施:
                <el-radio
                  v-model="extendedWellInfo.WaterMeterMeasurement"
                  :label="1"
                  >是</el-radio
                >
                <el-radio
                  v-model="extendedWellInfo.WaterMeterMeasurement"
                  :label="0"
                  >否</el-radio
                >
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="9"
              md="3"
              v-show="extendedWellInfo.WaterMeterMeasurement === 1"
            >
              <v-select
                v-model="extendedWellInfo.WaterMeterMeasurementType"
                :items="measureType"
                :item-text="item => `${item.MeasureType}`"
                label="水量计量设施类型"
                dense
              ></v-select>
            </v-col>
            <v-col
              cols="9"
              md="3"
              v-show="extendedWellInfo.WaterMeterMeasurement === 1"
            >
              <v-text-field
                v-model="extendedWellInfo.MeterType"
                label="水表型号"
                dense
              ></v-text-field>
            </v-col>

            <v-col
              cols="9"
              md="3"
              v-show="extendedWellInfo.WaterMeterMeasurement === 1"
            >
              <v-text-field
                type="number"
                v-model="extendedWellInfo.MeterCaliber"
                label="水表口径(mm)"
                dense
              ></v-text-field>
            </v-col>

            <v-col
              cols="9"
              md="3"
              v-show="extendedWellInfo.WaterMeterMeasurement === 1"
            >
              <v-text-field
                type="number"
                v-model="extendedWellInfo.MeterSerialNo"
                label="水表编号"
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="9"
              md="3"
              v-show="extendedWellInfo.WaterMeterMeasurement === 1"
            >
              <span
                >有无水表防护罩:
                <el-radio v-model="extendedWellInfo.MeterGuard" :label="1"
                  >有</el-radio
                >
                <el-radio v-model="extendedWellInfo.MeterGuard" :label="0"
                  >无</el-radio
                >
              </span>
            </v-col>
            <v-col cols="9" md="3">
              <v-select
                v-model="extendedWellInfo.LandformType"
                :items="landFormType"
                :item-text="item => `${item.LandformType}`"
                label="所在地貌类型"
                dense
              ></v-select>
            </v-col>

            <v-col cols="9" md="3">
              <v-text-field
                v-model="extendedWellInfo.DeviceName"
                label="水资源区域"
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="9" md="3">
              <v-select
                v-model="extendedWellInfo.IrrigationAreaType"
                :items="irrigationAreaType"
                :item-text="item => `${item.IrrigationAreaType}`"
                label="所在灌区类型"
                dense
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="9" md="3">
              <el-upload
                      ref="img_upload"
                      :headers="headers"
                      action="/api/imgUpload"
                      :auto-upload="false"
                      class="upload-demo"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList"
                      :on-success ='handleSuccess'
                      list-type="picture">

                <el-button slot="trigger" size="small" type="primary">选择照片</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>

            </v-col>
            <v-col cols="9" md="3">
              <v-text-field
                v-model="extendedWellInfo.PhotoAfter"
                label="机井安装后照片"
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="9" md="3">
              <v-text-field
                v-model="extendedWellInfo.Note"
                label="备注"
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </el-card>
  </div>
</template>

<script>
import { GETAREAS, GETWELLLIST } from '@/store/types'
import http from '@/utils/http'

export default {
  name: 'AddAWell',
  data() {
    return {
      fileList: [],
      fixed: false,
      areas: {},
      areaSelected: '',
      deviceModel: [],
      pumpMaterial: [],
      operator: [],
      useWaterType: [],
      applyStatus: [],
      wellUse: [],
      irrigationMode: [],
      measureType: [],
      landFormType: [],
      irrigationAreaType: [],
      waterAreas: {
        WaterAreaName: '成仓区水利局',
        WaterAreaCode: '01',
        WaterAreaId: '174b014cad674b558d86b50e85453ec6',
      },
      extendedWellInfo: {
        AllowWater: 0,
        AreaId: 'a151449d20ac4aafa37d52ffbfbcd4d0',
        CreateTime: '2021-01-27T01:01:36.000Z',
        DTUNo: '',
        DeviceAreaCode: '610304022001',
        DeviceCode: '6103040101',
        DeviceModel: 'TJ710',
        DeviceName: '太公庙1号井',
        DeviceNo: '',
        DeviceType: 1,
        DeviceVersion: '',
        DeviceWaterAreaCode: '61030401001',
        EditTime: '2021-01-27T01:01:36.000Z',
        Id: '2747e798b59e432bac1ffc4d4edc9e1a',
        Imei: '',
        InstallAddress: '陕西省宝鸡市渭滨区马营镇冷沟',
        InstallTime: '2021-01-27T00:58:00.000Z',
        IpPort: '',
        Latitude: 34.212775,
        Longitude: 107.262388,
        MonitorArea: '',
        OwnerName: '',
        OwnerTelphone: '',
        PhotoAfter: '',
        PhotoBefore: '',
        SimCard: '18393785857',
        SimOperator: '中国移动',
        WaterAreaId: '174b014cad674b558d86b50e85453ec6',
        ApplyStatus: '停用',
        DevicePlate: '',
        GroundWaterDepth: 0,
        IndustryApprovedWater: 0,
        IndustryArea: 0,
        IndustryProductionCapacity: 0,
        IrrigationAreaType: '井灌区',
        IrrigationMode: '井灌',
        IsHandleDocument: 0,
        IsIndustryProcedure: 0,
        KZArea: 0,
        LandformType: '火山地貌',
        MakeTime: '2018-08-24T01:00:02.000Z',
        MeterCaliber: 0,
        MeterGuard: 0,
        MeterSerialNo: '',
        MeterType: '',
        Note: '',
        PipeDiameter: 0,
        PumpMaterial: '普通碳钢管',
        RatedFlow: 0,
        RatedHead: 0,
        RatedPower: 0,
        SJArea: 200,
        SJSupplyWaterPeople: 0,
        UseWaterType: '地表水',
        WaterArea: '',
        WaterIntakeNo: '',
        WaterMeterMeasurement: 0,
        WaterMeterMeasurementType: '脉冲水表计量',
        WaterPumpNo: '',
        WellDepth: 0,
        WellDiameter: 0,
        WellUse: '灌溉',
        YearWaterSum: 0,
      },
      headers:{Authorization:''}
    }
  },
  computed: {},
  created() {
    this.$store.dispatch(GETAREAS)
  },
  mounted() {
    this.getData()
    this.headers.Authorization=window.sessionStorage.getItem('token')
    window.addEventListener('scroll', this.addFixed)
  },
  destroyed() {
    window.removeEventListener('scroll', this.addFixed)
  },
  methods: {
    handleSuccess(r,f,fl){
      console.log(r)
      console.log(f)
      console.log(fl)
    },
    submitUpload(){
      this.$refs.img_upload.submit()

    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    async getData() {
      // get area info
      this.areas = this.$store.getters.getAreas
      //设备型号
      this.deviceModel = await http('get', '/api/basicInfo/sysdevicemodel')
      //泵管材质 pumpMaterial
      this.pumpMaterial = await http('get', '/api/basicInfo/syspumpmaterial')
      //运营商
      this.operator = await http('get', '/api/basicInfo/sysoperator')
      //取水类型
      this.useWaterType = await http('get', '/api/basicInfo/sysusewatertype')
      //应用状况 applyStatus
      this.applyStatus = await http('get', '/api/basicInfo/sysapplystatus')
      //水井用途
      this.wellUse = await http('get', '/api/basicInfo/syswelluse')
      //灌溉模式irrigationMode
      this.irrigationMode = await http('get', '/api/basicInfo/sysirrigationmode')
      //水量计量设施类型：
      this.measureType = await http('get', '/api/basicInfo/sysmeasuretype')
      //地貌类型landFormType
      this.landFormType = await http('get', '/api/basicInfo/syslandformtype')
//
      this.irrigationAreaType = await http('get', '/api/basicInfo/sysirrigationareatype')
    },
    handleSelectChange(e,k) {
      console.log(e)
      console.log(k)
      this.extendedWellInfo.AreaId = this.areaSelected
    },
    async handleSubmit() {
      const { data: res } = await this.$http.post(
        '/api/addWell',
        this.extendedWellInfo
      )

      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
      await this.$store.dispatch(GETWELLLIST)
      this.$confirm('是否继续添加新的机井?', '提示', {
        confirmButtonText: '继续添加',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {})
        .catch(() => {
          this.$router.push('baseDeviceInfo/index.do')
        })
    },
    addFixed() {
      this.fixed = window.scrollY > 92
    },
    handleGoBack() {
      this.$router.push('/baseDeviceInfo/index.do')
    },
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  .el-card {
    .card-header {
      display: flex;
      .back {
        cursor: pointer;
      }
      h3 {
        margin: 0 auto;
      }
    }
  }

  .fixed {
    z-index: 1;
    position: fixed;
    width: 85%;
    top: 0;
    left: 205px;
    background: white;
    margin: 0;
    padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
  }
}
</style>
