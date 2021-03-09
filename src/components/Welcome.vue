<template>
  <div class="wrapper">
    <LiveCharts></LiveCharts>
  </div>
</template>

<script>
import LiveCharts from './liveInfo/LiveCharts'
import { GETLIVEDATALIST, GETWATERAREAS } from '../store/types'
export default {
  components: {
    LiveCharts
  },
  mounted() {
    this.$store.dispatch(GETLIVEDATALIST)
    this.$store.dispatch(GETWATERAREAS)
  }
}
</script>

<style scoped>
html,
body,
.wrapper {
  height: 100%;
}
</style>
