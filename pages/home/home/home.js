Component({
    options: {
        addGlobalClass: true,
    },
    data: {
        elements: [{
            title: '交友',
            name: 'makeFriend',
            color: 'red ligh',
            icon: 'friend',
            url: '/pages/home/item/makeFriend/bar/bar',
            target: 'self'

        }, {
            title: '组队',
            name: 'teamWork',
            color: 'purple',
            icon: 'newsfill',
            url: '/pages/home/item/teamWork/bar/bar',
            target: 'self'
        }, {
            title: '帮助',
            name: 'makeFriend',
            color: 'pink',
            icon: 'friend',
            url: '/pages/home/item/makeFriend/bar/bar',
            appId: 'wx22d4ff611a9b55e4',
            target: 'miniProgram'
        },
        ],
    }
})