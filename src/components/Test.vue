<template>
    <div class="wrapper">
        <p>hi</p>
    </div>
</template>

<script>
  import WS from '../utils/websocket'

  export default {
    data() {
      return {
        ws: new WS()
      }
    },
    created() {
      this.ws.registerAction({
        action: 'getData',
        socketType: 'getLiveData',
        value: '',
        cb:this.cb
      })

    },
    mounted() {
      this.ws.connect()
    },
    methods:{
      cb(res){
        console.log(res)
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
