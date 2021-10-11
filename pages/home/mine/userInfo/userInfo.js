Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: '预留接口,暂无实际意义',
        user: {
            nikeName: '肥羊',
            avatarUrl: '/images/logo.png',
            isCard: false,
            cardId: '',
            isStudent: false,
            studentId: '',
            like: '99',
            reply: '100'
        },
    },
    isCard: function () {
        this.setData({
            'user.isCard': true
        })
    },
    isStudent() {
        wx.showModal({
            title: '😷',
            content: "🌸暂不开放～🌸\r\n这个接口是预留着对接学校教务系统的哟～",
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
                    'user.avatarUrl': res.tempFilePaths[0]
                })
                console.log(this.data)
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
