$(document).ready(function () {

    statisticalColumn('3', '资料规范')    //统计栏目点击数

    $('.video-source').attr('src',servicePath + '/rcStandard/download?id=1')   //视频加载地址

    var params = {type: 2, page: 1, rows: 5};
    api.get("/rcStandard/getRcList", params).then(function (result) {
        result.servicePath=servicePath;
        tool.renderList("#listzl", "#listzl-template", result);
    });

    params.type = 3;
    api.get("/rcStandard/getRcList", params).then(function (result) {
        result.servicePath=servicePath;
        tool.renderList("#listjd", "#listjd-template", result);
    });

    params.type = 4,params.rows=2;
    api.get("/rcStandard/getRcList", params).then(function (result) {
        result.servicePath=servicePath;
        tool.renderList("#listgf", "#listgf-template", result);
    });
});