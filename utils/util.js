const util = {
    API: 'http://127.0.0.1:8080/',
    // API: 'http://1.117.99.103:8080/',

    /*    login(cb) {
            var that = this;
            wx.login({
                success(res) {
                    that.post('User/login', {js_code: res.code}, function (res) {
                        if (res.code === 0) {
                            wx.showToast({
                                title: res.data.msg + '',
                                icon: 'none'
                            })
                        } else if (res.code === 1) {
                            wx.setStorageSync("user", res.data)
                            wx.setStorageSync("token", res.token)
                        }
                    })
                }
            })
        },*/
    //post请求
    post(url, data, success, fail) {
        this.http('POST', url, data, success, fail)
    },
    get(url, data, success, fail) {
        this.http('GET', url, data, success, fail)
    },

    http(method, url, data, success, fail) {
        //通用post接口实现方法
        var that = this;
        let _data = data || {};
        let _success = success || function (e) {
            console.log(e)
        };
        let _fail = fail || function (e) {
            console.log(e)
        };
        let _method = method || 'POST';
        let _header = {
            'content-type': 'application/json'
        };

        if (_method.toUpperCase() === 'GET') {
            _header = {
                'content-type': 'application/json'
            };
        }
        if (wx.getStorageSync("token")) {
            _header.token = wx.getStorageSync("token")
        }
        if (arguments.length === 2 && typeof _data == 'function') {
            _success = _data
        }
        wx.request({
            url: this.API + url,
            method: _method,
            header: _header,
            data: _data,
            success: function (res) {
                if (typeof _success == 'function' && res.statusCode != 404 && res.statusCode != 500 && res.statusCode != 400) {
                    _success(res.data);
                    if (res.data.code === -1) {
                        that.login(function (res) {
                            that.http(method, url, data, success, fail)
                        })
                    } else if (res.data.code !== 1) {
/*                        wx.showToast({
                            title: res.data.msg + '',
                            icon: 'none'
                        })*/
                    }

                } else {
                    if (typeof _success != 'function') {
                    }
                    wx.showToast({
                        title: '接口  错误 ' + res.statusCode,
                        icon: 'none'
                    })
                }
            },
            fail: function (res) {
                console.log(`======== 接口  请求失败 ========`);
                if (typeof _fail == 'function') {
                    _fail(res);
                }
            }
        });
    }
}
module.exports = util

/*const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  formatTime
}*/
