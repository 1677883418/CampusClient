// app.js
let com = require("./utils/util.js");
App({
    com: com,
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync("logs") || [];
        logs.unshift(Date.now());
        wx.setStorageSync("logs", logs);
        //获取系统信息
        wx.getSystemInfo({
            success: (e) => {
                this.globalData.StatusBar = e.statusBarHeight;
                let capsule = wx.getMenuButtonBoundingClientRect();
                if (capsule) {
                    this.globalData.Custom = capsule;
                    this.globalData.CustomBar =
                        capsule.bottom + capsule.top - e.statusBarHeight;
                } else {
                    this.globalData.CustomBar = e.statusBarHeight + 50;
                }
            },
        });

        // 登录
        wx.login({
            success(res) {
                // 设置用户信息默认值
                com.post("User/login", {jsCode: res.code}, function (res) {
                    // console.log(res.data)
                    //是否获取到用户的openid和token
                    if (res.code === 0) {
                        //缓存会话token和用户openId
                        wx.setStorageSync("token", res.data.session_key);
                        wx.setStorageSync("openId", res.data.openid);
                        //用openid请求数据库,若data为null,则用户表中新建用户
                        com.get(
                            "User/queryUserByOpenId/" + res.data.openid,
                            {},
                            function (res) {
                                //判断是否有用户数据,若无,则新建用户
                                if (res.data == null) {
                                    com.post(
                                        "User/addUser",
                                        {
                                            openId: wx.getStorageSync("openId"),
                                        }
                                    );
                                } else {
                                    //若查询到用户信息,则将返回值存入本地
                                    wx.setStorageSync("user", res.data);
                                }
                                console.log(wx.getStorageSync("user"));
                            }
                        );
                    }
                });
            },
        });
    },

    globalData: {
        userInfo: null,
    },
});
