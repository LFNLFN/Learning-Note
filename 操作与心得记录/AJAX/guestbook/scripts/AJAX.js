//window.onload 
function addLoadEvent(func) {
	var oldLoad = window.onload;
	if (typeof oldLoad !='function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldLoad();
			func();
		}
	}
}

//XHR兼容生成 
function getXHR() {
    if (typeof XMLHttpRequest == "undefined")
    XMLHttpRequest = function () {
        try{ return new ActiveXObject("Msxml2.XMLHTTP.6.0") } catch(e) {};
        try{ return new ActiveXObject("Msxml2.XMLHTTP.3.0") } catch(e) {};
        try{ return new ActiveXObject("Msxml2.XMLHTTP") } catch(e) {};
        return false;
    }
    return new XMLHttpRequest();
}

//发送ajax请求并处理返回数据。
function AJAXRequest(method,url,url_data,callback) {
    if (!getXHR()) return false;
    var XHR = getXHR();
    
    if (method == 'GET'&&url_data == '') {
        XHR.open('GET',url,true);
        XHR.send();
    } else if (method == 'POST'&&url_data != '') {
        XHR.open('POST',url,true);
        XHR.setRequestHeader('content-type','application/x-www-form-urlencoded');
        XHR.send(url_data);
    } else {
        alert('此函数暂时只支持GET&POST');
        return false;
    }
    
    XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 && XHR.status == 200) {
            if (typeof callback == 'function') callback(XHR.responseText);
            else {
                alert('数据接收出错');
            }
        } 
    }
}