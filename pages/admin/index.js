var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var moment = require('../../utils/moment.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
    activityDay: [],
    peroidStart:'',
    timeStartList:[],
    timeEndList:[],
    peroidEnd:'',
    activitySite:[],
    activityList:[],
    title:"羽毛球"
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(e.currentTarget.id)
    let id = e.currentTarget.id
    let newActivityDay = this.data.activityDay.map((item,i)=>{
      if (i == id){
        return item = parseInt(e.detail.value)
      }
      return item
    })
   
    this.setData({
      activityDay: newActivityDay
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(e.currentTarget.id)
    let id = e.currentTarget.id
    let timeStartList = this.data.timeStartList.map((item, i) => {
      if (i == id) {
        return item = e.detail.value
      }
      return item
    })
    this.setData({
      timeStartList: timeStartList
    })
  },

  bindTimeEndChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(e.currentTarget.id)
    let id = e.currentTarget.id
    let timeEndList = this.data.timeEndList.map((item, i) => {
      if (i == id) {
        return item = e.detail.value
      }
      return item
    })
    this.setData({
      timeEndList: timeEndList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: config.service.getServerDateUrl,
      success: (res)=>{
        // let isSignupEndList = that.getEndDay()
        let timestamp = res.data.timestamp
        this.setData({
            periodStart: moment(timestamp).startOf('week').format('YYYY/MM/DD'),
            periodEnd: moment(timestamp).endOf('week').format('YYYY/MM/DD'),
        })
      }
    })

    wx.request({
      url: config.service.getActivityListUrl,
      success: (res) => {
        // let isSignupEndList = that.getEndDay()
        let activityDay = [],
          timeStartList = [],
          timeEndList = [],
          activitySite = [];
           
        res.data['yoga'].map((item,i)=>{
          
          activityDay.push(item.activityid - 1)
          timeStartList.push(item.activityStartTime)
          timeEndList.push(item.activityEndTime)
          activitySite.push(item.activitySite)
        })
        console.log(res)
        this.setData({
          activityList:res.data['yoga'],
          activityDay: activityDay,
          timeStartList: timeStartList,
          timeEndList: timeEndList,
          activitySite: activitySite
        })
      }
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log('form发生了submit事件，携带数据为：', e.detail.target.id)  //主键
    // return 
    wx.request({
      url: config.service.updateActivityById,
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data:{
        id: e.detail.target.id,
        activityid: e.detail.value.activityDay + 1,
        activitySite: e.detail.value.activitySite,
        activityStartTime: e.detail.value.timeStartList,
        activityEndTime: e.detail.value.timeEndList
      },
      success:(res)=>{
        console.log(res)
        if(res.data.code == -1){
          util.showModel('修改活动失败', '请联系管理员（rtx：吴轶峰）')
        }
        if(res.data == 1){
          util.showSuccess('修改成功')
        }
      },
      fail(error) {
        util.showModel('查询活动列表失败', error)
        console.log('查询活动列表失败', error)
      },
    })
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