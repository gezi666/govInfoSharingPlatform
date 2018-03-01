/**
 * Created by guohuimin on 2017/10/25.
 */
$(document).ready(function () {

    User.loginTF(); //判断用户是否登录
    loadClassify();  //加载头部的资源分类
    init();

    // 收藏、取消收藏
    $('body').delegate(".collection", "click", function () {
        if ($(this).parent(".operation-wrap").hasClass("unlogin")) return    //如果为登录，则返回
        $(this).addClass("dn").siblings(".collection").removeClass("dn")
    })

    // 申请、取消申请
    $('body').delegate(".apply", "click", function () {
        if ($(this).parent(".operation-wrap").hasClass("unlogin")) return    //如果为登录，则返回
        $(this).addClass("dn").siblings(".apply").removeClass("dn")
    })

});
//登录回车事件
function keyLogin(){
    if(event.keyCode == 13){
        User.loginConfirm();
    }
}

//走后台服务器接口
var servicePath = "//202.106.10.250:8023";
// var servicePath = "//192.168.200.195:8090";
api = {
    get: function (url, data) {
        return this.send("get", url, data);
    },
    post: function (url, data) {
        return this.send("post", url, data);
    },
    send: function (type, url, data) {
        if (!data) data = {};  //兼容IE8
        var dtd = $.Deferred();
        data.key = Math.random();
        $.ajax({
            url: servicePath + url,
            type: type,
            data: data,
        }).then(function (data) {
            if (data.sessionstatus == "0" && location.hostname != "localhost")
                tool.delCookie('currUser');
            dtd.resolve(data);
        }, function (error) {
            console.log("提交失败", "操作失败");
            dtd.reject();
        });
        return dtd.promise();
    }
};

//政务数据分类
function loadClassify() {
    api.get("/direct/classify").then(function (result) {

        tool.renderList("#classify", "#classify-template", result);
        $(".nav-more-left li").hover(function () {
            $(this).addClass("active");//.siblings().removeClass("active");
        }, function () {
            $(this).removeClass("active");
        })
        $(".nav-more-dis").mCustomScrollbar();

    });
}
//头部搜索框 keydown 事件
function titleKeydown(e) {
    var ev = e || window.event;//获取event对象
    if (ev.keyCode == 13)
        searchResource();
}
//头部搜索
function searchResource() {
    var title = $("#searchTitle").val();
    if (!title) return;
    window.location.href = "../directory/search.html?title=" + encodeURI(title);
}

$(function () {
    //序号+1
    Handlebars.registerHelper("addOne", function (index) {
        //返回+1之后的结果
        return index + 1;
    });

    //判断是否
    Handlebars.registerHelper('whether', function (i) {
        if (i == "1") {
            return '是'
        } else {
            return '否'
        }
    })

    //判断数据项列表奇偶行
    Handlebars.registerHelper('isEven', function (i) {
        if (i % 2 == 0) {
            return ''
        } else {
            return 'even'
        }
    })

    //处理空值
    Handlebars.registerHelper("handleEmpty", function (txt, replaceTxt) {
        if (!txt || txt == "") {
            return replaceTxt;
        } else {
            return txt
        }
    });

    //翻译共享方式
    Handlebars.registerHelper("handleSharedMode", function (modeCode) {
        if (modeCode == '5') {
            return '邮件或介质'
        } else if (modeCode == '6') {
            return '接口'
        } else if (modeCode == '7') {
            return '数据库'
        } else if (modeCode == '8') {
            return '文件'
        } else if (modeCode == '10') {
            return '无'
        } else {
            return '--'
        }
    });

    //判断收藏状态  (收藏状态 0 未收藏 1 已收藏)
    //参数：modeCode-后台返回的收藏标志；collectedFlag-收藏(0)、取消收藏(1)
    Handlebars.registerHelper("isCollection", function (modeCode, collectedFlag) {

        if (!modeCode || modeCode == '0') {
            if (collectedFlag == 0) {
                return ''
            } else if (collectedFlag == 1) {
                return 'dn'
            }
        } else if (modeCode == '1') {
            if (collectedFlag == 0) {
                return 'dn'
            } else if (collectedFlag == 1) {
                return ''
            }
        }
    });


    //判断申请状态  (申请状态  0 已申请，1审批通过，2审批不通过, 3未申请)
    //参数：modeCode-后台返回的申请标志；collectedFlag-申请(0)、取消申请(1)
    Handlebars.registerHelper("isApply", function (modeCode, collectedFlag) {

        if (!modeCode || modeCode == '0') {
            if (collectedFlag == 0) {
                return 'dn'
            } else if (collectedFlag == 1) {
                return ''
            }
        } else if (modeCode == '2' || modeCode == '3') {
            if (collectedFlag == 0) {
                return ''
            } else if (collectedFlag == 1) {
                return 'dn'
            }
        } else {
            return 'dn'
        }
    });

    $(document).on('click', function (e) {
        $(".head-login-dis").stop().removeClass("head-login-show").slideUp();
    });
    $('.head-login-dis').on('click', function (e) {
        e.stopPropagation();
    });
    $('.head-loginname').on('click', function (e) {
        e.stopPropagation();
    });

});

