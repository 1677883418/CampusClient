/* 时间工具类 */

/*
使用方法：
const TimeUtils = require('../../utils/timeUtils.js');
//时间戳转指定格式时间
TimeUtils.timeStampToTime(1554803832, '{y}年{m}月{d}日 {h}:{i}:{s} 星期{w}')                     1487065320000
*/


/* 通过module.exports方式提供给外部调用 */
module.exports = {
    getTimeStamp: getTimeStamp, //获取当前时间戳
    convertTimeStamp: convertTimeStamp, //将某个格式时间转化成时间戳 
    timeStampToTime: timeStampToTime, //将某个时间戳转化成 指定格式时间
    timeStampToNo0Time: timeStampToNo0Time,
    timeStampToYMD: timeStampToYMD,
    timeStampToYMDHMS: timeStampToYMDHMS,
    getYear: getYear,
    getMonth: getMonth,
    getDay: getDay,
    getWeek: getWeek,
    getYearMonthDayWeek: getYearMonthDayWeek,
    getLastYear: getLastYear,
    getNextYear: getNextYear,
    getYearMonth: getYearMonth,
    getLastYearMonth: getLastYearMonth,
    getNextYearMonth: getNextYearMonth,
    isToday: isToday,
    isBetweenTimes: isBetweenTimes,
    getEndTime: getEndTime
}


/** 获取当前13位时间戳 */
function getTimeStamp() {
    return Date.parse(new Date());
}

/**
 * 将某个格式时间转化成13位时间戳，支持："-"、"/"、"."
 * @param time 2019(年) | 2019年2月 | 2019年02月02日 | 2019年2月2日 00:00:00 | 2019-2 | 2019-02 | 2019-2-2 | 2019-02-02 | 2019-02-02 00:00:00
 * @return 1556640000000
 */
function convertTimeStamp(time) {
    //用正则主要是把“2019-05-20 00:00:00”转换成“2019/05/20 00:00:00”兼容ios
    let newTime = time.replace(/-/g, '/');
    newTime = newTime.replace(/\./g, '/')
    newTime = newTime.replace(/年/g, '/');
    newTime = newTime.replace(/月/g, '/');
    newTime = newTime.replace(/日/g, '');
    if (newTime.length == 5) { // 处理2019年
        newTime = newTime.substring(0, 4)
    }
    return Date.parse(newTime)
}

/**
 * 将某个时间戳转化成 指定格式时间
 * @param {date} time 时间
 * @param {string} cFormat {y}-{m}-{d} {h}:{i}:{s} {w}
 */
function timeStampToTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        w: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|w)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'w') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0;
    })
    return time_str;
}

/**
 * 将某个时间戳转化成 指定格式时间（不带0）
 * @param time 时间
 * @param cFormat {y}-{m}-{d} {h}:{i}:{s} {w}
 */
function timeStampToNo0Time(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        w: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|w)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'w') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        // if (result.length > 0 && value < 10) {
        //   value = '0' + value
        // }
        return value || 0;
    })
    return time_str;
}

/**
 * 时间戳转年月日
 * @param time 13位时间戳，不传time默认当前时间戳
 * @param format 指定format，不传format默认：'{y}/{m}/{d}'
 * @return 指定format时间，默认格式：2020/02/02
 */
function timeStampToYMD(time, format) {
    time = time ? time : getTimeStamp()
    if (format) {
        return timeStampToTime(time, format)
    }
    return timeStampToTime(time, '{y}/{m}/{d}')
}

/**
 * 时间戳转年月日时分秒
 * @param time 13位时间戳，不传time默认当前时间戳
 * @param format 指定format，不传format默认：'{y}/{m}/{d} {h}:{i}:{s}'
 * @return 指定format时间，默认格式：2019/05/20 00:00:00
 */
function timeStampToYMDHMS(time, format) {
    time = time ? time : getTimeStamp()
    if (format) {
        return timeStampToTime(time, format)
    }
    return timeStampToTime(time, '{y}/{m}/{d} {h}:{i}:{s}')
}

/**
 * 获取年
 * @return 2020
 */
function getYear() {
    return timeStampToTime(getTimeStamp(), '{y}')
}

/**
 * 获取月
 * @return 02
 */
function getMonth() {
    return timeStampToTime(getTimeStamp(), '{m}')
}

/**
 * 获取日
 * @return 02
 */
function getDay() {
    return timeStampToTime(getTimeStamp(), '{d}')
}

/**
 * 获取周
 * @return 日 | 一 | 二 | 三 | 四 | 五 | 六
 */
function getWeek() {
    return timeStampToTime(getTimeStamp(), '{w}')
}

/**
 * 获取年月日周
 * @return 2020年02月02日 星期六
 */
function getYearMonthDayWeek() {
    return timeStampToTime(getTimeStamp(), '{y}年{m}月{d}日 {h}:{i}:{s} 星期{w}')
}


/**
 * 获取指定年的上一年，不传time默认今年
 * @param time 2020年 | 2020
 * @return 2019年 | 2019
 */
