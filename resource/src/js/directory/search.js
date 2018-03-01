var flag = 0
var eachPageCount = 5   //分页每页显示的条数

var treeCodeList = []   //目录ID列表
var treeCode = ''      //目录ID
var providMode = ''    //提供方式
var inputtext = ''     //搜索内容
var createtime = 'desc'    //	发布时间排序（必填）
var accesscount = ''   //	访问量排序    asc=正序，desc=倒序

$(function() {

    //处理目录访问top5图表问题
    Handlebars.registerHelper('handleClass', function (i) {
        if (i == 0) {
            return 'icon-jiangpai-'
        } else if (i == 1) {
            return 'icon-jiangpai-1'
        } else if (i == 2) {
            return 'icon-jiangpai-2'
        } else {
            return 'icon-jinduyuan'
        }
    });

    getCatalogTop5List()   //获取目录访问top5数据

    inputtext =  tool.getParams("title") || "";
	console.log("inputtext",inputtext);
    getListData({          //获取列表数据
        "code": "",
        "type": "",
        "inputtext": inputtext,
        "createtime": "desc",
        "accesscount": "",
        "page": 1,
        "rows": eachPageCount
    })
});

//获取目录访问top5数据
function getCatalogTop5List(){

	api.get('/dirAccess/getDirRankList',{
		"rows": 5
	})
	.done(function(res){
		if(typeof(res) == 'string'){
			res = $.parseJSON(res)
		}
		tool.renderList('#catalog-top5','#catalog-top5-template',res.data)
	})
}

//获取目录列表
function getListData(params){
	
	api.get('/sourceinfo/find',params)
	.done(function(res){
		if(typeof(res) == 'string'){
			res = $.parseJSON(res)
		}

		$('.result-count').html(res.count)
        res.isLogin = tool.getCookie('currUser')        //获取登录状态
		tool.renderList('#list-wrap1','#list-wrap1-template',res)

		var totalPage = Math.ceil(res.count / eachPageCount)

		if(totalPage == 0) {
			$('.page-wrap').addClass("dn")
			return
		} else{
			$('.page-wrap').removeClass("dn")
		}

		$('.total-count').html('共'+totalPage+'页，每页'+eachPageCount+'条')

		if(flag == 0){                       
			$('.pagination').pagination({
			    totalData: res.count,
			    showData: eachPageCount,
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
			    callback:function(api){
			    	flag = 1                  //防止进入死循环
			        getListData({
						"code": treeCode,
						"type": providMode,
						"inputtext": inputtext,
						"createtime": createtime,
						"accesscount": accesscount,
						"page": api.getCurrent(),
						"rows": eachPageCount
					})
			    }
			});
		}
	})
}

//按搜索内容过滤目录列表数据
function filterListBySearch(){
	var txt = $('.search-txt').val()
	txt = $.trim(txt)
	inputtext = txt
	getListData({
		"code": treeCode,
		"type": providMode,
		"inputtext": inputtext,
		"createtime": createtime,
		"accesscount": accesscount,
		"page": 1,
		"rows": eachPageCount
	})
}



