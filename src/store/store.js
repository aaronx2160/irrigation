import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import axios from 'axios'
import {
    CHANGEUSR,
    GETAREAS,
    GETLIVEDATALIST,
    GETMENULIST,
    GETROLELIST,
    GETWATERAREAS,
    GETWELLLIST,
} from './types'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [persistedState()],
    state: {
        user: {},
        areas: [],
        areaChosen: {},
        liveDataList: [],
        menuList: [],
        roleList: [],
        wellList: [],
        waterAreas: [],
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getAreas(state) {
            return state.areas
        },
        getWellList(state) {
            return state.wellList
        },
        getLiveData(state) {
            return state.liveDataList
        },
        getMenuList(state) {
            return state.menuList
        },
        getRoleList(state) {
            return state.roleList
        },
        getWaterAreas(state) {
            return state.waterAreas
        },
    },
    mutations: {
        [CHANGEUSR](state, user) {
            state.user = user
        },
        [GETROLELIST](state, roleList) {
            state.roleList = roleList
        },

        [GETAREAS](state, areas) {
            state.areas = areas
        },
        [GETLIVEDATALIST](state, liveDataList) {
            state.liveDataList = liveDataList
        },
        [GETMENULIST](state, menuList) {
            state.menuList = menuList
        },
        [GETWELLLIST](state, wellList) {
            state.wellList = wellList
        },
        [GETWATERAREAS](state, waterAreas) {
            state.waterAreas = waterAreas
        },
    },
    actions: {
        async changeUser(context, payload) {
            const { data: res } = await axios.post('/api/login', payload)
            if (res.meta.status !== 200) {
                return { msg: res.meta.msg }
            } else {
                context.commit(CHANGEUSR, res.data)
                return {
                    msg: '登录成功',
                    token: res.data.token,
                }
            }
        },
        async getRoleList(context) {
            const { data: res } = await axios.get('/api/roles')
            if (res.meta.status !== 200)
                return this.$message.error('获取角色列表失败')
            context.commit(GETROLELIST, res.data)
        },
        async getAreas(context) {
            const { data: res } = await axios.get('/api/areas')
            if (res.meta.status !== 200) {
                return { msg: res.meta.msg }
            } else {
                context.commit(GETAREAS, res.data)
            }
        },
        async getLiveDataList(context) {
            const { data: res } = await axios.get('/api/liveDataList')
            if (res.meta.status !== 200) {
                return { msg: res.meta.msg }
            } else {
                // res.data.map((v) => {
                //     v.NetState = v.NetState === 0 ? '离线' : '在线'
                //     v.PumpState = v.PumpState === 0 ? '关闭' : '开启'
                //     v.CardState = v.CardState === 0 ? '下卡' : '上卡'
                // })
                return context.commit(GETLIVEDATALIST, res.data)
            }
        },
        async getWellList(context) {
            const { data: res } = await axios.get('/api/wellList')
            if (res.meta.status !== 200) {
                return { msg: res.meta.msg }
            } else {
                return context.commit(GETWELLLIST, res.data)
            }
        },
        async getWaterAreas(context) {
            const { data: res } = await axios.get('/api/waterAreas')
            if (res.meta.status !== 200) {
                return { msg: res.meta.msg }
            } else {
                return context.commit(GETWATERAREAS, res.data)
            }
        },
    },
})
