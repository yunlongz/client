// pages/qrcode/qrsign.js
import drawQrcode from '../../utils/qrcode.js'
var config = require('../../config')
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
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(123)
    wx.request({
      url: config.service.sendMailToManager,
      success:(res)=>{
        console.log(res)
      }
    })


    // wx.request({
    //   url: config.service.getToken,
     
    //   success: function (res) {
    //     console.log(res)
    //     wx.request({
    //       url: `https://api.weixin.qq.com/wxa/getwxacode?access_token=${res.data.access_token}`,
    //       method:'POST',
    //       data:{
    //         "path": "pages/index", "width": 430
    //       },
    //       success:function(response){
    //         console.log("*********")
    //         console.log(response)
    //       }
    //     })
    //     // drawQrcode({
    //     //   width: 200,
    //     //   height: 200,
    //     //   canvasId: 'myQrcode',
    //     //   text: `https://api.weixin.qq.com/wxa/getwxacode?access_token=${res.data.access_token}`
    //     // })
    //   }
    // })
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