function init() {

    //根据URL切换顶部选中导航
    var localUrlnav = window.location + '';
    var spIndexnav;
    if (localUrlnav.indexOf('/index/') >= 0) { //首页
        spIndexnav = 1;
    } else if (localUrlnav.indexOf('/directory/') >= 0) { //找目录
        spIndexnav = 2;
    } else if (localUrlnav.indexOf('/material/') >= 0) { //资料规范
        spIndexnav = 3;
    } else if (localUrlnav.indexOf('/fusion/') >= 0) { //融合共享动态
        spIndexnav = 4;
    }
    $(".nav-list>li").eq(spIndexnav).addClass("active").siblings().removeClass("active");

    // 页面头部事件
    $(".head-user").hover(function () {
        $(this).addClass("hover");
        $(this).find(".head-user-dis").stop().slideDown();
    }, function () {
        $(this).removeClass("hover");
        $(this).find(".head-user-dis").stop().slideUp();
    });
    $(".nav-list .firstli").hover(function () {
        $(".nav").css("height", "260px");
        $(this).find(".nav-more").stop().slideDown(400);
    }, function () {
        $(".nav").css("height", "40px");
        $(this).find(".nav-more").stop().slideUp(200);
    });
    $(".head-loginname").click(function (e) {
        if ($(".head-login-dis").hasClass("head-login-show")) {
            $(".head-login-dis").stop().removeClass("head-login-show").slideUp();
        } else {
            User.loginVef();
            $(".head-login-dis").stop().addClass("head-login-show").slideDown();
        }
    })
}

//收藏、取消收藏
//参数：sourceinfoid-目录资源ID；status-状态 1=收藏 0=取消收藏
function changeCollectionState(sourceinfoid, status) {
    api.get('/subscribeapply/addcollection', {
        "sourceinfoid": sourceinfoid,
        "status": status
    })
}


//取消申请
//参数：sourceinfoid-目录资源ID
function changeApplyState(sourceinfoid) {
    api.get('/subscribeapply/cancle', {
        "resourcecode": sourceinfoid
    })
}


//统计栏目点击数
//参数：
//1、bcolumnid-栏目ID  1 =首页 2=找目录 3=资料规范 4 =融合共享动态 5 =基础信息 6 =政务主题 7=部门资源 8=地方资源；
//2、handlename-栏目名称
function statisticalColumn(bcolumnid, handlename) {
    api.get('/dirAccess/addColumncount', {
        "bcolumnid": bcolumnid,
        "handlename": handlename
    })
}

