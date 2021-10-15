const app = getApp();
Page({
    data: {
        user: wx.getStorageSync("user")
        // user: {
        //     nikeName: "",
        //     avatarUrl: wx.getStorageSync("avatarUrl"),
        //     isCard: true,
        //     cardId: "",
        //     isStudent: false,
        //     studentId: "",
        //     like: "99",
        //     reply: "100",
        // },
    },
    getInfo: function (e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            withCredentials: true,
            lang: "zh_CN",
            success: (res) => {
                console.log(res.userInfo);
                //获取到用户信息
                this.setData({
                    user: res.userInfo,
                });
                console.log(this.data.user);
                app.com.post(
                    "/User/updateUser",
                    {
                        nickName: res.userInfo.nickName,
                        avatarUrl: res.userInfo.avatarUrl,
                        openId: wx.getStorageSync("openId")
                    },
                    function (res) {
                        wx.setStorageSync("user", res.userInfo);
                    }
                );
            },
        });
    },
});
