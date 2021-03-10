const getDeviceNames = (deviceArr, idArr) => {
  const deviceNameArr = []
  for (let i = 0; i < idArr.length; i++) {
    deviceArr.map(v => {
      if (v.DeviceCode === idArr[i].DeviceCode) {
        deviceNameArr.push(v.DeviceName)
      }
    })
  }
  return deviceNameArr
}

export default getDeviceNames
