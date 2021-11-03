const app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    data: {
        user: wx.getStorageSync("user")
    },
    lifetimes: {
        attached: function () {
            this.setData({
                user: wx.getStorageSync("user")
            })
            // 在组件实例进入页面节点树时执行
            console.log(this.data.user.nickName)
            console.log(wx.getStorageSync("user").nickName);
            if (wx.getStorageSync("user").nickName == null) {
                wx.showModal({
                    title: '😜',
                    content: '您还没有注册哟~\r\n是否现在注册？',
                    cancelText: '下次一定',
                    confirmText: '确认注册',
                    success(res) {
                        if (res.confirm) {
                            wx.navigateTo({
                                url: "../../pages/home/mine/login/login"
                            })
                        } else if (res.cancel) {
                            wx.showModal({
                                title: '🐹',
                                content: '如果您改变主意的话\r\n再次点开此页面即可注册哟~',
                                confirmText: '就这样吧',
                                showCancel: false
                            })
                        }
                    }
                })
            }
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },

    methods: {
        navigateToLogin: function () {
            wx.navigateTo({
                url: "/pages/home/mine/login/login"
            })
        }
    }
});
