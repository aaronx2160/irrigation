import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import(/* webpackChunkName: "login" */ './components/login')
import Home from './components/home'
import Welcome from './components/Welcome'
import Users from './components/settings/Users'
import Rights from './components/settings/Rights'
import Roles from './components/settings/Roles'
import AgriUsagePlan from './components/waterRight/AgriUsagePlan'
import BaseWaterCharge from './components/chargeAdmin/BaseWaterCharge'
import WaterSourceChargeInfo from './components/chargeAdmin/WaterSourceChargeInfo'
import MeasureTypeChargeInfo from './components/chargeAdmin/MeasureTypeChargeInfo'
import WaterUsageInfo from './components/statistic/WaterUsageInfo'
import DeviceInfo from './components/statistic/DeviceInfo'
import DistAppendWaterInfo from './components/statistic/DistAppendWaterInfo'
import DistWaterInfo from './components/statistic/DistWaterInfo'
import PowerUsageInfo from './components/statistic/PowerUsageInfo'
import WaterSaleInfo from './components/statistic/WaterSaleInfo'
import RealTimeAlarmInfo from './components/alarm/RealTimeAlarmInfo'
import DeviceAlarmHistory from './components/alarm/DeviceAlarmHistory'
import WaterUsageChartAnalysis from './components/alarm/WaterUsageChartAnalysis'
import ThreeRedLineInfo from './components/alarm/ThreeRedLineInfo'
import AbnormalWellAnalysis from './components/alarm/AbnormalWellAnalysis'
import AbnormalWellFixQuery from './components/alarm/AbnormalWellFixQuery'
import Regions from './components/settings/Regions'
import WaterAdmins from './components/settings/WaterAdmins'
import WellManagement from './components/settings/WellManagement'
import SysIntro from './components/anoucement/SysIntro'
import Workflow from './components/anoucement/Workflow'
import Help from './components/anoucement/Help'
import ParaSettingsHome from './components/settings/paramSettings/ParaSettingsHome'
import WaterFee from './components/settings/paramSettings/WaterFee'
import WaterResource from './components/settings/paramSettings/WaterResource'
import WaterMeter from './components/settings/paramSettings/WaterMeter'
import ThreePhaseVoltage from './components/settings/paramSettings/ThreePhaseVoltage'
import PowerSetting from './components/settings/paramSettings/PowerSetting'
import ExceptParams from './components/settings/paramSettings/ExceptParams'
import BasicInfoHome from './components/settings/basicInfo/BasicInfoHome'
import Providers from './components/settings/basicInfo/Providers'
import PumpPipeMaterial from './components/settings/basicInfo/PumpPipeMaterial'
import WaterType from './components/settings/basicInfo/WaterType'
import WellStatus from './components/settings/basicInfo/WellStatus'
import WellUse from './components/settings/basicInfo/WellUse'
import IrrigationPattern from './components/settings/basicInfo/IrrigationPattern'
import IrrigationAreaType from './components/settings/basicInfo/IrrigationAreaType'
import GeomorphicType from './components/settings/basicInfo/GeomorphicType'
import MeasureEquipmentType from './components/settings/basicInfo/MeasureEquipmentType'
import WellEquipmentModel from './components/settings/basicInfo/WellEquipmentModel'
import MaintenanceStaff from './components/settings/basicInfo/MaintenanceStaff'
import NotFound from './components/NotFound'
// import LiveData from './components/liveInfo/LiveData'
import WaterCardInfo from './components/statistic/WaterCardInfo'
import LiveCams from './components/liveInfo/LiveCharts'
import AddAWell from './components/settings/AddAWell'
import AMap from './components/AMap'
import Test from './components/Test'
import DataDownload from './components/statistic/DataDownload'
import RptChargedDetail from '@/components/statistic/RptChargedDetail'
import MenuManagement from '@/components/settings/MenuManagement'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: 'welcome',
      children: [
        { path: '/test', component: Test },
        { path: '/monitor/remote.do', component: LiveCams },
        { path: '/monitor/data.do', component: Test },
        { path: '/welcome', component: Welcome },
        { path: '/monitor/map.do', component: AMap },
        { path: '/sysUser/index.do', component: Users },
        { path: '/rights', component: Rights },
        { path: '/sysRole/index.do', component: Roles },
        {
          path: '/waterRightManage/farming.do',
          component: AgriUsagePlan
        },
        {
          path: '/baseWaterCharge/index.do',
          component: BaseWaterCharge
        },
        {
          path: '/distWaterInfo/distWaterInfo.do',
          component: DistWaterInfo
        },
        {
          path: '/waterSourceChargeInfo',
          component: WaterSourceChargeInfo
        },
        {
          path: '/measureTypeChargeInfo',
          component: MeasureTypeChargeInfo
        },
        {
          path: '/deviceInfo/deviceInfo.do',
          component: DeviceInfo
        },
        {
          path: '/distAppendWaterInfo/distAppendWaterInfo.do',
          component: DistAppendWaterInfo
        },
        {
          path: '/useWater/water.do',
          component: WaterUsageInfo
        },
        {
          path: '/wellsUsePowerStatistics/wellsUsePower.do',
          component: PowerUsageInfo
        },
        {
          path: '/saleWaterInfo/saleWaterInfo.do',
          component: WaterSaleInfo
        },
        {
          path: '/waterCardInfo/waterCardInfo.do',
          component: WaterCardInfo
        },
        {
          path: '/dataDownload',
          component: DataDownload
        },
        {
          path: '/wellsRechargeStatistics/wellsRecharge.do',
          component: RptChargedDetail
        },
        {
          path: '/device/realTimeAlarm.do',
          component: RealTimeAlarmInfo
        },
        { path: '/device/device.do', component: DeviceAlarmHistory },
        {
          path: '/abnormalWellAnalysis/index.do',
          component: WaterUsageChartAnalysis
        },
        {
          path: '/threeRedLineAnalysis/index.do',
          component: ThreeRedLineInfo
        },
        {
          path: '/intelligentAnalysis/index.do',
          component: AbnormalWellAnalysis
        },
        {
          path: '/intelligentDeal/intelligentDeal.do',
          component: AbnormalWellFixQuery
        },
        { path: '/sysArea/index.do', component: Regions },
        { path: '/sysWaterArea/index.do', component: WaterAdmins },
        { path: '/baseDeviceInfo/index.do', component: WellManagement },
        { path: '/addAWell', component: AddAWell },
        { path: '/sys/menuManagement', component: MenuManagement },
        {
          path: '/waterPrive/index.do',
          component: ParaSettingsHome,
          redirect: '/paraSettingsHome/waterFee',
          children: [
            {
              path: '/paraSettingsHome/waterFee',
              component: WaterFee
            },
            {
              path: '/paraSettingsHome/WaterResource',
              component: WaterResource
            },
            {
              path: '/paraSettingsHome/WaterMeter',
              component: WaterMeter
            },
            {
              path: '/paraSettingsHome/ThreePhaseVoltage',
              component: ThreePhaseVoltage
            },
            {
              path: '/paraSettingsHome/PowerSetting',
              component: PowerSetting
            },
            {
              path: '/paraSettingsHome/ExceptParams',
              component: ExceptParams
            }
          ]
        },
        {
          path: '/baseInfo/index.do',
          component: BasicInfoHome,
          redirect: '/basicInfoHome/Providers',
          children: [
            {
              path: '/basicInfoHome/Providers',
              component: Providers
            },
            {
              path: '/basicInfoHome/PumpPipeMaterial',
              component: PumpPipeMaterial
            },
            {
              path: '/basicInfoHome/WaterType',
              component: WaterType
            },
            {
              path: '/basicInfoHome/WellStatus',
              component: WellStatus
            },
            {
              path: '/basicInfoHome/WellUse',
              component: WellUse
            },
            {
              path: '/basicInfoHome/IrrigationPattern',
              component: IrrigationPattern
            },
            {
              path: '/basicInfoHome/IrrigationAreaType',
              component: IrrigationAreaType
            },
            {
              path: '/basicInfoHome/GeomorphicType',
              component: GeomorphicType
            },
            {
              path: '/basicInfoHome/MeasureEquipmentType',
              component: MeasureEquipmentType
            },
            {
              path: '/basicInfoHome/WellEquipmentModel',
              component: WellEquipmentModel
            },
            {
              path: '/basicInfoHome/MaintenanceStaff',
              component: MaintenanceStaff
            }
          ]
        },
        {
          path: '/information/introduction.do',
          component: SysIntro
        },
        {
          path: '/flow/index.do',
          component: Workflow
        },
        {
          path: '/help/index.do',
          component: Help
        }
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
