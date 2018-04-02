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
    realname:null,
    department:null
  }
})