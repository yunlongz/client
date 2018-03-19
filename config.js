/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
// var host = 'https://7bgpkgeo.qcloud.la';
//生产环境request域名
var host = 'https://953500312.cksign.club'
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

        getOpenIdUrl : `${host}/weapp/getOpenId`,

        getUserInfoUrl : `${host}/weapp/getUserInfo`,

        isSignedUrl: `${host}/weapp/isSigned`,

        getAllSignUsersByOneActivityUrl: `${host}/weapp/getAllSignUsersByOneActivity`,

        getServerDateUrl: `${host}/weapp/getServerDate`
    },
    constants:{
      showLimitNum:10
    }
};

module.exports = config;
