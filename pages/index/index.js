// dynamic.js
// 获取应用实例
// const app = getApp()

Page({
    data: {
        PageCur: 'home'
    },
    //下栏上色
    NavChange(e) {
            this.setData({
                PageCur: e.currentTarget.dataset.cur
            })
    },
    //   分享
    onShareAppMessage() {
        return {
            title: '天大校园墙',
            imageUrl: '/images/logo.png',
            path: '/pages/dynamic/dynamic'
        }
    },
})