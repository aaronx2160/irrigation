import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import(/* webpackChunkName: "home" */ './components/login')
const Home = () => import(/* webpackChunkName: "home" */ './components/home')
const Welcome = () => import(/* webpackChunkName: "home" */ './components/Welcome')
const Users = () => import(/* webpackChunkName: "settings" */ './components/settings/Users')
const Rights = () => import(/* webpackChunkName: "settings" */ './components/settings/Rights')
const Roles = () => import(/* webpackChunkName: "settings" */ './components/settings/Roles')
const AgriUsagePlan = () => import(/* webpackChunkName: "charge" */ './components/waterRight/AgriUsagePlan')
const BaseWaterCharge = () => import(/* webpackChunkName: "charge" */ './components/chargeAdmin/BaseWaterCharge')
const WaterSourceChargeInfo = () => import(/* webpackChunkName: "charge" */ './components/chargeAdmin/WaterSourceChargeInfo')
const MeasureTypeChargeInfo = () => import(/* webpackChunkName: "charge" */ './components/chargeAdmin/MeasureTypeChargeInfo')
const WaterUsageInfo = () => import(/* webpackChunkName: "statistic" */ './components/statistic/WaterUsageInfo')
const DeviceInfo = () => import(/* webpackChunkName: "statistic" */ './components/statistic/DeviceInfo')
const DistAppendWaterInfo = () => import(/* webpackChunkName: "statistic" */ './components/statistic/DistAppendWaterInfo')
const DistWaterInfo = () => import(/* webpackChunkName: "statistic" */ './components/statistic/DistWaterInfo')
const PowerUsageInfo = () => import(/* webpackChunkName: "statistic" */ './components/statistic/PowerUsageInfo')
const WaterSaleInfo = () => import(/* webpackChunkName: "statistic" */ './components/statistic/WaterSaleInfo')
const WaterCardInfo = () => import(/* webpackChunkName: "statistic" */ './components/statistic/WaterCardInfo')
const DataDownload = () => import(/* webpackChunkName: "statistic" */ './components/statistic/DataDownload')
const RptChargedDetail = () => import(/* webpackChunkName: "statistic" */ '@/components/statistic/RptChargedDetail')
const RealTimeAlarmInfo = () => import(/* webpackChunkName: "alarm" */ './components/alarm/RealTimeAlarmInfo')
const DeviceAlarmHistory = () => import(/* webpackChunkName: "alarm" */ './components/alarm/DeviceAlarmHistory')
const WaterUsageChartAnalysis = () => import(/* webpackChunkName: "alarm" */ './components/alarm/WaterUsageChartAnalysis')
const ThreeRedLineInfo = () => import(/* webpackChunkName: "alarm" */ './components/alarm/ThreeRedLineInfo')
const AbnormalWellAnalysis = () => import(/* webpackChunkName: "alarm" */ './components/alarm/AbnormalWellAnalysis')
const AbnormalWellFixQuery = () => import(/* webpackChunkName: "settings" */ './components/alarm/AbnormalWellFixQuery')
const Regions = () => import(/* webpackChunkName: "settings" */ './components/settings/Regions')
const WaterAdmins = () => import(/* webpackChunkName: "settings" */ './components/settings/WaterAdmins')
const WellManagement = () => import(/* webpackChunkName: "settings" */ './components/settings/WellManagement')
const MaintenanceStaff = () => import(/* webpackChunkName: "settings" */ './components/settings/basicInfo/MaintenanceStaff')
const AddAWell = () => import(/* webpackChunkName: "settings" */ './components/settings/AddAWell')
const MenuManagement = () => import(/* webpackChunkName: "settings" */ '@/components/settings/MenuManagement')
const SysIntro = () => import(/* webpackChunkName: "anoucement" */ './components/anoucement/SysIntro')
const Workflow = () => import(/* webpackChunkName: "anoucement" */ './components/anoucement/Workflow')
const Help = () => import(/* webpackChunkName: "anoucement" */ './components/anoucement/Help')
const ParaSettingsHome = () => import(/* webpackChunkName: "params" */ './components/settings/paramSettings/ParaSettingsHome')
const WaterFee = () => import(/* webpackChunkName: "params" */ './components/settings/paramSettings/WaterFee')
const WaterResource = () => import(/* webpackChunkName: "params" */ './components/settings/paramSettings/WaterResource')
const WaterMeter = () => import(/* webpackChunkName: "params" */ './components/settings/paramSettings/WaterMeter')
const ThreePhaseVoltage = () => import(/* webpackChunkName: "params" */ './components/settings/paramSettings/ThreePhaseVoltage')
const PowerSetting = () => import(/* webpackChunkName: "params" */ './components/settings/paramSettings/PowerSetting')
const ExceptParams = () => import(/* webpackChunkName: "params" */ './components/settings/paramSettings/ExceptParams')
const BasicInfoHome = () => import(/* webpackChunkName: "basicInfo" */ './components/settings/basicInfo/BasicInfoHome')
const Providers = () => import(/* webpackChunkName: "basicInfo" */ './components/settings/basicInfo/Providers')
const PumpPipeMaterial = () => import(/* webpackChunkName: "basicInfo" */ './components/settings/basicInfo/PumpPipeMaterial')
const WaterType = () => import(/* webpackChunkName: "basicInfo" */ './components/settings/basicInfo/WaterType')
const WellStatus = () => import(/* webpackChunkName: "basicInfo" */ './components/settings/basicInfo/WellStatus')
const WellUse = () => import(/* webpackChunkName: "basicInfo" */ './components/settings/basicInfo/WellUse')
const IrrigationPattern = () => import(/* webpackChunkName: "basicInfo" */ './components/settings/basicInfo/IrrigationPattern')
const IrrigationAreaType = () => import(/* webpackChunkName: "basicInfo" */ './components/settings/basicInfo/IrrigationAreaType')
const GeomorphicType = () => import(/* webpackChunkName: "basicInfo" */ './components/settings/basicInfo/GeomorphicType')
const MeasureEquipmentType = () => import(/* webpackChunkName: "basicInfo" */ './components/settings/basicInfo/MeasureEquipmentType')
const WellEquipmentModel = () => import(/* webpackChunkName: "basicInfo" */ './components/settings/basicInfo/WellEquipmentModel')
const LiveData = () => import(/* webpackChunkName: "liveInfo" */ './components/liveInfo/LiveData')
const LiveCams = () => import(/* webpackChunkName: "liveInfo" */ './components/liveInfo/LiveCharts')
const AMap = () => import(/* webpackChunkName: "map" */ './components/AMap')
const Test = () => import(/* webpackChunkName: "test" */ './components/Test')
const NotFound = () => import(/* webpackChunkName: "error" */ './components/NotFound')

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
        { path: '/monitor/data.do', component: LiveData },
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
