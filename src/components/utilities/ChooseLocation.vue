<template>
  <div class="container">
    <el-form label-width="65px">
      <el-form-item label="省份：">
        <el-select v-model="provinceId" placeholder="请选择" size="mini">
          <el-option
            v-for="province in provinces"
            :key="province.Id"
            :label="province.WaterAreaName"
            :value="province.Id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="市：">
        <el-select v-model="cityId" placeholder="请选择" size="mini">
          <el-option
            v-for="city in cities"
            :key="city.Id"
            :label="city.WaterAreaName"
            :value="city.Id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="区县：">
        <el-select v-model="districtId" placeholder="请选择" size="mini">
          <el-option
            v-for="district in districts"
            :key="district.Id"
            :label="district.WaterAreaName"
            :value="district.Id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="乡镇：">
        <el-select v-model="townId" placeholder="请选择" size="mini">
          <el-option
            v-for="town in towns"
            :key="town.Id"
            :label="town.WaterAreaName"
            :value="town.Id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" 村：">
        <el-select v-model="villageId" placeholder="请选择" size="mini">
          <el-option
            v-for="village in villages"
            :key="village.Id"
            :label="village.WaterAreaName"
            :value="village.Id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { GETAREAS } from '../../store/types'

export default {
  name: 'ChooseLocation',
  data() {
    return {
      provinceId: '',
      cityId: '',
      districtId: '',
      townId: '',
      villageId: ''
    }
  },
  computed: {
    provinces() {
      const areas = this.$store.getters.getAreas
      return areas.filter(v => {
        return v.WaterAreaLevel === 1
      })
    },
    cities() {
      const areas = this.$store.getters.getAreas
      return areas.filter(v => {
        return v.ParentWaterAreaId === this.provinceId
      })
    },
    districts() {
      const areas = this.$store.getters.getAreas
      return areas.filter(v => {
        return v.ParentWaterAreaId === this.cityId
      })
    },
    towns() {
      const areas = this.$store.getters.getAreas
      return areas.filter(v => {
        return v.ParentWaterAreaId === this.districtId
      })
    },
    villages() {
      const areas = this.$store.getters.getAreas
      return areas.filter(v => {
        return v.ParentWaterAreaId === this.townId
      })
    }
  },
  created() {
    this.getArea()
  },
  methods: {
    getArea() {
      this.$store.dispatch(GETAREAS)
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  display: flex;
}
.el-select {
  width: 120px;
}
</style>
