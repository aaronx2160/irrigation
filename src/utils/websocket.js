export default class WS {
  socketActionsMap = {}
  socketInstance = {}

  connect() {
    this.socketInstance = new WebSocket(process.env.VUE_APP_WSURL)
    this.socketInstance.onopen = ()=>this.onwsopen()
    this.socketInstance.onmessage = this.onmessage
    this.socketInstance.socketActionsMap=this.socketActionsMap
  }

  registerAction(action) {
    this.socketActionsMap[action.socketType] = action
  }

  removeAction(action) {
    this.socketActionsMap[action.socketType] = null
  }

  getSocketActionsMap(){
    return this.socketActionsMap
  }
  onwsopen() {
    for (let item in this.socketActionsMap) {
      this.socketInstance.send(JSON.stringify(this.socketActionsMap[item]))
    }
  }

  onmessage(e) {
    const res = JSON.parse(e.data)
    this.socketActionsMap[res.socketType].cb(res.data)

  }

  send(data){
    this.socketInstance.send(data)
  }

}
