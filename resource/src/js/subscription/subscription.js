/**
 * Created by ly on 2017/10/25.
 */

var inputtext = ''     //搜索内容
var createtime = 'desc'    //   更新时间排序（必填）
var accesscount = ''   //   访问量排序    asc=正序，desc=倒序

var statusnum = 1;   //状态，0已申请，1审批通过，2审批不通过

$(function () {
    var localUrlnavSub = window.location + '';
    var spIndexnavSub;
    if (localUrlnavSub.indexOf('/subscription/collection.html') >= 0) { //我的收藏
        spIndexnavSub = 0;
    } else if (localUrlnavSub.indexOf('/subscription/subscription.html') >= 0) { //我的订阅
        spIndexnavSub = 1;
    }
    $(".left-bar-noheight .one-catalog").eq(spIndexnavSub).addClass("active").siblings().removeClass("active");

    $(".tab-menu li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        var liNum = $(this).index() + 1;
        $(".tab-cont" + liNum).show().siblings(".tab-cont").hide();
        if(liNum == 1){
            $("#paixuliang").show();
            $('.search-txt').val('');
            inputtext = ''
            statusnum = 1;
        }else if(liNum == 2){
            $("#paixuliang").show();
            $('.search-txt').val('');
            inputtext = ''
            statusnum = 0;
        }else if(liNum == 3){
            $("#paixuliang").hide();
            $('.search-txt').val('');
            inputtext = ''
            statusnum = 2;
        }
        getListData(1, true);
    })

    getListData(1, true);

})

//获取已订阅的资源列表
function getListData(pageIndex, loadPaga) {

    var params = {          //获取列表数据
        "status":statusnum,
        "name": inputtext,
        "createtime": createtime,
        "accesscount": accesscount,
        "page": pageIndex,
        "rows":5
    }
    api.get('/subscribeapply/mysubscribe', params).done(function (res) {

        isOnLine(res);
        if(statusnum == 1){
            renderList('#list-subscription1', '#list-subscription1-template', res);
        }else if(statusnum == 0){
            renderList('#list-subscription2', '#list-subscription2-template', res);
        }else if(statusnum == 2)
            renderList('#list-subscription3', '#list-subscription3-template', res);
        if (loadPaga){
            loadPagaration(res);
        }
    })
}
//翻页
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
//结果内搜索
function filterListBySearch(){
    inputtext = $('.search-txt').val()
     getListData(1,true);
}
// 列表排序功能
$('body').delegate(".sort-item","click",function(){

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
})


function isOnLine(data) {
    if(data.sessionstatus =="0" && location.hostname != "localhost")
        location.href="../index/index.html";
}
