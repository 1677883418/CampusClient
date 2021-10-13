const app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    data: {
        user: {
            nikeName: wx.getStorageSync("nikeName"),
            avatarUrl: wx.getStorageSync("avatarUrl"),
            isCard: true,
            cardId: '',
            isStudent: false,
            studentId: '',
            like: '99',
            reply: '100'
        }
    },
    onload() {

    }

})
