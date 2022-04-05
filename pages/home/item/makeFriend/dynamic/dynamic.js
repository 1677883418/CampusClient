const com = require("../../../../../utils/util");
Component({
    options: {
        addGlobalClass: true,
    },
    data: {
        loadModal: {
            flag: true,
            text: '模块加载中',
            image: '⏰'
        },
        index: null,
        dynamicIndex: null,
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
                    "https://zxy1677883418.oss-cn-beijing.aliyuncs.com/Campus/DynamicImage/test/wallhaven-pkgkkp_1920x1080.png",
                    "https://zxy1677883418.oss-cn-beijing.aliyuncs.com/Campus/DynamicImage/test/wallhaven-q2pjqr_1920x1080.png"
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
                    "https://zxy1677883418.oss-cn-beijing.aliyuncs.com/Campus/DynamicImage/test/wallhaven-q2pjqr_1920x1080.png",
                    "https://zxy1677883418.oss-cn-beijing.aliyuncs.com/Campus/DynamicImage/test/wallhaven-pkgkkp_1920x1080.png",
                    "https://zxy1677883418.oss-cn-beijing.aliyuncs.com/Campus/DynamicImage/test/wallhaven-y8vlyk_1920x1080.png",
                    "https://zxy1677883418.oss-cn-beijing.aliyuncs.com/Campus/DynamicImage/test/wallhaven-rdwjj7_1920x1080.png"
                ],
                dynamicLike: '999'
            }
        ]
    },
    methods: {
        //图片预览
        ViewImage(e) {
            let imgList = []
            for (let i = 0; i < this.data.dynamic.length; i++) {
                if (e.currentTarget.dataset.item.dynamicId === this.data.dynamic[i].id) {
                    for (let j = 0; j < this.data.dynamic[i].dynamicImages.length; j++) {
                        imgList.push(this.data.dynamic[i].dynamicImages[j].imageUrl)
                    }
                }
            }
            wx.previewImage({
                urls: imgList,
                current: e.currentTarget.dataset.item.imageUrl,
            })
        },
    },

    attached: function () {
        this.setData({
            'loadModal.flag': true,
            'loadModal.image': '⏰',
            'loadModal.text': '模块加载中...'
        })
        setTimeout(() => {
            this.setData({
                'loadModal.image': '😰',
                'loadModal.text': '加载失败~'
            })
        }, 3000)
        setTimeout(() => {
            this.setData({
                'loadModal.flag': false,
            })
        }, 3500)

        com.get("Dynamic/queryAllDynamic", {}, res => {
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
            this.setData({
                dynamic: res.data,
            })
        }, res => {
            this.setData({
                'loadModal.image': '😰',
                'loadModal.text': '加载失败~'
            })
            setTimeout(() => {
                this.setData({
                    'loadModal.flag': false,
                })
            }, 1500)
        })
    },

});