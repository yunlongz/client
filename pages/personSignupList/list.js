var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
// pages/personSignupList/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signList: [],
    totalPage:1,
    loadingData: false,
    currentPage:0
  },
  //获取活动列表
  getActivity: function (id) {
    var that = this
    if(id != undefined){
      wx.request({
        url: config.service.getOwnListUrl,
        // login: true,
        data: {
          wxopenid:id,
          currentPage:this.data.currentPage
        },
        success: (result)=>{
          console.log("获取报名列表成功----->own  ", result)

          this.setData({
            signList: ((data) => {
              for (let i = 0; i < data.length; i++) {
                data[i].department = util.changeDepartmentNameByCode(data[i].department)
              }
              return data
            })(result.data.list || []),
            totalPage: result.data.totalPage || 0,
            loadingData: false,
            resultText:result.data.list ? "" : "尚未报名活动"
          })
        },
        fail:(res)=>{
          console.log(res)
        }
      })
    }else{
      util.showModel('查询失败', '')
    }
   
    console.log('进入加载活动列表')
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getActivity(options.id)
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