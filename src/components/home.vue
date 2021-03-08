<template>
    <el-container class="home_container">
        <el-header>
            <div class="logo">
                <img src="../assets/companyLogo/1.png" alt="" />
                <span id="mingzi">农业水价综合改革云平台</span>
            </div>
            <div class="options">
                <el-button
                    type="primary"
                    size="mini"
                    icon="el-icon-user-solid"
                    >{{ user.username }}</el-button
                >
                <el-button
                    type="warning"
                    size="mini"
                    icon="el-icon-warning"
                    @click="changPswdDialogVisible = true"
                    >修改密码</el-button
                >
                <el-button
                    type="info"
                    size="mini"
                    @click="logout"
                    icon="el-icon-switch-button"
                    >退出</el-button
                >
            </div>
        </el-header>
        <el-container>
            <el-aside :width="isCollapsed ? '64px' : '200px'">
                <div class="toggle_btn" @click="toggleMenu">|||</div>
                <el-menu
                    background-color="#16b399"
                    text-color="#fff"
                    active-text-color="#ffc900"
                    unique-opened
                    :collapse="isCollapsed"
                    :collapse-transition="false"
                    router
                >
                    <el-submenu
                        :index="'/' + item2.MenuUrl"
                        v-for="item2 in dbMenuList"
                        :key="item2.Id"
                    >
                        <template slot="title">
                            <i :class="iconsObj[item2.Id]"></i>
                            <span>{{ item2.MenuName }}</span>
                        </template>
                        <el-menu-item
                            :index="'/' + subItem.MenuUrl"
                            v-for="subItem in item2.children"
                            :key="subItem.id"
                            :default-active="activePath"
                            @click="saveNavState('/' + subItem.MenuUrl)"
                        >
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{ subItem.MenuName }}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main><router-view></router-view></el-main>
        </el-container>
        <el-dialog
            title="修改密码"
            :visible.sync="changPswdDialogVisible"
            width="30%"
            @closed="pswdDialogClose"
        >
            <el-form
                ref="pswdForm"
                :model="pswdForm"
                :rules="pswdChangerules"
                label-width="100px"
            >
                <el-form-item label="用户名">
                    <el-input v-model="user.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="旧密码" prop="oldPswd">
                    <el-input
                        v-model="pswdForm.oldPswd"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPswd">
                    <el-input
                        v-model="pswdForm.newPswd"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="pswdConfirm">
                    <el-input
                        v-model="pswdForm.pswdConfirm"
                        type="password"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changPswdDialogVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="changePswd">确 定</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>
import { GETMENULIST, GETWELLLIST } from '../store/types'

