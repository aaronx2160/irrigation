<template>
  <div class="wrapper">
    <p>hi</p>
  </div>
</template>

<script>
import WS from "../utils/websocket";
export default {
  data(){
    return{
      ws:new WS()
    }
  },
  mounted() {

    this.ws.registerAction({
      action: 'getData',
      socketType: 'getLiveData',
      value: ''
    })
    this.ws.test()
  }
}
</script>

<style lang="less" scoped>
</style>