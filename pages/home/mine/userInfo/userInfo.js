const com = require("../../../../utils/util");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isStudent:false,
        phone: '预留接口,暂无实际意义',
        user: wx.getStorageSync('user'),
    },
    getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            // withCredentials: true,
            // lang: "zh_CN",
            success: (res) => {
                console.log(res.userInfo);
                wx.setStorageSync("user".nickName, res.userInfo.nickName)
                wx.setStorageSync("user".avatarUrl, res.userInfo.avatarUrl)
                this.setData({
                    'user.nickName': res.userInfo.nickName,
                    'user.avatarUrl': res.userInfo.avatarUrl
                })
            },
        });
        this.setData({
            user: wx.getStorageSync("user")
        })
    },

    isCard: function () {
        this.setData({
            isCard: true
        })
    },
    isStudent() {
        wx.showModal({
            title: '😷',
            content: "🌸暂不开放～🌸\r\n该接口是预留着对接学校教务系统的哟～",
            showCancel: false
        })
    },
    isSubmit() {
        if (this.data.user.nickName === '' || this.data.user.avatarUrl == null) {
            wx.showModal({
                title: '😢',
                content: '信息不完整哟~\r\n填写完整后再提交吧',
                showCancel: false,
                confirmText: '整吧那就'
            })
        }
        //确认填写完整后提交信息，检测是否违规
        else {
            wx.uploadFile({
                url: com.API + "Upload/avatar",
                filePath: this.data.user.avatarUrl,
                name: "avatar",
                formData: {
                    openId: this.data.user.openId,
                },
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success: res => {
                    if (res.statusCode === 200) {
                        this.setData({
                            'user.avatarUrl': res.data
                        })
                        com.post("User/updateUser", this.data.user, res => {
                            if (res.code === 0) {
                                wx.setStorageSync('user', this.data.user)
                                wx.navigateTo({
                                    url: "/pages/index/index"
                                })
                            }
                        })
                    }
                },
                fail: res => {
                    com.post("User/updateUser", this.data.user, res => {
                        if (res.code === 0) {
                            wx.setStorageSync('user', this.data.user)
                            wx.navigateTo({
                                url: "/pages/index/index"
                            })
                        }
                    })
                }
            })

        }
    },

    ChooseImage() {
        wx.chooseImage({
            count: 1, //默认9
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], //从相册选择
            success: (res) => {
                //修改临时文件名前缀为openid
                this.setData({
                    'user.avatarUrl': res.tempFilePaths[0],
                })
                console.log(this.data)
            }
        })
    }
    ,
    nickNameInput: function (e) {
        this.setData({
            'user.nickName': e.detail.value
        })
        console.log(this.data.user.nickName)
    }
    ,
    onLoad: function () {

    }

    ,
})
