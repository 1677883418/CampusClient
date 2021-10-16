const app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    data: {
        user: wx.getStorageSync("user")
        /*        user: {
                    nickName: "肥羊",
                    avatarUrl: wx.getStorageSync("avatarUrl"),
                    isCard: true,
                    cardId: "",
                    isStudent: false,
                    studentId: "",
                    like: "99",
                    reply: "100",
                },*/
    },
    lifetimes: {
        attached: function () {
            // 在组件实例进入页面节点树时执行
            console.log(this.data.user.nickName)
            if (wx.getStorageSync("user".nickName) == null) {
                wx.showModal({
                    title:'😜',
                    content: '您还没有注册哟~\r\n是否现在注册？',
                    cancelText:'下次一定',
                    confirmText:'确认注册'
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
