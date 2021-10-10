// app.js
let com = require('./utils/util.js')
App({
    com: com,
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        wx.getSystemInfo({
            success: e => {
                this.globalData.StatusBar = e.statusBarHeight;
                let capsule = wx.getMenuButtonBoundingClientRect();
                if (capsule) {
                    this.globalData.Custom = capsule;
                    this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
                } else {
                    this.globalData.CustomBar = e.statusBarHeight + 50;
                }
            }
        })
    },

    // 登录
    login(cb) {
        wx.login({
            success(res) {
                com.post('User/login', {js_code: res.code}, function (res) {
                    //是否获取到用户的openid
                    if (res.code === 1) {
                        //会话token
                        wx.setStorageSync("token", res.token)
                        wx.setStorageSync("user", res.msg)
                    }
                })
            }
        })
    },


    globalData:
        {
            userInfo: null
        }
})
