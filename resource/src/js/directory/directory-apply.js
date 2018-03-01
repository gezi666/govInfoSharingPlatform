
var getDataList = {}       //进入页面获取到的数据
var applyDataList = {}    //申请提交数据

$(function () {

    getDataList = {}    //清空

    getApplyInfo(tool.getParams("id"))   //获取申请页相关信息

    // 选择申请类型
    $('.type-radio').click(function(){
        $(this).addClass('active').siblings().removeClass('active')
    })

    //返回
    $('.go-back').click(function () {
        history.go(-1)
    })

    //提交表单
    $('.submit-apply').click(function(){

        //验证必填项
        if($('.contacts').val()==''){    //联系人
            $('.contacts').focus()
            return
        } else if($('.tel').val()=='' || !(/^1[34578]\d{9}$/.test($('.tel').val()))){  //联系电话
            $('.tel').val("")
            $('.tel').focus()
            return
        } 
        // else if($('.department').val()==''){  //申请部门
        //     $('.department').focus()
        //     return
        // } 
        else if($('.reason').val()==''){  //申请理由
            $('.reason').focus()
            return
        }

        getDataList.apply_type = $('.type-radio.active').html()   //申请类别
        getDataList.tel_man = $('.contacts').val()            //联系人
        getDataList.tel_no = $('.tel').val()                  //联系电话
        // getDataList.appler_govname = $('.department').val()           //申请部门
        getDataList.startdate = $('.star-time').val()         //开始日期
        getDataList.enddate = $('.ent-time').val()            //结束日期
        getDataList.applyreason = $('.reason').val()          //申请理由

        postApply(getDataList)
    })
})

//获取申请页相关信息
function getApplyInfo(id){
    api.get('/sourceinfo/getInfoForApplybyid',{
        "id": id
    })
    .done(function(res){
        if (typeof(res) == 'string') {
            res = $.parseJSON(res)
        }

        getDataList = res.data[0]

        tool.renderList('#get-list-wrap', '#get-list-template', res.data[0])

        $('.catalog').html(res.data[0].providedeptchild)    //填写申请目录
    })
}

//勾选列表行
function checkLine(obj,index){
    
    $(obj).toggleClass('active')

    if($(obj).hasClass('ckeck-all')){
        if($(obj).hasClass('active')){
            $('.ckeck-box').addClass('active')
                if(getDataList.infomationlist && getDataList.infomationlist.length > 0){
                    getDataList.infomationlist.forEach(function(i){
                        i.status = '0'     //申请
                    })
                }
        } else{
            $('.ckeck-box').removeClass('active')
                if(getDataList.infomationlist && getDataList.infomationlist.length > 0){
                    getDataList.infomationlist.forEach(function(i){
                    i.status = '1'     //不申请
                })
            }
        }
    } else{
        if($(obj).hasClass('active')){
            getDataList.infomationlist[index].status = '0'     //申请
        } else{
            getDataList.infomationlist[index].status = '1'     //不申请
        }
    }
    
}

//提交申请
function postApply(dataList){

    $.ajax({
        type: "POST",
        url: servicePath+"/subscribeapply/apply",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(dataList),
        success: function (res) {
            if(res.result == '1'){
                $('.fail-tip').hide()
                if (typeof(res) == 'string') {
                    res = $.parseJSON(res)
                }

                if(res.result == '1'){
                    history.go(-1)
                }
            } else{
                $('.fail-tip').show()
                return
            }
            
        },
        error: function (res) {
            $('.fail-tip').show()
            return
        }
    });

}