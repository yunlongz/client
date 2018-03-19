var moment = require('./moment.js')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

const getCurrentDate = (serverDate,day) => {
 
  return moment(Number(serverDate)).startOf('week').add(parseInt(day) - 1, 'days').format('YYYY-MM-DD')
}

const changeDepartmentNameByCode = (code) => {
  let department = ''
  switch (code) {
    case 0: return department = "CRM";
    case 1: return department = "托管";
    case 2: return department = "员工渠道";
    case 3: return department = "CSR";
    case 4: return department = "产品";
    case 5: return department = "技术支持部";
    default: return department 
  }
}

module.exports = { formatTime, showBusy, showSuccess, showModel, getCurrentDate, changeDepartmentNameByCode}
