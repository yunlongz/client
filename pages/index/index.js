//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var moment = require('../../utils/moment.js')
var app = getApp()
// pages/signup/signup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    isSigned: false,
    signList: [],
    currentPage: 0,
    totalPage: 1,
    openId: null,
    hasRealName: false,
    hiddenmodalput: true,
    array: config.departments,
    realName: '',
    department: 0,
    lastLoggedTime: moment(wx.getStorageSync('logs')[0]).format("LLL"),
    totalCount: 0,
    activityName: '羽毛球',
    enName:'badminton',
    totalSignedList: ((list) => {
      let newSignedList = {}
      let keylist = Object.keys(list)
      for (var i = 0; i < keylist.length; i++) {
        newSignedList[keylist[i]] = {}
      }
      return newSignedList
    })(config.activityTemplateData),
    categories: config.categories,
    activeCategoryId: 0,
    actived: 0,
    isSignupEnd: [false, false, false, false, false, false, false],
    serverDate: moment(),
    activityTemplateData: ((list) => {
      let newList = []
      // console.log("&&&&&",Object.keys(list))
      let keylist = Object.keys(list)
      for (var i = 0; i < keylist.length; i++) {
        for (let j = 0; j < list[keylist[i]].length; j++) {
          if (list[keylist[i]][j]['activityid'] == 1) {
            list[keylist[i]][j]['activityDate'] = '周一';
            list[keylist[i]][j]['activityDateEn'] = 'monday';

          }
          if (list[keylist[i]][j]['activityid'] == 2) {
            list[keylist[i]][j]['activityDate'] = '周二';
            list[keylist[i]][j]['activityDateEn'] = 'tuesday';
          }
          if (list[keylist[i]][j]['activityid'] == 3) {
            list[keylist[i]][j]['activityDate'] = '周三';
            list[keylist[i]][j]['activityDateEn'] = 'wednesday';
          }
          if (list[keylist[i]][j]['activityid'] == 4) {
            list[keylist[i]][j]['activityDate'] = '周四';
            list[keylist[i]][j]['activityDateEn'] = 'thursday';
          }
          if (list[keylist[i]][j]['activityid'] == 5) {
            list[keylist[i]][j]['activityDate'] = '周五';
            list[keylist[i]][j]['activityDateEn'] = 'friday';
          }
          if (list[keylist[i]][j]['activityid'] == 6) {
            list[keylist[i]][j]['activityDate'] = '周六';
            list[keylist[i]][j]['activityDateEn'] = 'saturday';
          }
          if (list[keylist[i]][j]['activityid'] == 7) {
            list[keylist[i]][j]['activityDate'] = '周天';
            list[keylist[i]][j]['activityDateEn'] = 'sunday';
          }
          list[keylist[i]][j]['name'] = keylist[i]
        }
      }
      console.log(list)
      return list

    })(config.activityTemplateData),
    hiddenNotice:false
  },
  tabClose:function(e){
    this.setData({
      hiddenNotice: !this.data.hiddenNotice
    })
  },
  tabClick: function (e) {
    console.log(e)
    this.setData({
      activeCategoryId: e.currentTarget.id,
      actived: e.currentTarget.id,
      activityName: e.currentTarget.dataset.name,
      enName: e.currentTarget.dataset.enname
    });
    console.log("------------------>", this.data.totalSignedList[e.currentTarget.dataset.enname])
    if (util.isEmptyObject(this.data.totalSignedList[e.currentTarget.dataset.enname])){
      this.getActivity()
    }
    

    //this.getGoodsList(this.data.activeCategoryId);
  },
  bindGoToSignupList: function (e) {
    console.log(e.currentTarget)
    wx.navigateTo({
      url: `../signup/signup?title=${e.currentTarget.dataset.title}&activityid=${e.currentTarget.dataset.activityid}&isSignupEnd=${e.currentTarget.dataset.isSignupEnd}&serverDate=${this.data.serverDate}`,
    })
  },
  getActivity: function (callback) {
    var that = this
    console.log('baoming')
    qcloud.request({
      url: config.service.getAllSignUsersByOneActivityUrl,
      login: true,
      data: {
        currentPage: that.data.currentPage,
        weekStartDay: moment(that.data.serverDate).startOf('week').format('YYYY-MM-DD'),
        weekEndDay: moment(that.data.serverDate).endOf('week').format('YYYY-MM-DD'),
        activityName: that.data.activityName
      },
      success(result) {
        console.log("获取当前报名列表", result)
        typeof callback == "function" && callback()
        let totalSignedList = {}

        let groupedList = that.groupListByActivityAndWeek(result.data.list, result.data.listCount)
        console.log('magic list ', groupedList)
        let obj = that.data.totalSignedList
        obj[that.data.enName] = groupedList
        console.log(obj)
        that.setData({
          totalSignedList: obj,
          // totalPage: result.data.totalPage,
          // totalCount:result.data.totalCount
        })
      }
    })
  },
  groupListByActivityAndWeek(list, listCount) {
    let newListObject = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []

    }
    function limit(num, array) {
      if (array.length > num) {
        array = array.slice(0, num)
      }
      return array
    }
    function groupCount(i, day) {
      for (let j = 0; j < listCount.length; j++) {
        if (moment(listCount[j]['signdate']).format('E') == day) {

          list[i].totalCount = listCount[j]['COUNT(signdate)']
        }
      }
    }
    if (list.length > 0 && listCount.length > 0) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].activityid == 1) {
          groupCount(i, 1)

          if (newListObject.monday.length < config.constants.showLimitNum) {
            newListObject.monday.push(list[i])
          }
        }
        if (list[i].activityid == 2) {
          groupCount(i, 2)
          if (newListObject.tuesday.length < config.constants.showLimitNum) {
            newListObject.tuesday.push(list[i])
          }
        }
        if (list[i].activityid == 3) {
          groupCount(i, 3)
          if (newListObject.wednesday.length < config.constants.showLimitNum) {
            newListObject.wednesday.push(list[i])
          }
        }
        if (list[i].activityid == 4) {
          groupCount(i, 4)
          if (newListObject.thursday.length < config.constants.showLimitNum) {
            newListObject.thursday.push(list[i])
          }
        }
        if (list[i].activityid == 5) {
          groupCount(i, 5)
          if (newListObject.friday.length < config.constants.showLimitNum) {
            newListObject.friday.push(list[i])
          }
        }
        if (list[i].activityid == 6) {
          groupCount(i, 6)
          if (newListObject.saturday.length < config.constants.showLimitNum) {
            newListObject.saturday.push(list[i])
          }
        }
        if (list[i].activityid == 7) {
          groupCount(i, 7)
          if (newListObject.sunday.length < config.constants.showLimitNum) {
            newListObject.sunday.push(list[i])
          }
        }
      }
    }

    return newListObject
  },

  getNotice: function () {
    var that = this;
    this.setData({
      noticeList: [{
        id: 1, title: "羽毛球比赛通知"
      }, {
        id: 2, title: "气排球比赛通知"
      }]
    })
    // wx.request({
    //   url: 'https://api.it120.cc/' + app.globalData.subDomain + '/notice/list',
    //   data: { pageSize: 5 },
    //   success: function (res) {
    //     if (res.data.code == 0) {
    //       that.setData({
    //         noticeList: res.data.data
    //       });
    //     }
    //   }
    // })
  },

  /**
   *  点击头像显示姓名输入框
   */
  userinfoModal: function() {
    this.setData({
      hiddenmodalput: false
    })
  },

  nameCancel: function() {
    this.setData({
      hiddenmodalput: true
    })
  },

  nameConfirm: function() {
    var that = this
    //已实名制，修改交易
    if (this.data.hasRealName) {
      wx.request({
        url: config.service.updateUserInfoUrl,
        data: {
          wxopenid: this.data.openId,
          realname: this.data.realName,
          department: this.data.department
        },
        method: 'post',
        header: {//请求头
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: (result)=>{
          console.log("update姓名")
          console.log(result)
          app.globalData.realname = that.data.realName
          app.globalData.department = that.data.department
          that.setData({
            hiddenmodalput: true
          })
        },
        fail: (error)=>{
          util.showModel('修改失败', error)
        }
      })
    } else {//未实名制，新增交易
      var that = this
      let requestData = {
        wxopenid: this.data.openId,
        nickName: this.data.userInfo.nickName,
        gender: this.data.userInfo.gender,
        avatarUrl: this.data.userInfo.avatarUrl,
        realname: this.data.realName,
        department: this.data.department
      };
      console.log('add user', requestData)
      wx.request({
        url: config.service.insertUserInfoUrl,
        // login: true,
        data: requestData,
        header: {//请求头
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success(result) {
          util.showSuccess('报名成功', "您已成功添加姓名")
          that.setData({
            hiddenmodalput: true,
          })
          // that.data.isSigned = true
          // that.getActivity()
        },
        fail(error) {
          util.showModel('修改失败', error)
          console.log('修改失败', error)
        }
      })
    }
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      department: e.detail.value
    })
  },
  bindBlur: function (e) {
    console.log(e.detail.value)
    if (e.detail.value == '') {
      return
    }
    else {
      this.setData({
        realName: e.detail.value
      })
    }
  },
  bindKeyInput: function (e) {
    // console.log('当前内容', e.detail.value)
    // this.setData({
    //   realName: e.detail.value
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getEndDay: function (timestamp) {
    let newList = []
    for (let i = 1; i < this.data.isSignupEnd.length + 1; i++) {
      newList.push(i < moment(timestamp).format("E"))
    }

    return newList
  },

  onLoad: function () {
    console.log('onLoad')
    this.getNotice()

    var that = this
    //调用应用实例的方法获取全局数据
    if (this.data.logged) return
    util.showBusy('正在登录')
    app.getUserInfo(function (results) {
      //更新数据
      util.showSuccess('登录成功')
      //that.getActivity()
      that.setData({
        userInfo: results.userInfo,
        openId: results.openId,
        logged: true
      })

      wx.request({
        url: config.service.getUserInfoUrl,
        data: {
          openId: results.openId
        },
        success: function (res) {
          console.log("*****>>>", res)
          that.getActivity()
          if (res.data.result.length == 0) {
            // util.showSuccess('实名制')
          }
          else {
            console.log(res)
            app.globalData.realname = res.data.result[0].realname
            app.globalData.department = res.data.result[0].department
            that.setData({
              hasRealName: true,
              realName: res.data.result[0].realname,
              department: res.data.result[0].department
            })
          }
        },
        fail: function (e) {
          console.log(e)
        }
      })
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
    console.log('*****************************************************************', config)
    var that = this
    if (app.globalData.realname) {
      that.setData({
        hasRealName: true,
        realName: app.globalData.realname
      })
    }
    wx.request({
      url: config.service.getServerDateUrl,
      success: function (res) {
        let isSignupEndList = that.getEndDay(res.data.timestamp)
        console.log(isSignupEndList)
        that.setData({
          isSignupEnd: isSignupEndList,
          serverDate: res.data.timestamp
        })
      }
    })

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
    console.log("下拉动作")
    this.getActivity(function () {
      console.log("stop()")
      wx.stopPullDownRefresh()
    })
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