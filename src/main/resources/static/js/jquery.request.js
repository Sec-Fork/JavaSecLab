/**
 * @description ajax请求统一封装
 * @author:  whgojp
 * @email:  whgojp@foxmail.com
 * @Date: 2024/5/18 16:09
 */
const timeout = 10000;  // 延长至10s 方便测试延时注入

// requet ajax
function request (url, method, data = {}, contentType, back){
    $.ajax({
        url:  url,
        type: method,
        data: data,
        cache: false,
        timeout: timeout,
        contentType: contentType,
        xhrFields: {
            withCredentials: true,
        },
        success: function(res, textStatus, xhr){
            console.log(this.type+' 请求成功：', {
                url: this.url,
                method: this.type,
                data: this.data,
                contentType: this.contentType,
                response: res,
                status: xhr.status,
                statusText: xhr.statusText,
                headers: xhr.getAllResponseHeaders()
            });
            return typeof back === "function" && back(res);
        },
        error: function(xhr, status, error) {
            console.log(this.type+' 请求失败：', {
                url: this.url,
                method: this.type,
                data: this.data,
                contentType: this.contentType,
                status: xhr.status,
                statusText: xhr.statusText,
                error: error,
                headers: xhr.getAllResponseHeaders()
            });
            return typeof back === "function" && back(null);
        }
    });
};

function getAjaxRequst (url, data, callBack) {
    request(url, "GET", data, "application/x-www-form-urlencoded;charset=UTF-8", function(res) {
        return typeof callBack == "function" && callBack(res)
    })
};
function postAjaxRequst (url, data, callBack) {
    request(url, "POST", data, "application/x-www-form-urlencoded;charset=UTF-8", function(res) {
        return typeof callBack == "function" && callBack(res)
    })
};

