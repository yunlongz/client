var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // wx.request({
    //   url: 'https://api.it120.cc/' + app.globalData.subDomain + '/notice/detail',
    //   data: {
    //     id: options.id
    //   },
    //   success: function (res) {
    //     if (res.data.code == 0) {
    //       that.setData({
    //         notice: res.data.data
    //       });
    //       WxParse.wxParse('article', 'html', res.data.data.content, that, 5);
    //     }
    //   }
    // })
    var article = `#气排球比赛通知

##本周比赛队伍（托管  vs  产品）

四月份进行气排球比赛，分组循环赛，赛制将于下周公布

    `;

    WxParse.wxParse('article', 'markdown', article, that, 5);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})