function getLastYear(time) {
    time = time ? time : getYear()
    let tempYear = time.substring(0, 4)
    tempYear = parseInt(tempYear)
    tempYear = tempYear - 1
    let text = time.substring(4, 5)
    let lastYear = ''
    if (text == '年') {
        lastYear = tempYear + '年'
    } else {
        lastYear = tempYear + text
    }
    return lastYear
}

/**
 * 获取指定年的下一年，不传time默认今年
 * @param time 2020年 | 2020
 * @return 2021年 | 2021
 */
function getNextYear(time) {
    time = time ? time : getYear()
    let tempYear = time.substring(0, 4)
    tempYear = parseInt(tempYear)
    tempYear = tempYear + 1
    let text = time.substring(4, 5)
    let nextTime = ''
    if (text == '年') {
        nextTime = tempYear + '年'
    } else {
        nextTime = tempYear + text
    }
    return nextTime
}

/**
 * 获取当前年月
 * @return 2020年2月
 */
function getYearMonth() {
    return timeStampToTime(getTimeStamp(), '{y}年{m}月')
}

/**
 * 获取指定年月的上一年月，不传time默认当前年月
 * @param time 2020年2月 | 2020年02月 | 2020/02 | 2020-02
 * @return 2020年1月 | 2020/01 | 2020-01
 */
function getLastYearMonth(time) {
    time = time ? time : getYearMonth()
    let tempYear = time.substring(0, 4)
    let tempMonth = time.substring(5, 7)
    tempYear = parseInt(tempYear)
    tempMonth = parseInt(tempMonth)
    tempMonth = tempMonth - 1
    if (tempMonth == 0) {
        tempYear = tempYear - 1
        tempMonth = 12
    }
    if (tempMonth < 10) {
        tempMonth = '0' + tempMonth
    }
    let text = time.substring(4, 5)
    let lastTime = ''
    if (text == '年') {
        tempMonth = parseInt(tempMonth)
        lastTime = tempYear + '年' + tempMonth + '月'
    } else {
        lastTime = tempYear + text + tempMonth
    }
    return lastTime
}

/**
 * 获取指定年月的下一年月，不传time默认当前年月
 * @param time 2020年2月 | 2020年02月 | 2020/02 | 2020-02
 * @return 2020年3月 | 2020/03 | 2020-03
 */
function getNextYearMonth(time) {
    time = time ? time : getYearMonth()
    let tempYear = time.substring(0, 4)
    let tempMonth = time.substring(5, 7)
    tempYear = parseInt(tempYear)
    tempMonth = parseInt(tempMonth)
    tempMonth = tempMonth + 1
    if (tempMonth == 13) {
        tempYear = tempYear + 1
        tempMonth = 1
    }
    if (tempMonth < 10) {
        tempMonth = '0' + tempMonth
    }
    let text = time.substring(4, 5)
    let nextTime = ''
    if (text == '年') {
        tempMonth = parseInt(tempMonth)
        nextTime = tempYear + '年' + tempMonth + '月'
    } else {
        nextTime = tempYear + text + tempMonth
    }
    return nextTime
}

/**
 * 某个时间是否是今天
 * @param time 2020-07-19 | 2020/07/19 | 2020-07-19 20:33:00 | 2020/07/19 20:33:00
 * @return true | false
 */
function isToday(time) {
    time = time.replace(/\//g, '');
    let newTime = time.replace(/-/g, '');
    newTime = newTime.substring(0, 8);
    var currentTime = new Date().getTime();
    currentTime = timeStampToTime(currentTime, '{y}{m}{d}')
    return newTime == currentTime
}

/**
 * 判断当前时间是否在某个时间段内
 * @param time 2020-07-19 20:33:00 | 2020/07/19 20:33:00
 * @return true | false
 */
function isBetweenTimes(beginTime, endTime) {
    beginTime = beginTime.replace(/-/g, '/');
    endTime = endTime.replace(/-/g, '/');
    beginTime = new Date(beginTime)
    endTime = new Date(endTime)
    let currentTime = new Date();
    if (beginTime <= currentTime && currentTime <= endTime) {
        return true;
    }
    return false;
}

/**
 * 距离某个时间还有xxx天x小时xx分xx秒
 * @param time 2021-02-12 || 2021/02/12
 * @return '距离2021年2月12日还有118天0小时30分12秒'
 */
function getEndTime(time) {
    time = time.replace(/-/g, '/');
    var year = new Date(time).getFullYear();
    var month = new Date(time).getMonth() + 1;
    var date = new Date(time).getDate();
    var now = new Date();
    var endDate = new Date(new Date(time).toLocaleDateString());
    var leftTime = endDate.getTime() - now.getTime();
    var leftsecond = parseInt(leftTime / 1000);
    var day = Math.floor(leftsecond / (60 * 60 * 24));
    var hour = Math.floor((leftsecond - day * 24 * 60 * 60) / 3600);
    var minute = Math.floor((leftsecond - day * 24 * 60 * 60 - hour * 3600) / 60);
    var second = Math.floor(leftsecond - day * 60 * 60 * 24 - hour * 60 * 60 - minute * 60);
    return `距离${year}年${month}月${date}日还有${day}天${hour}小时${minute}分${second}秒`;
}
