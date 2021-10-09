Page({
    data: {
        cardCur: 0,
        swiperList: [{
            id: 0,
            type: 'image',
            dynamicImage: 'https://z3.ax1x.com/2021/10/06/4vxm1e.jpg',
            dynamicLike:'100'
        }, {
            id: 1,
            type: 'image',
            dynamicImage: 'https://z3.ax1x.com/2021/10/06/4vxEtK.jpg',
            dynamicLike:'200'

        }, {
            id: 2,
            type: 'image',
            dynamicImage: 'https://z3.ax1x.com/2021/10/06/4vxm1e.jpg',
            dynamicLike:'300'

        }, {
            id: 3,
            type: 'image',
            dynamicImage: 'https://z3.ax1x.com/2021/10/06/4vxEtK.jpg',
            dynamicLike:'400'
        }, {
            id: 4,
            type: 'image',
            dynamicImage: 'https://z3.ax1x.com/2021/10/06/4vxm1e.jpg',
            dynamicLike:'500'
        }, {
            id: 5,
            type: 'image',
            dynamicImage: 'https://z3.ax1x.com/2021/10/06/4vxEtK.jpg',
            dynamicLike:'600'
        }, {
            id: 6,
            type: 'image',
            dynamicImage: 'https://z3.ax1x.com/2021/10/06/4vxm1e.jpg',
            dynamicLike:'700'
        }],
    },
    onLoad() {
        this.towerSwiper('swiperList');
        // 初始化towerSwiper 传已有的数组名即可
    },
    // towerSwiper
    // 初始化towerSwiper
    towerSwiper(name) {
        let list = this.data[name];
        for (let i = 0; i < list.length; i++) {
            list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
            list[i].mLeft = i - parseInt(list.length / 2)
        }
        this.setData({
            swiperList: list
        })
    },
    // towerSwiper触摸开始
    towerStart(e) {
        this.setData({
            towerStart: e.touches[0].pageX
        })
    },
    // towerSwiper计算方向
    towerMove(e) {
        this.setData({
            direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
        })
    },
    // towerSwiper计算滚动
    towerEnd(e) {
        let direction = this.data.direction;
        let list = this.data.swiperList;
        if (direction === 'right') {
            let mLeft = list[0].mLeft;
            let zIndex = list[0].zIndex;
            for (let i = 1; i < list.length; i++) {
                list[i - 1].mLeft = list[i].mLeft
                list[i - 1].zIndex = list[i].zIndex
            }
            list[list.length - 1].mLeft = mLeft;
            list[list.length - 1].zIndex = zIndex;
            this.setData({
                swiperList: list
            })
        } else {
            let mLeft = list[list.length - 1].mLeft;
            let zIndex = list[list.length - 1].zIndex;
            for (let i = list.length - 1; i > 0; i--) {
                list[i].mLeft = list[i - 1].mLeft
                list[i].zIndex = list[i - 1].zIndex
            }
            list[0].mLeft = mLeft;
            list[0].zIndex = zIndex;
            this.setData({
                swiperList: list
            })
        }
    }
})