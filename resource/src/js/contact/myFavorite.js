/**
 * Created by guohuimin on 2017/11/8.
 */
var code, currCode, icons = ['icon-fujinrenzhanjie', 'icon-qiye', 'icon-ye', 'icon-xin1', 'icon-ren',
    'icon-jiankangxin', 'icon-zhufang', 'icon-shehuibaozhang', 'icon-guojiaanquanyaopin', 'icon-shipinanquanicon', 'icon-jiagezoushi', "icon-raxiconjinrong", "icon-huanbao", "icon-xinyongtixi",
    'icon-jiankangxin', 'icon-zhufang', 'icon-shehuibaozhang', 'icon-guojiaanquanyaopin', 'icon-shipinanquanicon', 'icon-shipinanquanicon',
    'icon-jiankangxin', 'icon-zhufang', 'icon-shehuibaozhang', 'icon-guojiaanquanyaopin', 'icon-shipinanquanicon', 'icon-shipinanquanicon', 'icon-shipinanquanicon', 'icon-shipinanquanicon', 'icon-shipinanquanicon', 'icon-shipinanquanicon', 'icon-shipinanquanicon'];
var inputtext = ''     //搜索内容
var createtime = 'desc'    //	更新时间排序（必填）
var accesscount = ''   //	访问量排序    asc=正序，desc=倒序

$(document).ready(function () {

    code = tool.getParams("code");
    currCode = tool.getParams("currCode");

    //setTitle();
    loadTree();
    getListData(1, true);

    var iconsLen = icons.length;
    Handlebars.registerHelper("getIcon", function (name) {
        var index = parseInt(Math.random() * iconsLen);
        return icons[index];
    });
});

/*function  setTitle() {
    var titleName="地方资源"
    if(code ==1) titleName="基础信息";
    else if(code == 2) titleName="政务主题";
    else if(code ==3) titleName="部门资源";
    $("#title").html(titleName);
}*/

function loadTree() {

    api.get("/direct/find?code=" + code).then(function (result) {

        tool.renderList("#tree", "#tree-template", result);
        //$("#tree").mCustomScrollbar();
        if (currCode)
            treeClick(1, currCode, $("#" + currCode)[0]);

    });
}

//获取目录列表
function getListData(pageIndex, loadPaga) {

    var params = {          //获取列表数据
        "code": code,
        "type": '',
        "inputtext": inputtext,
        "createtime": createtime,
        "accesscount": accesscount,
        "page": pageIndex,
        "rows": 5
    }
    api.get('/sourceinfo/find', params)
        .done(function (result) {
            renderList('#list-wrap1', '#list-wrap1-template', result);
            if (loadPaga)
                loadPagaration(result);
        })
}

function loadPagaration(result) {

    var pageSize = 5;
    var totalPage = Math.ceil(result.count / pageSize)
    $('.result-count').html(result.count)
    $('.total-count').html('共' + totalPage + '页，每页' + pageSize + '条')

    if(result.count==0){
        $('.pagination').hide();
        return;
    }
    $('.pagination').show();
    $('.pagination').pagination({
        totalData: result.count,
        showData: pageSize,
        count: 1,
        current: 1,
        prevCls: 'item-first',
        nextCls: 'item-last',
        homePage: '首页',
        endPage: '末页',
        prevContent: '上页',
        nextContent: '下页',
        activeCls: 'item-active',
        jumpBtnCls: 'btn-queding',
        jumpBtn: '跳转',
        coping: true,
        isHide: true,
        jump: true,
        callback: function (api) {
            getListData(api.getCurrent());
        }
    });
}
function filterListBySearch(){
    inputtext = $('.search-txt').val()
    getListData(1,true);
}
// 排序功能
/*$('body').delegate(".sort-item","click",function(){

    $(this).addClass('active').siblings().removeClass('active')

    var sortName = $(this).text()
    if(sortName == "按访问量"){
        if($(this).hasClass("active")){
            accesscount = "desc"
            createtime = ""
        } else {
            accesscount = ""
        }
    } else if(sortName == "按更新时间"){
        if($(this).hasClass("active")){
            createtime = "desc"
            accesscount = ""
        } else {
            createtime = ""
        }
    }
    getListData(1,true);
})*/

//树点击事件
function treeClick(type, id, node) {

    code=id;
    //获取数据列表
    getListData(1, true);
    var classNames = ["one-catalog", "two-catalog", "three-catalog", "four-catalog"],
        $container = $(node).parent();
    switch (type) {
        case 1:
        case 2:
            $(".icon-arrow-left", $("." + classNames[type - 1])).removeClass("icon-arrow-left").addClass("icon-arrow-t");
            $("i.icon-arrow-t", node).removeClass("icon-arrow-t").addClass("icon-arrow-left");
        case 3:
            $('.clickableActive', $('.' + classNames[type - 1])).removeClass("clickableActive");
            $(node).addClass("clickableActive");
        default:
            break;
    }

    $("." + classNames[type]).hide();
    var $childNode = $("div." + classNames[type], $container);
    if ($childNode.length > 0) {
        $childNode.show();
        return;
    }

    api.get("/direct/find?code=" + id).then(function (result) {

        var html = "";
        if (type == 1) {
            html = '<div class="clickable-content two-catalog">';
            $(result.data).each(function (index, item) {
                html += '<div><a class="clickable2" onclick="treeClick(2,' + item.id + ',this)"><em></em>' + '<span>' + item.name + '</span></span>' + '<i class="icon iconfont icon-arrow-t"></i></a></div>'
            });
            html += "</div>"
        }
        else {
            html = '<div class="clickable-content three-catalog">';
            $(result.data).each(function (index, item) {
                html += '<a onclick="treeClick(3,' + item.id + ',this)">' + '<span>' + item.name + '</span>' + '</a>'
            });
            html += "</div>";
        }
        $container.append(html);

    });
}
