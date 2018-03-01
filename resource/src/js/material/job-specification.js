var type, pageSize = 20;
$(document).ready(function () {

    type = tool.getParams("type") || 2;
    getListData(1, true);
    var title = type == 2 ? "文件资料" : type == 3 ? "宣讲解读" : "工作规范";
    $("#spanTitle").html(title);
});

function getListData(pageIndex, isLoadPagaration) {

    var params = {type: type, page: pageIndex, rows: pageSize};
    api.get("/rcStandard/getRcList", params).then(function (result) {

        result.servicePath = servicePath;
        tool.renderList("#list", "#list-template", result);
        if (isLoadPagaration) loadPagaration(result);
    });
}

function loadPagaration(result) {

    var totalPage = Math.ceil(result.count / pageSize)
    $('.result-count').html(result.count)
    $('.total-count').html('共' + totalPage + '页，每页' + pageSize + '条')

    if (result.count == 0) {
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