const com = require("../../../../../utils/util.js")
const app = getApp();
Page({
    data: {
        com: com,
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        dynamicText: '',
        imgList: [],
        user: wx.getStorageSync('user'),
        loadModal: {
            flag: false,
            text: '模块加载中',
            image: '⏰'
        },
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

                /*
                                //图片选择后，转为Base64编码存储
                                for (let i = 0; i < this.data.imgList.length; i++) {
                                    wx.getFileSystemManager().readFile({
                                        filePath: this.data.imgList[i], // 选择图片返回的相对路径
                                        encoding: 'base64', // 编码格式
                                        success: res => { // 成功的回调
                                            // console.log('data:image/png;base64,' + res.data)
                                            this.data.imgBase64[i] =
                                                //  'data:image/png;base64,'+
                                                res.data;
                                        }
                                    })
                                }*/

            }
        })
    },
    ViewImage(e) {
        console.log(e)
        wx.previewImage({
            urls: this.data.imgList,
            current: e.currentTarget.dataset.url
        });
    },
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
        /**
         * 模块目的:新增动态
         * 流程:添加动态 ==> 添加动态照片
         */

        if (this.data.imgList.length === 0 && this.data.dynamicText === "") {
            wx.showModal({
                title: '😢',
                content: '信息不完整哟~\r\n填写完整后再提交吧',
                showCancel: false,
                confirmText: '整吧那就'
            })
        } else {
            this.setData({
                'loadModal.flag': true,
                'loadModal.text': '模块加载中',
                'loadModal.image': '⏰'
            })
            com.post(
                "Dynamic/addDynamic",
                {
                    userId: this.data.user.id,
                    openId: this.data.user.openId,
                    dynamicText: this.data.dynamicText,
                }, res => {
                    if (res.code === 0 && this.data.imgList.length !== 0) {
                        //动态图片上传
                        for (let i = 0; i < this.data.imgList.length; i++) {
                            wx.uploadFile({
                                url: com.API + "Upload/dynamicImage",
                                filePath: this.data.imgList[i],
                                name: "dynamicImage",
                                formData: {
                                    dynamicId: res.data.id,
                                },
                                header: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                success: res => {
                                    if (res.statusCode === 200) {
                                        com.post(
                                            "DynamicImage/addDynamicImage",
                                            {
                                                imageUrl: res.data,
                                                dynamicId: this.data.dynamic.id,
                                                sort: i,
                                            }, res => {
                                                //加载动画
                                                this.setData({
                                                    'loadModal.image': '😋',
                                                    'loadModal.text': '发布成功~'
                                                })
                                                setTimeout(() => {
                                                    this.setData({
                                                        'loadModal.flag': false,
                                                    })
                                                    wx.navigateBack()
                                                }, 500)
                                            })
                                    }

                                },
                                fail: res => {
                                    this.setData({
                                        'loadModal.image': '😰',
                                        'loadModal.text': '上传失败~'
                                    })
                                    setTimeout(() => {
                                        this.setData({
                                            'loadModal.flag': false
                                        })
                                    }, 1000)
                                }
                            })
                        }
                    } else if (res.code === 0 && this.data.imgList.length === 0) {
                        this.setData({
                            dynamic: res.data
                        })
                        //加载动画
                        this.setData({
                            'loadModal.image': '😋',
                            'loadModal.text': '加载成功~'
                        })
                        setTimeout(() => {
                            this.setData({
                                'loadModal.flag': false,
                            })
                        }, 500)
                        wx.navigateBack()
                        console.log("动态添加失败")
                    }
                }, res => {
                    this.setData({
                        'loadModal.image': '😰',
                        'loadModal.text': '上传失败~'
                    })
                    setTimeout(() => {
                        this.setData({
                            'loadModal.flag': false
                        })
                    }, 500)
                })
        }

    },
    dynamicTextInput: function (e) {
        this.setData({
            dynamicText: e.detail.value
        })
    },
    onLoad: function () {
        if (wx.getStorageSync("user").nickName === '💜无名之辈💛' && wx.getStorageSync("user").avatarUrl === 'https://z3.ax1x.com/2021/11/09/ItIbm4.jpg') {
            wx.showModal({
                title: '😜',
                content: '您还没有注册哟~\r\n是否现在注册？',
                cancelText: '下次一定',
                confirmText: '确认注册',
                success(res) {
                    if (res.confirm) {
                        wx.navigateTo({
                            url: "/pages/home/mine/login/login"
                        })
                    } else if (res.cancel) {
                        wx.navigateBack()
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
    }
})