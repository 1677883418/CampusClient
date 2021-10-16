Component({
    options: {
        addGlobalClass: true,
    },
    data: {
        index: null,
        dynamicIndex: null,
        imageList: [],
        //动态
        dynamic: [
            {
                dynamicIndex: 1,
                nikeName: "肥羊",
                sex: 1,
                avatarUrl: 'https://z3.ax1x.com/2021/10/06/4vxEtK.jpg',
                dynamicTime: '2021-10-2',
                dynamicText: "纵有千古,横有八荒\r\n前途似海,来日方长",
                dynamicImage: [
                    "https://z3.ax1x.com/2021/10/06/4vxm1e.jpg",
                    "https://z3.ax1x.com/2021/10/06/4vxEtK.jpg"
                ],
                dynamicLike: '10'
            },
            {
                dynamicIndex: 2,
                nikeName: "肥羊",
                sex: 0,
                avatarUrl: "https://z3.ax1x.com/2021/10/06/4vxEtK.jpg",
                dynamicTime: '2021-10-6',
                dynamicText: "热爱可抵岁月漫长",
                dynamicImage: [
                    "https://z3.ax1x.com/2021/10/06/4vxEtK.jpg",
                    "https://z3.ax1x.com/2021/10/06/4vxm1e.jpg",
                    "https://z3.ax1x.com/2021/10/09/5ijOwF.png",
                    "https://z3.ax1x.com/2021/10/09/5FSMOx.png"
                ],
                dynamicLike: '999'
            }
        ]
    },
    //
    dynamicIndex(e) {
        //如果url不为空,说明点击在图片上
        this.setData({
            imageList: e.currentTarget.dataset.dynamicIndex
        })

    },
    //图片预览
    ViewImage(e) {
        wx.previewImage({
            urls: [e.currentTarget.dataset.url],
            current: e.currentTarget.dataset.url
        })
/*        //第一次点击获取到图片列表
        if (e.currentTarget.dataset.dynamicImage !== undefined) {
            this.setData({
                imageList: e.currentTarget.dataset.dynamicImage
            })
        }
        //第二次点击获取到要预览的图片
        if (e.currentTarget.dataset.url !== undefined) {
            wx.previewImage({
                // urls: e.currentTarget.dataset.dynamicImage,
                // current: e.currentTarget.dataset.url
                urls: this.data.imageList,
                current: e.currentTarget.dataset.url
            });
            this.setData({
                imageList: []
            })
        }*/
    },
    onLoad: function () {
    }
});