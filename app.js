//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var moment = require('./utils/moment.js')
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(new Date().getTime())
    wx.setStorageSync('logs', logs)
    qcloud.setLoginUrl(config.service.loginUrl)

    this.testDate()


  },

  testDate: function(){
    console.log("--------------------------------")
      let currentDate = moment().format('L')
      var weekOfday = moment().format('E');//计算今天是这周第几天  
      var last_monday = moment().subtract(weekOfday + 7 - 1, 'days').format('YYYY/MM/DD');//周一日期  
      var last_sunday = moment().subtract(weekOfday, 'days').format('YYYY/MM/DD');
      console.log(moment().day("6").format("L"))
      console.log(weekOfday)
      console.log(last_monday)
      console.log(last_sunday)
      console.log("--------------------------------")
  },

  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb({ userInfo: that.globalData.userInfo, openId: that.globalData.openId })
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          console.log(res)
          if(res){
            wx.request({
              url: config.service.getOpenIdUrl,
              data: {
                code: res.code
              },
              success:function(res){
                console.log(res)
                that.globalData.openId = res.data.openid;
                wx.getUserInfo({
                  success: function (res) {
                    console.log(res)
                    that.globalData.userInfo = res.userInfo;
                    typeof cb == "function" && cb({ userInfo: that.globalData.userInfo, openId: that.globalData.openId})
                  }
                })
              }
            })
            
          }
          
        }
      });
    }
  },
  globalData: {
    userInfo: null,
    openId:null,
    realname:null
  }
})