export default {
    data() {
        const validatePass = (rule, value, callback) => {
            if (value !== this.pswdForm.newPswd) {
                callback(new Error('两次输入密码不一致'))
            }
            callback()
        }
        return {
            user: {},
            dbMenuList: [],
            menuList: [
                {
                    id: 301,
                    authName: '水权管理',
                    path: 301,
                    children: [
                        {
                            id: 3001,
                            authName: '农业用水配水计划',
                            path: 'angriUsagePlan',
                            children: [],
                        },
                    ],
                },
                {
                    id: 401,
                    authName: '收费管理',
                    path: 401,
                    children: [
                        {
                            id: 4001,
                            authName: '基本水费收缴',
                            path: 'baseWaterCharge',
                            children: [],
                        },
                        {
                            id: 4002,
                            authName: '水资源费统计',
                            path: 'waterSourceChargeInfo',
                            children: [],
                        },
                        {
                            id: 4003,
                            authName: '计量水费统计',
                            path: 'measureTypeChargeInfo',
                            children: [],
                        },
                    ],
                },
                {
                    id: 501,
                    authName: '统计分析',
                    path: 501,
                    children: [
                        {
                            id: 5001,
                            authName: '机井基本信息查询',
                            path: 'deviceInfo',
                            children: [],
                        },
                        {
                            id: 5002,
                            authName: '配水信息查询',
                            path: 'distWaterInfo',
                            children: [],
                        },
                        {
                            id: 5003,
                            authName: '阶梯性水量分配信息查询',
                            path: 'distAppendWaterInfo',
                            children: [],
                        },
                        {
                            id: 5004,
                            authName: '机井用水信息查询',
                            path: 'waterUsageInfo',
                            children: [],
                        },
                        {
                            id: 5005,
                            authName: '机井用电统计',
                            path: 'powerUsageInfo',
                            children: [],
                        },
                        {
                            id: 5006,
                            authName: '售水信息查询',
                            path: 'waterSaleInfo',
                            children: [],
                        },
                    ],
                },
                {
                    id: 901,
                    authName: '实时监控',
                    path: 901,
                    children: [
                        {
                            id: 9001,
                            authName: '机井实时监控',
                            path: 'liveCams',
                            children: [],
                        },
                    ],
                },
                {
                    id: 601,
                    authName: '告警查询',
                    path: 601,
                    children: [
                        {
                            id: 6001,
                            authName: '设备实时告警',
                            path: 'realTimeAlarmInfo',
                            children: [],
                        },
                        {
                            id: 6002,
                            authName: '设备告警历史',
                            path: 'deviceAlarmHistory',
                            children: [],
                        },
                        {
                            id: 6003,
                            authName: '用水指标图形分析',
                            path: 'WaterUsageChartAnalysis',
                            children: [],
                        },
                        {
                            id: 6004,
                            authName: '三条红线',
                            path: 'threeRedLineInfo',
                            children: [],
                        },
                        {
                            id: 6005,
                            authName: '异常机井智能分析',
                            path: 'abnormalWellAnalysis',
                            children: [],
                        },
                        {
                            id: 6006,
                            authName: '异常机井处理查询',
                            path: 'abnormalWellFixQuery',
                            children: [],
                        },
                    ],
                },
                {
                    id: 701,
                    authName: '系统管理',
                    path: 701,
                    children: [
                        {
                            id: 2001,
                            authName: '角色列表',
                            path: 'roles',
                            children: [],
                        },
                        {
                            id: 7005,
                            authName: '权限列表',
                            path: 'rights',
                            children: [],
                        },
                        {
                            id: 7008,
                            authName: '用户管理',
                            path: 'users',
                            children: [],
                        },
                        {
                            id: 7001,
                            authName: '行政区域',
                            path: 'regions',
                            children: [],
                        },
                        {
                            id: 7002,
                            authName: '水管区域',
                            path: 'waterAdmins',
                            children: [],
                        },
                        {
                            id: 7003,
                            authName: '机井管理',
                            path: 'wellManagement',
                            children: [],
                        },
                        {
                            id: 7006,
                            authName: '参数管理',
                            path: 'paraSettingsHome',
                            children: [
                                {
                                    id: 70061,
                                    authName: '水费管理',
                                    path: 'paraSettingsHome/waterFee',
                                    children: [],
                                },
                                {
                                    id: 70062,
                                    authName: '水资源设置',
                                    path: 'paraSettingsHome/WaterResource',
                                    children: [],
                                },
                                {
                                    id: 70063,
                                    authName: '计量水费设置',
                                    path: 'paraSettingsHome/WaterMeter',
                                    children: [],
                                },
                                {
                                    id: 70064,
                                    authName: '三相电压',
                                    path: 'paraSettingsHome/ThreePhaseVoltage',
                                    children: [],
                                },
                                {
                                    id: 70065,
                                    authName: '功率设置',
                                    path: 'paraSettingsHome/PowerSetting',
                                    children: [],
                                },
                                {
                                    id: 70066,
                                    authName: '异常参数设置',
                                    path: 'paraSettingsHome/ExceptParams',
                                    children: [],
                                },
                            ],
                        },
                        {
                            id: 7007,
                            authName: '基础信息',
                            path: 'basicInfoHome',
                            children: [
                                {
                                    id: 70072,
                                    authName: '运营商',
                                    path: 'basicInfoHome/Providers',
                                    children: [],
                                },
                                {
                                    id: 70073,
                                    authName: '泵管材质',
                                    path: 'basicInfoHome/PumpPipeMaterial',
                                    children: [],
                                },
                                {
                                    id: 70074,
                                    authName: '取水类型',
                                    path: 'basicInfoHome/WaterType',
                                    children: [],
                                },
                                {
                                    id: 70075,
                                    authName: '应用状况',
                                    path: 'basicInfoHome/WellStatus',
                                    children: [],
                                },
                                {
                                    id: 70076,
                                    authName: '水井用途',
                                    path: 'basicInfoHome/WellUse',
                                    children: [],
                                },
                                {
                                    id: 70077,
                                    authName: '灌溉模式',
                                    path: 'basicInfoHome/IrrigationPattern',
                                    children: [],
                                },
                                {
                                    id: 70078,
                                    authName: '灌区类型',
                                    path: 'basicInfoHome/IrrigationAreaType',
                                    children: [],
                                },
                                {
                                    id: 70079,
                                    authName: '地貌类型',
                                    path: 'basicInfoHome/GeomorphicType',
                                    children: [],
                                },
                                {
                                    id: 700710,
                                    authName: '计量设施类型',
                                    path: 'basicInfoHome/MeasureEquipmentType',
                                    children: [],
                                },
                                {
                                    id: 700711,
                                    authName: '机井设备型号',
                                    path: 'basicInfoHome/WellEquipmentModel',
                                    children: [],
                                },
                                {
                                    id: 70071,
                                    authName: '维修人员',
                                    path: 'basicInfoHome/MaintenanceStaff',
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 801,
                    authName: '信息发布',
                    path: 801,
                    children: [
                        {
                            id: 8001,
                            authName: '系统简介',
                            path: 'sysIntro',
                            children: [],
                        },
                        {
                            id: 8002,
                            authName: '工作流程',
                            path: 'workflow',
                            children: [],
                        },
                        {
                            id: 8003,
                            authName: '系统帮助',
                            path: 'help',
                            children: [],
                        },
                    ],
                },
            ],
            changPswdDialogVisible: false,
            pswdForm: {
                oldPswd: '',
                newPswd: '',
                pswdConfirm: '',
            },
            pswdChangerules: {
                oldPswd: [
                    {
                        required: true,
                        message: '旧密码不能为空',
                        trigger: 'blur',
                    },
                    {
                        min: 6,
                        max: 15,
                        message: '长度在 6 到 15 个字符',
                        trigger: 'blur',
                    },
                ],
                newPswd: [
                    {
                        required: true,
                        message: '新密码不能为空',
                        trigger: 'blur',
                    },
                    {
                        min: 6,
                        max: 15,
                        message: '长度在 6 到 15 个字符',
                        trigger: 'blur',
                    },
                ],
                pswdConfirm: [
                    {
                        required: true,
                        message: '确认密码不能为空',
                        trigger: 'blur',
                    },
                    { validator: validatePass, trigger: 'blur' },
                ],
            },
            iconsObj: {
                '1': 'iconfont icon-user',
                '2': 'iconfont icon-shuju',
                '3': 'iconfont icon-quanxian',
                // '3': 'iconfont icon-goods-copy',
                '4': 'iconfont icon-dingdan2',
                '5': 'iconfont icon-shuju',
                '6': 'iconfont icon-shuju',
                '7': 'iconfont icon-shuju',
                '8': 'iconfont icon-shuju',
                '26': 'iconfont icon-shuju',
            },
            isCollapsed: false,
            activePath: '',
        }
    },
    created() {
        this.user = this.$store.getters.getUser
    },
    mounted() {
        this.getMenuList()
        this.getDeviceList()
        this.activePath = window.sessionStorage.getItem('activePath')
        const sysSettingMenuList = this.menuList.filter((item) => {
            return item.authName === '系统管理'
        })
        window.sessionStorage.setItem(
            'paramsSettingMenuList',
            JSON.stringify(sysSettingMenuList[0].children[6])
        )
        window.sessionStorage.setItem(
            'basicInfoMenuList',
            JSON.stringify(sysSettingMenuList[0].children[7])
        )
    },
    methods: {
        async getMenuList() {
            const { rid } = this.user
            const menuArr = []
            const res = await this.$http.get(`/api/menu/${rid}`)
            res.data.data.map((v) => {
                if (v.ParentMenuId === '') {
                    v.children = []
                    menuArr.push(v)
                }
            })
            res.data.data.map((menuItem) => {
                const firstLevelMenuIndex = menuArr.indexOf(
                    menuArr.filter((v) => v.Id === menuItem.ParentMenuId)[0]
                )
                if (firstLevelMenuIndex !== -1) {
                    menuArr[firstLevelMenuIndex].children.push(menuItem)
                }
            })
            this.$store.commit(GETMENULIST, menuArr)
            this.dbMenuList = this.$store.getters.getMenuList
        },
        getDeviceList() {
            this.$store.dispatch(GETWELLLIST)
        },
        changePswd() {
            this.$refs.pswdForm.validate(async (valid) => {
                if (!valid) return
                const { data: res } = await this.$http.put(
                    '/api/changePassword/' + this.user.username,
                    this.pswdForm
                )
                if (res.meta.status !== 200) {
                    return this.$message.error(res.meta.msg)
                }
                this.$message.success(res.meta.msg + ', 请使用新密码再次登录')
                window.sessionStorage.clear()
                this.$router.history.push('/login')
            })
        },
        pswdDialogClose() {
            this.$refs.pswdForm.resetFields()
        },
        logout() {
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
        toggleMenu() {
            this.isCollapsed = !this.isCollapsed
        },
        saveNavState(activePath) {
            window.sessionStorage.setItem('activePath', activePath)
            this.activePath = activePath
        },
    },
}
</script>

<style lang="less" scoped>
.home_container {
    height: 100%;

    .el-header {
        background-color: #019f89;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        color: #fff;
        font-size: 20px;
        .logo {
            display: flex;
            align-items: center;
            span {
                margin-left: 15px;
            }
            img {
                height: 60px;
                border-radius: 5px;
            }
        }
        .options {
            .el-button {
                cursor: pointer;
                margin: 0;
                padding: 7px;
            }
        }
    }
    .el-aside {
        background-color: #019f89;
        .toggle_btn {
            background-color: #019f89;
            font-size: 10px;
            line-height: 24px;
            text-align: center;
            color: white;
            letter-spacing: 0.2em;
            cursor: pointer;
        }
        .el-menu {
            border-right: none;
        }
        .iconfont {
            margin-right: 10px;
        }
    }
    .el-main {
        background-color: #eaedf1;
    }
}
</style>
