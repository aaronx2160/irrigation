

export default class WS {
    socketActionsMap={}
    socketInstance ={}
connect(){
    this.socketInstance=new WebSocket(process.env.VUE_APP_WSURL)
    this.socketInstance.onopen = this.onwsopen(this)
    this.socketInstance.onmessage=this.onmessage
}

      registerAction(action){
         this.socketActionsMap[action.socketType] =action
    }
    removeAction(action){
         this.socketActionsMap[action.socketType]=null
    }

    test(){
        console.log(this.socketActionsMap)
    }
    onwsopen(){
        console.log('ws connected')
        console.log(this.socketActionsMap['getLiveData'])
        for (let item in this.socketActionsMap){
            console.log(item)
        }
    }
    onmessage(e){
        console.log(e)
    }

}