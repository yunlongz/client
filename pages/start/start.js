var app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {}
  },
  goToIndex: function () {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  onLoad: function () {
    var that = this
    wx.setNavigationBarTitle({
      title: '活动签到'//wx.getStorageSync('mallName') 
    })
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo.userInfo
      })
    })
  },
  onShow: function () {

  },
  onReady: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  }
});