tool = {
    // Handlebars渲染列表数据
    renderList: function (domId, tempId, dataList) {
        //预编译模板
        var template = Handlebars.compile($(tempId).html());
        //输入模板
        $(domId).html(template(dataList));
    },
    getParams: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)return decodeURI(r[2]);
        return null;
    },
    /*js 获取cookie*/
    getCookie: function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
    /*js 设置cookie*/
    setCookie: function (c_name, c_value) {
        //获取当前时间
        var date = new Date();
        var expiresDays = 1;
        //将date设置为1天以后的时间
        date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);
        document.cookie = c_name + "=" + escape(c_value) + "; expires=" + date.toGMTString() + ";path=/";
    },
    /*删除cookies*/
    delCookie: function (c_name, c_value) {
        //获取当前时间
        var date = new Date();
        var expiresDays = -1;
        //将date设置为1天以后的时间
        date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);
        document.cookie = c_name + "=" + escape(c_value) + "; expires=" + date.toGMTString() + ";path=/";
    }
}

// Handlebars渲染列表数据
//参数：domId--html元素ID, tempId--Handlebars模板ID, dataList--要渲染的数据
function renderList(domId, tempId, dataList) {
    //预编译模板
    var template = Handlebars.compile($(tempId).html());
    //输入模板
    $(domId).html(template(dataList));
}

User = {
    //获取验证码
    loginVef: function () {
        $("#verification-img").attr("src", servicePath + "/user/imageCode?num=" + Math.random());
    },
    //登录请求
    loginConfirm: function () {
        var urn = document.getElementById("userName").value;
        var pwd = document.getElementById("passWord").value;
        var vef = document.getElementById("verification").value;
        var loginSend = {
            "loginname": urn,
            "password": pwd,
            "imgcode": vef
        }
        if (urn == '') {
            $(".login-erroy").text('请输入用户名');
            setTimeout(function () {
                $(".login-erroy").empty();
            }, 3000)
        } else if (pwd == '') {
            $(".login-erroy").text('请输入密码');
            setTimeout(function () {
                $(".login-erroy").empty();
            }, 3000)
        } else if (vef == '') {
            $(".login-erroy").text('请输入验证码');
            setTimeout(function () {
                $(".login-erroy").empty();
            }, 3000)
        } else {

            api.post('/user/login', loginSend).done(function (res) {
                if (typeof(res) == 'string') {
                    res = $.parseJSON(res)
                }
                if (res.result == 1) {

                    var currUser = res.data[0];
                    currUser.loginname = loginSend.loginname;
                    currUser.loginpwd = loginSend.password;
                    tool.setCookie('currUser', JSON.stringify(currUser));
                    var pathname = window.location.pathname;
                    if (pathname.indexOf("/directory/") != -1 || pathname.indexOf("/baseInfo/") != -1)
                        window.location.reload();
                    else {
                        $(".head-login").hide();
                        $(".head-user").show();
                        $(".head-login-dis").hide();
                        var customerId = res.data[0].username;//将数据中用户信息的ID赋值给变量
                        $(".head-username").text(customerId);
                    }
                } else {
                    $(".login-erroy").text(res.msg);
                    setTimeout(function () {
                        $(".login-erroy").empty();
                    }, 3000)
                    return false;
                }
            })
        }
    },
    //判断用户是否登录
    loginTF: function () {
        var currUser = tool.getCookie('currUser');
        if (currUser) {
            currUser = JSON.parse(currUser);
            $(".head-login").hide();
            $(".head-user").show();
            $(".head-username").text(currUser.username);

        } else {
            $(".head-login").show();
            $(".head-user").hide();
        }
    },
    //用户退出登录
    signOut: function () {
        api.get('/user/loginOut').done(function (res) {
            if (typeof(res) == 'string') {
                res = $.parseJSON(res)
            }
            if (res.result == 1) {
                tool.delCookie('currUser');
                User.refresh();
            }
        })
    },
    refresh: function () {
        var pathname = window.location.pathname;
        if (pathname.indexOf("/subscription/") > -1)
            location.href = "../index/index.html";
        else if (pathname.indexOf("/directory/") != -1 || pathname.indexOf("/baseInfo/") != -1)
            window.location.reload();
        else {
            $(".head-login").show();
            $(".head-user").hide();
        }
    },
    //获取当前登录用户
    getCurrUser: function () {
        var currUser = tool.getCookie('currUser');
        if (currUser) {
            currUser = JSON.parse(currUser);
            return currUser;
        }
        return null;
    }
}