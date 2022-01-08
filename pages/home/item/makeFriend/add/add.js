const com = require("../../../../../utils/util.js")
const app = getApp();
Page({
    data: {
        com: com,
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        dynamicText: '',
        imgList: [],
        img:[]
    },

    ChooseImage() {
        wx.chooseImage({
            count: 4, //默认9
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], //从相册选择
            success: (res) => {
                console.log(res.tempFilePaths)
                if (this.data.imgList.concat(res.tempFilePaths).length > 4) {
                    wx.showModal({
                        title: '🙅',
                        content: '图片超过四张了哟,请重新选择~',
                        showCancel: false
                    })
                } else if (this.data.imgList.length !== 0) {
                    this.setData({
                        imgList: this.data.imgList.concat(res.tempFilePaths)
                    })
                } else {
                    this.setData({
                        imgList: res.tempFilePaths
                    })
                }
            }
        })
    },
    ViewImage(e) {
        console.log(e)
        wx.previewImage({
            urls: this.data.imgList,
            current: e.currentTarget.dataset.url
        });
    }
    ,
    DelImg(e) {
        wx.showModal({
            title: '⚠警告⚠',
            content: '您确定要\r\n丢掉这张\r\n可爱的照片嘛？\r\n😿',
            cancelText: '再看看',
            confirmText: '再见',
            success: res => {
                if (res.confirm) {
                    this.data.imgList.splice(e.currentTarget.dataset.index, 1);
                    this.setData({
                        imgList: this.data.imgList
                    })
                }
            }
        })
    },
    isSubmit(e) {
        //判断信息是否填写
        if (this.data.dynamicText === '' && this.data.imgList[0] == null) {
            wx.showModal({
                title: '😢',
                content: '信息不完整哟~\r\n请填写后再提交吧~',
                showCancel: false,
                confirmText: '整吧那就'
            })
        }
        //确认填写完整后提交信息，检测是否违规
        else {
            for (var i = 0; i < this.data.imgList.length; i++) {
                wx.getFileSystemManager().readFile({
                    filePath: this.data.imgList[i], // 选择图片返回的相对路径
                    encoding: 'base64', // 编码格式
                    success: res => { // 成功的回调
                        // console.log('data:image/png;base64,' + res.data)
                        let img;
                        img[i] = res.data
                    }
                })
            }
        }
    },
    dynamicTextInput: function (e) {
        this.setData({
            dynamicText: e.detail.value
        })
    }
})