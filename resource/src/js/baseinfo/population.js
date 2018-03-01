/**
 * Created by ly on 2017/11/01.
 */

$(function () {
    //var echarts = require('echarts');

    $(".population-tab-tit li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        var liNum = $(this).index();
        $(".population-tab-cont").find("li").eq(liNum).show().siblings().hide();
    })

    var _chart1 = echarts.init(document.getElementById('chart1'));
    var option1 = {
        series : [
            {
                type: 'graph',
                symbolSize: 30,
                label: {
                    normal: {
                        show: true,
                        textStyle:{
                            fontSize:12
                        }
                    }
                },
                lineStyle: {
                    normal: {
                        color:'#52a2a3',
                        //curveness: 0.2,
                        width:2
                    }
                },
                data: [
                    {name: '性别',x: 491,y: 10,
                        symbolSize: 30,
                        itemStyle:{normal:{color:'#00a3ff'}}
                    }, 
                    {name: '民族',x: 495,y: 14,
                        symbolSize: 30,
                        itemStyle:{normal:{color:'#00a3ff'}}
                    }, 
                    {name: '死亡\n标识',x: 501,y: 17,
                        symbolSize: 40,
                        itemStyle:{normal:{color:'#00a3ff'}}
                    }, 
                    {name: '出生\n日期',x: 485,y: 18,
                        symbolSize: 40,
                        itemStyle:{normal:{color:'#00a3ff'}}
                    },
                    {name: '出生地',x: 480,y: 22,
                        symbolSize: 40,
                        itemStyle:{normal:{color:'#00a3ff'}}
                    },
                    {name: '公民身\n份号码',x: 485,y: 27,
                        symbolSize: 46,
                        itemStyle:{normal:{color:'#00a3ff'}}
                    },
                    {name: '姓名',x: 490,y: 26,
                        symbolSize: 30,
                        itemStyle:{normal:{color:'#00a3ff'}}
                    }, 
                    {name: '公安部',x: 490,y: 20,
                        symbolSize: 50,
                        itemStyle:{normal:{color:'#ffa200'}}
                    }, 
                    {name: '人口库',x: 510,y: 25,
                        symbolSize: 60,
                        itemStyle:{normal:{color:'#42c000'}}
                    }, 
                    {name: '教育部',x: 508,y: 30,
                        symbolSize: 40,
                        itemStyle:{normal:{color:'#ffa200'}}
                    }, 
                    {name: '民政部',x: 513,y: 28,
                        symbolSize: 40,
                        itemStyle:{normal:{color:'#ffa200'}}
                    }, 
                    {name: '卫计委',x: 515,y: 25,
                        symbolSize: 40,
                        itemStyle:{normal:{color:'#ffa200'}}
                    }, 
                    {name: '人社部',x: 513,y: 21,
                        symbolSize: 40,
                        itemStyle:{normal:{color:'#ffa200'}}
                    }, 
                    {name: '服务\n处所',x: 515,y: 15,
                        symbolSize: 40,
                        itemStyle:{normal:{color:'#c9c9c9'}}
                    }, 
                    {name: '实际居\n住地址',x: 520,y: 24,
                        symbolSize: 46,
                        itemStyle:{normal:{color:'#c9c9c9'}}
                    }, 
                    {name: '婚姻\n状况',x: 517,y: 30,
                        symbolSize: 40,
                        itemStyle:{normal:{color:'#c9c9c9'}}
                    }, 
                    {name: '户籍\n地址',x: 487,y: 12,
                        symbolSize: 40,
                        itemStyle:{normal:{color:'#c9c9c9'}}
                    }, 
                    {name: '照片',x: 483,y: 14,
                        symbolSize: 30,
                        itemStyle:{normal:{color:'#c9c9c9'}}
                    }
                    ],
                links: [
                    {source: '公安部',target: '人口库'}, 
                    {source: '公安部',target: '性别'}, 
                    {source: '公安部',target: '民族'}, 
                    {source: '公安部',target: '死亡\n标识'}, 
                    {source: '公安部',target: '出生\n日期'}, 
                    {source: '公安部',target: '出生地'}, 
                    {source: '公安部',target: '公民身\n份号码'}, 
                    {source: '公安部',target: '户籍\n地址'}, 
                    {source: '公安部',target: '照片'}, 
                    {source: '公安部',target: '姓名'}, 
                    {source: '人口库',target: '教育部'}, 
                    {source: '人口库',target: '民政部'}, 
                    {source: '人口库',target: '卫计委'}, 
                    {source: '人口库',target: '人社部'}, 
                    {source: '人社部',target: '服务\n处所'}, 
                    {source: '卫计委',target: '死亡\n标识'}, 
                    {source: '卫计委',target: '实际居\n住地址'}, 
                    {source: '卫计委',target: '婚姻\n状况'}, 
                    {source: '民政部',target: '婚姻\n状况'}, 
                    {source: '人社部',target: '死亡\n标识'}
                    
                ]
            }
        ]
    };
    _chart1.setOption(option1);

})

