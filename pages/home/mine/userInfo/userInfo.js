Page({

    /**
     * 页面的初始数据
     */
    data: {
        msg: {},
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
    changeAvatar() {
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                wx.compressImage({
                    src: res.tempFilePaths[0], // 图片路径
                    quality: 50,
                    success(res) {
                        let that = this;
                        that.setData({
                            'avatar_url': res.tempFilePath,
                            temp: true
                        })
                    },
                    fail(res) {
                        console.log(res)
                    }
                })
            },
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