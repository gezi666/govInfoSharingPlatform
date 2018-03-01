/**
 * Created by ly on 2017/10/25.
 */

$(function () {

    statisticalColumn('1', '首页')    //统计栏目点击数

    Handlebars.registerHelper('format_num', function (n) {
        var b = parseInt(n).toString();
        var len = b.length;
        if (len <= 3) {
            return b;
        }
        var r = len % 3;
        return r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
    })
    //注册索引+1的helper
    Handlebars.registerHelper("addOne", function (index) {
        //返回+1之后的结果
        return index + 1;
    });
    //注册索引+5的helper
    Handlebars.registerHelper("addFives", function (index) {
        //返回+1之后的结果
        return index + 5;
    });
    //注册索引+9的helper
    Handlebars.registerHelper("addNine", function (index) {
        //返回+1之后的结果
        return index + 9;
    });

    setInterval(function () {
        return autoScroll(".newnews")
    }, 5000)

    getNewNewsList(); //获取最新动态数据
    getBannerCatalog() //获取banner编目数据
    postGovernmentDataList(); //获取政务数据推荐数据
    dataDirectoryList(); //获取最新数据目录数据
    accessRankingsList(); //获取目录访问排行数据

})

function autoScroll(obj) {
    var objLen = $(obj).find("ul").find("li").length;
    if (objLen <= 7) {
        return;
    }
    $(obj).find("ul").animate({
        marginTop: "-41px"
    }, 500, function () {
        $(this).css({marginTop: "0px"}).find("li:first").appendTo(this);
    })
}

//获取最新动态数据
function getNewNewsList() {
    api.get('/sourceinfo/latestnews').done(function (res) {
        if (typeof(res) == 'string') {
            res = $.parseJSON(res)
        }
        renderList('#newnews', '#newnews-template', res.data)
    })
}
//获取banner编目数据
function getBannerCatalog() {
    api.get('/sourceinfo/statistics').done(function (res) {
        if (typeof(res) == 'string') {
            res = $.parseJSON(res)
        }

        renderList('#banner-data', '#banner-data-template', res.data[0]);
        var catalogPercentage = res.data[0].releasecatalogcount / res.data[0].catalogcount;
        var catalogPercentageMin = catalogPercentage - 0.05;
        chart1(catalogPercentage.toFixed(4), catalogPercentageMin.toFixed(4));
    })
}
//编目情况
function chart1(catalogPercentage, catalogPercentageMin) {
    var option = {
        series: [{
            type: 'liquidFill',
            center: ['60%', '50%'],
            data: [
                {
                    value: catalogPercentage,
                    direction: 'right',
                    itemStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#5aadfe' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#72d2ff' // 100% 处的颜色
                                }]
                            }
                        }
                    }
                },
                {
                    value: catalogPercentageMin,
                    direction: 'left',
                    itemStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#28a9fe' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#60ecff' // 100% 处的颜色
                                }]
                            }
                        }
                    }
                }
            ],
            radius: '75%',
            outline: {
                borderDistance: 8,
                itemStyle: {
                    borderWidth: 5,
                    borderColor: '#3ad8ff',
                    shadowBlur: 5,
                    shadowColor: 'rgba(44, 210, 255, .8)'
                }
            },
            backgroundStyle: {
                color: 'transparent',
                borderWidth: 0
            },
            label: {
                normal: {
                    position: ['50%', '50%'],
                    formatter: function (params) {
                        return params.value * 100 + '%\n编目发布率';
                    },
                    fontSize: 20,
                    color: '#00a2ff'
                }
            }
        }]
    };
    try {
        var myChart = echarts.init(document.getElementById("index-chart"));
        myChart.setOption(option);
    } catch (e) {
    }
}
//获取政务数据推荐数据
function postGovernmentDataList() {
    api.get('/sourceinfo/datarecommend').done(function (res) {
        if (typeof(res) == 'string') {
            res = $.parseJSON(res)
        }
        renderList('#index-recommend-list1', '#index-recommend-list1-template', res.data[0].themelist);
        renderList('#index-recommend-list2', '#index-recommend-list2-template', res.data[0].departmentlist);
        renderList('#index-recommend-list3', '#index-recommend-list3-template', res.data[0].basisinfolist);
    })
}
//获取最新数据目录数据
function dataDirectoryList() {
    api.get('/sourceinfo/latestdata').done(function (res) {
        if (typeof(res) == 'string') {
            res = $.parseJSON(res)
        }
        renderList('#index-contents', '#index-contents-template', res.data);
    })
}
//获取目录访问排行数据
function accessRankingsList() {
    api.get('/dirAccess/getDirRankList').done(function (res) {
        if (typeof(res) == 'string') {
            res = $.parseJSON(res)
        }
        renderList('#index-popular', '#index-popular-template', res.data);
    })
}
//打开编目页面
function openSys(state) {

    var currUser = User.getCurrUser();
    var params = "";
    if (currUser) params = "?loginName=" + currUser.loginname + "&tokenid=" + currUser.tokenid;

    if(state == 1){ //编目系统
        window.open("http://202.106.10.250:8026/QGZWXX/sys/main"+params);
    }
    else if(state == 2){   //信息资源管理系统
        if(currUser) {
            $("#loginform #username").val(currUser.loginname);
            $("#loginform #password").val(currUser.loginpwd);
        }else{
            $("#loginform #username").val("");
            $("#loginform #password").val("");
        }
        $("#loginform").attr("action","http://202.106.10.250:8027/login");
        $("#loginform").submit();
    }else{  //自查清理整合清单及工作进展填报系统
        window.open("http://202.106.10.250:8026/GZJZTB/sys/main"+params);
    }

    /*var url= "http://202.106.10.250:8026/QGZWXX/sys/main"+params;
    if(state ==3)
        url="http://202.106.10.250:8026/GZJZTB/sys/main"+params;
    else if(state == 2)
        url ="http://202.106.10.250:8027/login";
    window.open(url);*/
}
