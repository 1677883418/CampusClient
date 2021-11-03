// pages/home/mine/login.js

const com = require("../../../../utils/util");
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        com: com,
        user: {}
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
    isSubmit() {
        //判断信息是否填写
        if (this.data.user.nickName === '💜无名之辈💛' ||
            this.data.user.nickName === '' ||
            this.data.user.avatarUrl == null ||
            this.data.user.avatarUrl === 'https://z3.ax1x.com/2021/11/09/ItIbm4.jpg') {
            wx.showModal({
                title: '😢',
                content: '信息不完整哟~\r\n填写完整后再提交吧',
                showCancel: false,
                confirmText: '整吧那就'
            })
        }
        //确认填写完整后提交信息，检测是否违规
        else {
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
    ChooseImage() {
        wx.chooseImage({
            count: 1, //默认9
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], //从相册选择
            success: (res) => {
                this.setData({
                    'user.avatarUrl': res.tempFilePaths[0]
                })
            }
        })
    },
    nickNameInput: function (e) {
        this.setData({
            'user.nickName': e.detail.value
        })
        console.log(this.data.user.nickName)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            /*'user.nickName': wx.getStorageSync(user).nickName,
            'user.avatarUrl': wx.getStorageSync(user).avatarUrl*/
            user: wx.getStorageSync('user')
        })
        console.log(this.data.user.nickName)
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