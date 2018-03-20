//signup.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var moment = require('../../utils/moment.js')
var app = getApp()
Page({
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
    array: ['CRM', '托管', '员工渠道', 'CSR', '产品','技术支持部'],
    realName: '',
    department: 0,
    activityid:0,
    currentDate:'',
    loading:true,
    loadingData:true,
    activityname:'',
    isSignupEnd:false
    
  },



  getActivity: function () {
    var that = this
    console.log('baoming')
    qcloud.request({
      url: config.service.signActiveUrl,
      login: true,
      data: {
        currentPage: that.data.currentPage,
        currentDate:that.data.currentDate,
        activityName: that.data.activityname
      },
      success(result) {
        console.log("获取当前报名列表", result)

        that.setData({
          signList: ((data)=>{
            for(let i = 0 ; i < data.length ; i++){
              data[i].department = util.changeDepartmentNameByCode(data[i].department)
            }
            return data
          })(result.data.list),
          totalPage: result.data.totalPage,
          loadingData:false
        })
      }
    })
  },
  loadMore: function () {
    var that = this
    console.log('loadmore')
    this.setData({
      loadingData:true
    })
    qcloud.request({
      url: config.service.signActiveUrl,
      login: true,
      data: {
        currentPage: that.data.currentPage
      },
      success(result) {
        console.log("加载更多报名列表", result)
        that.setData({
          signList: that.data.signList.concat(result.data.list),
          totalPage: result.data.totalPage,
          loadingData:false
        })
      }
    })

  },
  addUserInfo: function (callback) {
    // insertUserInfoUrl
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
        util.showSuccess('报名成功', "您已成功报名活动")
        callback(result)
        // that.data.isSigned = true
        // that.getActivity()
      },
      fail(error) {
        util.showModel('报名失败', error)
        console.log('报名失败', error)
      }
    })
  },
  signupActivity: function () {
    var that = this
    console.log('点击报名')
    if (this.data.hasRealName) {
      this.signup()
    }
    else {
      this.setData({
        hiddenmodalput: !this.data.hiddenmodalput
      })
    }
  },
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function (e) {
    var that = this
    console.log(e)
    if (this.data.realName == null) {
      util.showModel('报名失败', '姓名必须填写')
      return
    }
    util.showBusy('正在报名')
    this.addUserInfo(function (res) {
      if(res.data.error){
        util.showModel('报名失败', res.data.error.code)
      }else{
        console.log("报名成功-------callback", res)
        that.setData({
          hiddenmodalput: true,
          hasRealName: true,
          isSigned: true
        })
        that.signup()
      }
     
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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      department: e.detail.value
    })
  },

  signup: function () {
    console.log('报名活动,插入数据')
    var that = this
    wx.request({
      url: config.service.sinsertActiveUrl,
      // login: true,
      data: {
        activityid: that.data.activityid,
        signdate: that.data.currentDate,
        userid: that.data.openId,
        realname: that.data.realName,
        activityname: that.data.activityname
      },
      header: {//请求头
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success(result) {
        console.log("报名成功------>", result)
        util.showSuccess('报名成功')
        // that.data.isSigned = true
        that.setData({
          isSigned:true
        })
        that.getActivity()
      },
      fail(error) {
        util.showModel('报名失败', error)
        console.log('报名失败', error)
      }
    })
  },
  // 用户登录示例
  login: function () {
    if (this.data.logged) return

    util.showBusy('正在登录')
    var that = this

    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          util.showSuccess('登录成功')
          that.setData({
            userInfo: result,
            logged: true
          })
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              console.log(result)
              util.showSuccess('登录成功')
              that.setData({
                userInfo: result.data.data,
                logged: true
              })
              that.getActivity()
            },

            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
  },

  
  isSigned:function(cb){
    var that = this
    wx.request({
      url: config.service.isSignedUrl,
      data: {
        openId: app.globalData.openId,
        currentDate: that.data.currentDate,
        activityname: that.data.activityname
      },
      success:function(res){
        console.log("isSigned------------->",res)
        cb()
        if(res.data.result.length > 0){
          that.setData({
            isSigned:true
          })
        }
      },
      fail:function(res){
        console.log('fail isSigned', error)
      }
    })
  },
  onLoad: function (options) {

    var that = this

    console.log("options",options)
    wx.setNavigationBarTitle({
      title: options.title//页面标题为路由参数
    })
    this.setData({
      activityid: options.activityid,
      currentDate: util.getCurrentDate(options.serverDate,options.activityid),
      activityname: options.title,
      isSignupEnd: options.isSignupEnd == 'true' ? true : false 
    })
    
   
    if(!this.data.isSigned){
      this.isSigned(function(){
        that.setData({
          loading: false
        })
        
      })
      
    }
    this.getActivity()


    if (app.globalData.openId != null) {
      this.setData({
        logged:true,
        userInfo: app.globalData.userInfo,
        openId: app.globalData.openId,
        realName: app.globalData.realname,
        hasRealName: app.globalData.realname !=null 
      })
      return 
    }
    if(this.data.logged){
      return 
    }
    util.showBusy('正在登录')

     //调用应用实例的方法获取全局数据
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
          openId: results.openId,
        },
        success: function (res) {
          console.log("*****>>>", res)
          that.setData({
            loading:false
          })
          if (res.data.result.length == 0) {
            // util.showSuccess('实名制')
          }
          else {
            console.log(res)
            that.setData({
              hasRealName: true,
              realName: res.data.result[0].realname
            })
          }
        },
        fail: function (e) {
          console.log(e)
        }
      })
    })
  },
  onReachBottom: function () {

    if (this.data.currentPage + 1 < this.data.totalPage) {

      this.data.currentPage++

      console.log(this.data.currentPage)

      this.loadMore()
    }
  },
  
})
