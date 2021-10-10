Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        temp: false,
        isCard: false,
        isStudent: false,
        avatar_url: ''
    },
    isCard: function () {
        let that = this;
        that.setData({
            isCard: true
        })
    },
    isStudent() {
        wx.showModal({
            title: '😷',
            content: "🌸很抱歉哟~🌸\r\n这个接口是预留着对接学校教务系统的~",
            showCancel: false
        })
    },
    ChooseImage() {
        wx.chooseImage({
            count: 1, //默认9
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], //从相册选择
            success: (res) => {
                this.setData({
                    avatarUrl: res.tempFilePaths

                })
            }
        })
    },
    onLoad: function () {
        let that = this
        that.setData({
            msg: wx.getStorageSync("user"),
        })
    }
    ,
})