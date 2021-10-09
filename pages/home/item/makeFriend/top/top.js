Page({
    data: {
        topList: [{
            url: 'likeTop',
            name: '最多喜欢',
            icon: 'likefill',
            color: 'red',
        },
            {
                url: '',
                name: '最多点赞',
                icon: 'favorfill',
                color: 'orange',
            },
            {
                url: 'likeTop',
                name: '以后想到再加',
                icon: 'emojifill',
                color: 'purple',
            }
        ]
    },
    onLoad: function (options) {

    }
});