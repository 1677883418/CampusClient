// pages/home/mine/login.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
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
                //获取到用户信息,更新数据库
                app.com.post(
                    "/User/updateUser",
                    {
                        nickName: res.userInfo.nickName,
                        avatarUrl: res.userInfo.avatarUrl,
                        openId: wx.getStorageSync("openId")
                    },
                    function (res) {
                        console.log("请求成功")
                    }
                );
            },
        });
        this.setData({
            user: wx.getStorageSync("user")
        })
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
                console.log(this.data)
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {


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