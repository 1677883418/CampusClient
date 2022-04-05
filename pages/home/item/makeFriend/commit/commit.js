const app = getApp()

Page({
    data: {
        detail: '', //内容
        title: '', //标题
        type: '',
        imgList: [],
        images: '',
        value: '', //添加类目||变化
        texts: "", //字数提醒
        min: 4, //最少字数
        max: 500, //最多字数 (根据自己需求改变)
    },
    /**
     * 上传图片
     */
    uploadimg: function () {
        var that = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                const tempFilePaths = res.tempFilePaths
                that.setData({
                    imgList: tempFilePaths
                })
                // console.log(that.data.imgList)
                var item = tempFilePaths[0];
                wx.uploadFile({
                    url: 'https://kb.ddfs.ltd/api/common/upload/', //仅为示例，非真实的接口地址
                    filePath: item,
                    name: 'file',
                    success(res) {
                        const result = JSON.parse(res.data);
                        that.setData({
                            images: result.data.fullurl
                        })
                        console.log(result.data.fullurl)
                        //do something
                    }
                })
            }
        })

    },
    click: function (e) {
        var ithis = this;
        var list = ['生活', '学习', '求助', '表白', '吃瓜'];
        console.log(ithis)
        wx.showActionSheet({
            itemList: list,
            success: (res) => {
                this.setData({
                    type: res.tapIndex + 1
                })
                ithis.setData({
                    value: list[res.tapIndex]
                })
            },
            fail(res) {
                console.log(res.errMsg)
            }
        })
    },
    //表单提交
    formSubmit: function (e) {
        var that = this;
        var formData = e.detail.value; //获取表单所有input的值
        wx.request({
            url: 'https://kb.ddfs.ltd/api/api/postAdd/',
            data: {
                type: this.data.type,
                'content': that.data.detail,
                'title': that.data.title,
                'images': that.data.images
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                console.log(res.data)
                wx.showToast({
                    title: '已发布',
                    icon: 'success',
                    duration: 2000
                })
            }
        })
    },

    //字数限制
    inputs: function (e) {
        this.data.detail = e.detail.value
        console.log(this.data.detail)

        // 获取输入框的内容
        var value = e.detail.value;
        // 获取输入框内容的长度
        var len = parseInt(value.length);
        //最少字数限制
        if (len < this.data.min) {
            this.setData({
                texts: "加油，至少要输入4个字哦"
            })
        } else if (len >= this.data.min) {
            this.setData({
                texts: " "
            })
        }
        //最多字数限制
        if (len > this.data.max) return;
        // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
        this.setData({
            currentWordNumber: len //当前字数
        });
    }
})