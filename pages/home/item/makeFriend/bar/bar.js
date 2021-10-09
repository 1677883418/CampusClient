// dynamic.js
// 获取应用实例
// const app = getApp()

Page({
    data: {
        PageCur: 'dynamic'
    },
    //下栏跳转
    NavChange(e) {
            this.setData({
                PageCur: e.currentTarget.dataset.cur
            })
    },
    toAdd() {
        wx.navigateTo({
            url:"/pages/home/item/makeFriend/add/add"
        })
    },
    //分享
    onShareAppMessage() {
        return {
            title: '天大校园墙',
            imageUrl: '/images/logo.png',
            path: '/pages/dynamic/dynamic'
        }
    },
})