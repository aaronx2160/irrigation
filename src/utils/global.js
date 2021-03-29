import { DEV, PROD } from './config'

const global = {}
global.getEnv = function() {
  let env = 'development'
  if (process.env.NODE_ENV) {
    env = process.env.NODE_ENV
  }
  return env
}
global.init = function() {
  let env = this.getEnv()
  return env==='development'?DEV:PROD
  // return new Promise((resolve, reject) => {
  //   try {
  //     let env = this.getEnv()
  //     if (env === 'development') {
  //       SocketService.Instance.connect(DEV.wsUrl)
  //     } else {
  //       SocketService.Instance.connect(PROD.wsUrl)
  //     }
  //     resolve()
  //   } catch (e) {
  //     reject(e)
  //   }
  // })
}

export default global
