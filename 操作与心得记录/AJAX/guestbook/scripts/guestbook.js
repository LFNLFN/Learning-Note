//注册部分
//注册部分-用户名筛选 
function RegNameChecking() {
    if (!document.getElementById) return false;
    if (!document.getElementById('username1')) return false;
    var reg_username = document.getElementById('username1');
    if (!document.getElementById('verifyUserNameMsg')) return false;
    var reg_report = document.getElementById('verifyUserNameMsg');
    reg_username.onblur = function () {

        AJAXRequest('GET','guestbook/index.php?m=index&a=verifyUserName&username='+ this.value,'',
        function (respond) {
            var respondObj = JSON.parse(respond);
            reg_report.innerHTML = respondObj.message;
        });
    }
}
addLoadEvent(RegNameChecking);
//注册部分-注册申请的反馈 
function AccountGeneration() {
    if (!document.getElementById) return false;
    if (!document.getElementById('username1')) return false;
    var reg_username = document.getElementById('username1'); 
    if (!document.getElementById('password1')) return false;
    var reg_password = document.getElementById('password1'); 
    if (!document.getElementById('btnReg')) return false;
    var Reg_btn = document.getElementById('btnReg');
    Reg_btn.onclick = function () {
        AJAXRequest('POST','guestbook/index.php','m=index&a=reg&username='+ encodeURI(reg_username.value) +'&password='+ reg_password.value,
        function (respond) {
            var respondObj = JSON.parse(respond);
            alert(respondObj.message);
            reg_username.value = '';
            reg_password.value = '';
        });
    }
}
addLoadEvent(AccountGeneration);
//登录以及登出部分
//getCookie函数是被LoginStateChecking函数是用于区分网页当前状态，并根据状态调整页面布局
function getCookie(key) {
    var arr1 = document.cookie.split('; ');
    for (var i=0; i<arr1.length; i++) {
        var arr2 = arr1[i].split('=');
        if (arr2[0]==key) {
            return arr2[1];
        }
    }
}
function LoginStateChecking() {
    if (!document.getElementById) return false;
    if (!document.getElementById('reg')) return false;
    if (!document.getElementById('login')) return false;
    if (!document.getElementById('userinfo')) return false;
    if (!document.getElementById('user')) return false;
    var reg_item = document.getElementById('reg');
    var login_item = document.getElementById('login');
    var user = document.getElementById('user'); 
    var userinfo = document.getElementById('userinfo'); 
    var uid = getCookie('uid');
    var username = getCookie('username');
    if (uid) {
        user.style.display = 'block';
        userinfo.innerHTML = username;
        reg_item.style.display = 'none';
        login_item.style.display = 'none';
    } else {
        user.style.display = 'none';
        userinfo.innerHTML = '';
        reg_item.style.display = 'block';
        login_item.style.display = 'block';
    }
}
addLoadEvent(LoginStateChecking);
//登录行为
function login() {
    if (!document.getElementById) return false;
    if (!document.getElementById('username2')) return false;
    var login_username = document.getElementById('username2'); 
    if (!document.getElementById('password2')) return false;
    var login_password = document.getElementById('password2'); 
    if (!document.getElementById('btnLogin')) return false;
    var Login_btn = document.getElementById('btnLogin');
    Login_btn.onclick = function () {
        AJAXRequest('POST','guestbook/index.php','m=index&a=login&username='+ encodeURI(login_username.value) +'&password='+ login_password.value,
        function (respond) {
        var respondObj = JSON.parse(respond);
        alert(respondObj.message);
        LoginStateChecking();
        });
    }
}
addLoadEvent(login);

//登出行为
function logout() {
    if (!document.getElementById) return false;
    if (!document.getElementById('logout')) return false;
    var Logout_btn = document.getElementById('logout');
    Logout_btn.onclick = function () {
        AJAXRequest('POST','guestbook/index.php','m=index&a=logout',
        function (respond) {
            var respondObj = JSON.parse(respond);
            alert(respondObj.message);
            LoginStateChecking();
        });
        return false;
    }
}
addLoadEvent(logout);

