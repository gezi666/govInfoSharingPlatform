
var flag = 0
var eachPageCount = 5   //分页每页显示的条数

var selectedList = []   //已选条件列表文本(不包括提供方式)
var selectedListTXT = []   //已选条件列表文本
var treeCodeList = []   //目录ID列表
var treeCode = ''      //目录ID
var treeCodeTxt = ''      //目录ID文本
var providMode = ''    //提供方式
var inputtext = ''     //搜索内容
var createtime = 'desc'    //	发布时间排序（必填）
var accesscount = ''   //	访问量排序    asc=正序，desc=倒序

$(function(){

	statisticalColumn('2', '找目录')    //统计栏目点击数

	//处理目录访问top5图表问题
	Handlebars.registerHelper('handleClass',function(i){
		if(i==0){
			return 'icon-jiangpai-'
		} else if(i==1){
			return 'icon-jiangpai-1'
		} else if(i==2){
			return 'icon-jiangpai-2'
		} else{
			return 'icon-jinduyuan'
		}
	})
	getCatalogTree("-1","资源分类")   //获取资源分类目录

	getCatalogTop5List()   //获取目录访问top5数据

	getListData({          //获取列表数据
		"code": "",
		"type": "",
		"inputtext": "",
		"createtime": "desc",
		"accesscount": "",
		"page": 1,
		"rows": eachPageCount
	})    

	// 选择筛选条件
	$('body').delegate(".select-item","click",function(){
		var selectxt = $(this).text()
		selectedListTXT.push(selectxt)
		if(!($(this).hasClass("select-type"))){
			selectedList.push(selectxt)
		} else{
			$(".mode").addClass("dn")
		}

		tool.renderList('#selected-condition','#sel-con-template',selectedListTXT)
	})

	// 删除已选条件
	$('body').delegate('.delself','click',function(){

		var txt = $(this).parent().text()
		txt = txt.substring(0,txt.length-1)

		judgeFilterType(txt)
	})

	// 更多下拉
	$('body').delegate(".show-more","click",function(){
		// $(this).toggleClass("active")
		$('.inner-tree').toggleClass("active")
	})

	// 排序功能
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
		} else if(sortName == "按发布时间"){
			if($(this).hasClass("active")){
				createtime = "desc"
				accesscount = ""
			} else {
				createtime = ""
			}
		}

		getListData({
			"code": treeCode,
			"type": providMode,
			"inputtext": inputtext,
			"createtime": createtime,
			"accesscount": accesscount,
			"page": 1,
			"rows": eachPageCount
		})
	})
})


//判断选择条件类型
function judgeFilterType(txt){

	var resourceArray  = ['基础信息','政务主题','部门资源','地方资源']
	var modeArray  = ['数据库','文件','API服务']

	if($.inArray(txt,modeArray) != -1){       //删除已选条件中的 提供方式
		$('.mode').removeClass("dn")

		providMode = ''

		selectedListTXT = [].concat(selectedList)        //重组已选条件列表

		getListData({
			"code": treeCode,
			"type": providMode,
			"inputtext": inputtext,
			"createtime": createtime,
			"accesscount": accesscount,
			"page": 1,
			"rows": eachPageCount
		})

	} else {                                     //删除已选条件中的 分类

		if($.inArray(txt,selectedList) == 0){   //删除一级分类
			treeCode = ''
			treeCodeTxt = '资源分类'
			treeCodeList = []
			selectedList = []
		} else {
			treeCode = treeCodeList[$.inArray(txt,selectedList) - 1]            //treeCode取父节点的code
			treeCodeTxt = selectedList[$.inArray(txt,selectedList) - 1]
			treeCodeList = treeCodeList.slice(0,$.inArray(txt,selectedList))
			selectedList = selectedList.slice(0,$.inArray(txt,selectedList))
		}

		selectedListTXT = [].concat(selectedList)        //重组已选条件列表

		if(providMode == 6){
			selectedListTXT.push('API服务') 
		} else if(providMode == 7){
			selectedListTXT.push('数据库')
		} else if(providMode == 8){
			selectedListTXT.push('文件')
		}

		if(treeCode == ''){
			getCatalogTree2("-1",treeCodeTxt)
		} else {
			getCatalogTree2(treeCode,treeCodeTxt)
		}

	}

	tool.renderList('#selected-condition','#sel-con-template',selectedListTXT)   //重新渲染已选条件列表
}


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

		var isLogin = tool.getCookie('currUser')        //获取登录状态
		res.isLogin = isLogin

		$('.result-count').html(res.count)

		tool.renderList('#list-wrap1','#list-wrap1-template',res)

		var totalPage = Math.ceil(res.count / eachPageCount)

		if(totalPage == 0) {
			$('.page-wrap').addClass("dn");
		} else{
			$('.page-wrap').removeClass("dn")
			$('.total-count').html('共'+totalPage+'页，每页'+eachPageCount+'条')
		}

		if(flag == 0){                       //防止进入死循环 
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
			    isHide: false,
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

//目录树查询、渲染列表数据
function getCatalogTree(catalogCode,parentName){

	if(catalogCode != '-1'){
		treeCodeList.push(catalogCode)
		treeCode = treeCodeList[treeCodeList.length-1]
	}
	
	api.get('/direct/find',{
		"code": catalogCode
	})
	.done(function(res){
		if(typeof(res) == 'string'){
			res = $.parseJSON(res)
		}
		$('.search-txt').val("")       //清空搜索框内容

		var treeList = {
			"parentName": parentName,
			"childTreeList": res.data
		}

		tool.renderList('#chaged-wrap','#chaged-wrap-template',treeList)  //渲染条件列表

		//判断是否显示  更多  标识
		if($('.inner-tree').height() > 30){
			$('.show-more').removeClass("dn")
			$('.inner-tree').addClass("active")
		}

		//获取目录列表
		getListData({
			"code": treeCode,
			"type": providMode,
			"inputtext": "",
			"createtime": createtime,
			"accesscount": accesscount,
			"page": 1,
			"rows": eachPageCount
		})

	})
}

//目录树查询、渲染列表数据
function getCatalogTree2(catalogCode,parentName){
	
	api.get('/direct/find',{
		"code": catalogCode
	})
	.done(function(res){
		if(typeof(res) == 'string'){
			res = $.parseJSON(res)
		}
		$('.search-txt').val("")       //清空搜索框内容

		var treeList = {
			"parentName": parentName,
			"childTreeList": res.data
		}

		tool.renderList('#chaged-wrap','#chaged-wrap-template',treeList)  //渲染条件列表

		//判断是否显示  更多  标识 
		if($('.inner-tree').height() > 30){
			$('.show-more').removeClass("dn")
			$('.inner-tree').addClass("active")
		}

		//获取目录列表
		getListData({
			"code": treeCode,
			"type": providMode,
			"inputtext": "",
			"createtime": createtime,
			"accesscount": accesscount,
			"page": 1,
			"rows": eachPageCount
		})

	})
}

//根据提供方式过滤目录列表数据  	提供方式(接口=6，数据库=7，文件=8)
function filterListByType(type){

	$('.search-txt').val("")       //清空搜索框内容

	providMode = type
	getListData({
		"code": treeCode,
		"type": providMode,
		"inputtext": "",
		"createtime": createtime,
		"accesscount": accesscount,
		"page": 1,
		"rows": eachPageCount
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

//搜索回车事件
function btnSearch(){
    if(event.keyCode == 13){
        filterListBySearch();
    }
}




