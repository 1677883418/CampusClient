const util = {
    API: 'http://localhost:8080/',

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
                        wx.showToast({
                            title: res.data.msg + '',
                            icon: 'none'
                        })
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
    },
    dateFormat(time, fmt) { //author: meizz
        let date = new Date(parseInt(time))
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
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