//留言单位创建
function createList(isSubmit,data) {
    var oList = document.getElementById('list');
    
    var oDl = document.createElement('dl');
    
    var oDt = document.createElement('dt');
    var oStrong = document.createElement('strong');
    oStrong.innerHTML = data.username;
    oDt.appendChild(oStrong);

    var oDd1 = document.createElement('dd');
    oDd1.innerHTML = data.content;

    var oDd2 = document.createElement('dd');
    oDd2.className = 't';
    var oA1 = document.createElement('a');
    oA1.href = '';
    oA1.innerHTML = '顶(<span>'+data.support+'</span>)';
    var oA2 = document.createElement('a');
    oA2.href = '';
    oA2.innerHTML = '踩(<span>'+data.oppose+'</span>)';
    oDd2.appendChild(oA1);
    oDd2.appendChild(oA2);

    oDl.appendChild(oDt);
    oDl.appendChild(oDd1);
    oDl.appendChild(oDd2);

    if (isSubmit && oList.children[0]) {
        oList.insertBefore(oDl, oList.children[0]);
    } else {
        oList.appendChild(oDl);
    }
}
//留言发表
function MessagePublished() {
    if (!document.getElementById) return false;
    if (!document.getElementById('content')) return false;
    if (!document.getElementById('btnPost')) return false;
    var message_content = document.getElementById('content');
    var post_btn = document.getElementById('btnPost');
    post_btn.onclick = function () {
        AJAXRequest('POST','guestbook/index.php','m=index&a=send&content='+encodeURI(message_content.value),
        function (respond) {
            var respondObj = JSON.parse(respond);
            alert(respondObj.message);
            if (respondObj.code == 0) {
               createList(true,respondObj.data); 
               displayShowMore();
            }
        })
    }
}
addLoadEvent(MessagePublished);
//留言显示状态控制+显示更多
function insertAfter(newElement,targetElement) {
    if (targetElement.nextSlibing) {
        targetElement = targetElement.nextSibling;
        targetElement.parentNode.insertBefore(newElement,targetElement);
    } else {
        targetElement.parentNode.appendChild(newElement);
    }
}
function displayShowMore() {
    if (!document.getElementById) return false;
    if (document.getElementById('showMore')) return false;
    if (!document.createElement) return false;
    if (!document.getElementById('list')) return false;
    var message_list = document.getElementById('list')
    var showmore_btn = document.createElement('div');
    showmore_btn.setAttribute('id','showMore');
    showmore_btn.innerHTML = '显示更多';
    insertAfter(showmore_btn,message_list);
}
function ShowMoreMessage(per_page) {
    if (!document.getElementById('list')) return false;
    var message_list = document.getElementById('list');
    if (!document.getElementById('showMore')) return false;
    var showmore_btn = document.getElementById('showMore');
    showmore_btn.per_page = per_page;
    if ( message_list.children.length % 3 != 0 ) {
        showmore_btn.innerHTML = '已经显示全部留言，您不必再点击了。'
        return false;
    }
    
    showmore_btn.request_page = (message_list.children.length/showmore_btn.per_page) + 1;
    showmore_btn.onclick = function () {
        MessageDisplay(this.per_page,this.request_page);
        this.request_page++;    
    }
}
function MessageDisplay(per_page,request_page) {
    AJAXRequest('GET','guestbook/index.php?m=index&a=getList&n='+ per_page + '&page=' + request_page,'',
    function (respond) {
        var respondObj = JSON.parse(respond);
        if (respondObj.code == 0) {
            var messageArray = respondObj.data.list;
            // var pagesCount = respondObj.data.pages;
            
            if (!messageArray.length>0) return false;
            for (var i = 0; i < messageArray.length; i++) {
                createList(false,messageArray[i]);
            }
            displayShowMore();
            ShowMoreMessage(per_page);
        }
        else if (respondObj.code == 2) {
            alert(respondObj.message);
            return false;
        }
        else { alert('请求发生异常');
        return false; 
        }
    })
}
addLoadEvent(function () {MessageDisplay(3,1)} );





