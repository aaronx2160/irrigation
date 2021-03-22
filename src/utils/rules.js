const rules = {
  required: { required: true, message: '必填区域', trigger: 'blur' },
  number: {
    type: 'number',
    message: '该区域要求填写数字内容',
    trigger: 'change'
  },
  numberltzero: (rule, value, callback) => {
    if (value != '') {
      if (/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) == false) {
        callback(new Error('请填写大于0的数字'))
      } else {
        callback()
      }
    } else {
      callback()
    }
  },
  trigger: 'change'
}

export default rules
