/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://7bgpkgeo.qcloud.la';
//生产环境request域名
// var host = 'https://953500312.cksign.club'
var config = {

  // 下面的地址配合云端 Demo 工作
  service: {
    host,

    // 登录地址，用于建立会话
    loginUrl: `${host}/weapp/login`,

    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/weapp/user`,

    // 测试的信道服务地址
    tunnelUrl: `${host}/weapp/tunnel`,

    // 上传图片接口
    uploadUrl: `${host}/weapp/upload`,

    signActiveUrl: `${host}/weapp/signActive`,

    sinsertActiveUrl: `${host}/weapp/sinsert`,

    insertUserInfoUrl: `${host}/weapp/insertUserInfo`,

    updateUserInfoUrl: `${host}/weapp/updateUserInfo`,

    getOpenIdUrl: `${host}/weapp/getOpenId`,

    getUserInfoUrl: `${host}/weapp/getUserInfo`,

    isSignedUrl: `${host}/weapp/isSigned`,

    getAllSignUsersByOneActivityUrl: `${host}/weapp/getAllSignUsersByOneActivity`,

    getServerDateUrl: `${host}/weapp/getServerDate`,

    cancelSignupUrl: `${host}/weapp/cancelSignup`,

    getOwnListUrl: `${host}/weapp/getOwnList`,

  },
  constants: {
    showLimitNum: 10     //首页显示的头像图标个数


  },

  departments: ['CRM', '托管', '网点渠道', 'CSR', '产品', '技术管理处', '测试与推广支持处', '综合部','中心领导'],
  categories: [
    { name: "羽毛球", id: 0, enName: 'badminton' },
    { name: "气排球", id: 1, enName: 'gasVolleyball' },
    { name: "篮球", id: 2, enName: 'basketball' },
    { name: "瑜伽", id: 3, enName: 'yoga' },
    { name: "舞蹈", id: 4, enName: 'dance' },
    // { name: "桌游", id: 3 },
    // { name: "乒乓球", id: 4 },
    // { name: "足球", id: 5 },
    // { name: "台球", id: 6 },
  ],
  activityTemplateData: {
    badminton: [{
      id: 1,
      name: 'badminton',
      title: '羽毛球',
      activityid: 1,    //1..7 分别代表星期一到星期天
      activityStartTime: '12:00',
      activityEndTime: '13:30',
      activitySite: '611体育活动中心',
      activityPeopleLimit: 40,
    }, {
      id: 2,
      title: '羽毛球',
      activityid: 3,    //1..7 分别代表星期一到星期天
      activityStartTime: '12:00',
      activityEndTime: '13:30',
      activitySite: '611体育活动中心',
      activityPeopleLimit: 40,
    }, {
      id: 3,
      title: '羽毛球',
      activityid: 4,    //1..7 分别代表星期一到星期天
      activityDate: '周四',
      activityStartTime: '12:00',
      activityEndTime: '13:30',
      activitySite: '611体育活动中心',
      activityPeopleLimit: 40,
    }],
    //气排球
    gasVolleyball: [{
      id: 1,
      title: '气排球',
      activityid: 2,    //1..7 分别代表星期一到星期天
      activityDate: '周二',
      activityStartTime: '12:00',
      activityEndTime: '13:30',
      activitySite: '611体育活动中心',
      activityPeopleLimit: 40
    }, {
      id: 2,
      title: '气排球',
      activityid: 5,    //1..7 分别代表星期一到星期天
      activityDate: '周五',
      activityStartTime: '12:00',
      activityEndTime: '13:30',
      activitySite: '611体育活动中心',
      activityPeopleLimit: 40
    }],
    //篮球
    basketball:[
      {
        id: 1,
        title: '篮球',
        activityid: 3,    //1..7 分别代表星期一到星期天
        activityDate: '周三',
        activityStartTime: '18:20',
        activityEndTime: '22:00',
        activitySite: '四川大学华西校区篮球场',
        activityPeopleLimit: 60
      }
    ],
    yoga: [
      {
        id: 1,
        title: '瑜伽',
        activityid: 1,    //1..7 分别代表星期一到星期天
        activityDate: '周一',
        activityStartTime: '12:00',
        activityEndTime: '13:00',
        activitySite: '航天四十楼活动室',
        activityPeopleLimit: 30
      },
      {
        id: 2,
        title: '瑜伽',
        activityid: 4,    //1..7 分别代表星期一到星期天
        activityDate: '周四',
        activityStartTime: '12:15',
        activityEndTime: '13:15',
        activitySite: '航天四十楼活动室',
        activityPeopleLimit: 30
      }
    ],
    dance: [
      {
        id: 1,
        title: '舞蹈',
        activityid: 4,    //1..7 分别代表星期一到星期天
        activityDate: '周三',
        activityStartTime: '12:15',
        activityEndTime: '13:15',
        activitySite: '航天四十楼活动室',
        activityPeopleLimit: 30
      }
    ]
  }


};

module.exports = config;
