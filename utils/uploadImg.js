/**
 * 上传多张图片工具类
 * @param data 参数
 * i            数组下标
 * url          开发者服务器地址
 * filePath     要上传文件资源的路径 (本地路径)
 * name         文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
 */
function uploadImg(data) {
    var that = this,
        i = data.i ? data.i : 0,
        success = data.success ? data.success : 0,
        fail = data.fail ? data.fail : 0;
    wx.uploadFile({
        url: data.url,
        filePath: data.path[i],
        name: 'files',
        formData: data.formData,
        success: (resp) => {
            success++;
            console.log(resp)
            console.log(i);
        },
        fail: (res) => {
            fail++;
            console.log('fail' + i + "fail:" + fail);
        },
        complete: () => {
            console.log(i);
            i++;
            if (i == data.path.length) { //图片上传完，停止调用
                console.log('执行完毕');
                console.log('成功：' + success + "失败：" + fail);
            } else { //图片还没上传完，继续调用
                console.log(i);
                data.i = i;
                data.success = success;
                data.fail = fail;
                that.uploadimg(data);
            }
        }
    })
}