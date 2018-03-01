
$(document).ready(function () {

    statisticalColumn('4', '融合共享动态')    //统计栏目点击数

    chart1();
    chart3();
    chart4();
    chart5();
    chart6();
});
//编目情况
function  chart1() {

    var option = {
        title:{
            text:'编目情况',
            textStyle:{
                color:'#474747',
                fontSize:16
            },
            top:25,
            left:'center'
        },
        series: [{
            type: 'liquidFill',
            center: ['50%', '60%'],
            data: [
                {
                    value: 0.5,
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
                    value: 0.4,
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
            radius: '65%',
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
                color:'#fff',
                borderWidth: 0
            },
            label: {
                normal: {
                    position: ['50%', '20%'],
                    formatter: function(params) {
                        return params.value*100 + '%\n编目发布率';
                    },
                    fontSize: 20,
                    color: '#00a2ff'
                }
            }
        }]
    };
    initChart("liquidfill1",option);
}

//数据情况
function chart3() {

    var option = {
        title:{
            text:'数据情况',
            textStyle:{
                color:'#474747',
                fontSize:16
            },
            top:25,
            left:'center'
        },
        series: [{
            type: 'liquidFill',
            center: ['50%', '60%'],
            data: [
                {
                    value: 0.9,
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
                                    offset: 0, color: '#ffaa0f' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#ffda46' // 100% 处的颜色
                                }]
                            }
                        }
                    }
                },
                {
                    value: 0.8,
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
                                    offset: 0, color: '#ff9109' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#ffda46' // 100% 处的颜色
                                }]
                            }
                        }
                    }
                }
            ],

            radius: '65%',
            outline: {
                borderDistance: 8,
                itemStyle: {
                    borderWidth: 5,
                    borderColor: '#fbc107',
                    shadowBlur: 5,
                    shadowColor: 'rgba(252, 202, 7, .8)'
                }
            },
            backgroundStyle: {
                color:'#fff',
                borderWidth: 0
            },
            label: {
                normal: {
                    formatter: function(params) {
                        return params.value*100 + '%\n数据发布率';
                    },
                    fontSize: 20,
                    color: '#00a2ff'
                }
            }
        }]
    };
    initChart("liquidfill2",option);
}

//数据交换关系
function  chart4() {

    var option = {
        title: {
            text: '数据交换关系',
            top: 25,
            left: 'center'
        },
        tooltip: {show:false},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series : [
            {
                name: '数据交换关系',
                type: 'graph',
                layout: 'circular',
                circular: {
                    rotateLabel: true
                },
                data: graphData.nodes,
                links: graphData.links,
                categories: graphData.categories,
                width:'80%',
                roam: true,
                label: {
                    normal: {
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                lineStyle: {
                    normal: {
                        color: 'source',
                        curveness: 0.3
                    }
                }
            }
        ]
    };
    initChart("graph",option);

}

//交换方式
function  chart5() {

    var option = {
            title:{
                text:'数据交换',
                textStyle:{
                    color:'#474747',
                    fontSize:16
                },
                top:25,
                left:'center'
            },
            tooltip : {
                show: false,
                formatter:function(params){
                    return "<div style='color:"+params.color.colorStops[0].color+"'>"+params.percent+"%</div>"
                },
                backgroundColor:'transparent',
                position: ['39%','40%'],
                textStyle:{
                    fontSize:30
                }

            },
            legend:{
                data:["数据库","数据接口","文件传输"],
                right:'20',
                bottom:'30',
                orient:'vertical',
                textStyle:{
                    color:'#333333',
                    fontSize:'12'
                }
            },
            color:['#b78f25','#1d8ca0', '#075b9b'],
            series: [
                {
                    name:'',
                    type:'pie',
                    radius: ['40%', '55%'],
                    center: ['50%', '50%'],
                    data:[{
                        value: 25,
                        name: '数据库',
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                formatter:'{d}%',
                                textStyle: {
                                    fontSize: '30',
                                    color:'#25ddfe'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 1,
                                    y2: 0,
                                    colorStops: [{
                                        offset: 0, color: '#25ddfe' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: '#01b9fd' // 100% 处的颜色
                                    }]
                                }

                            }
                        }
                    },{
                        value: 15,
                        name: '数据接口',
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                formatter:'{d}%',
                                textStyle: {
                                    fontSize: '30',
                                    color:'#ff8400'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 1,
                                    y2: 0,
                                    colorStops: [{
                                        offset: 0, color: '#ff8400' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: '#ffbf00' // 100% 处的颜色
                                    }]
                                }

                            }
                        }
                    },{
                        value: 60,
                        name: '文件传输',
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                formatter:'{d}%',
                                textStyle: {
                                    fontSize: '30',
                                    color:"#00a7fe"
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 1,
                                    y2: 0,
                                    colorStops: [{
                                        offset: 0, color: '#00a7fe' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: '#0088fe' // 100% 处的颜色
                                    }]
                                }

                            }
                        }
                    }],
                    label: {
                        normal: {
                            show:false,
                        }
                    }
                }
            ]
        };
    initChart("pie1",option)
}

//数据类型
function  chart6() {

    var option = {
        title:{
            text:'数据类型',
            textStyle:{
                color:'#474747',
                fontSize:16
            },
            top:25,
            left:'center'
        },
        legend:{
            data:["非结构化数据","结构化数据"],
            right:'20',
            bottom:'30',
            orient:'vertical',
            textStyle:{
                color:'#333333',
                fontSize:'12'
            }
        },
        series: [
            {
                name:'',
                type:'pie',
                radius: ['40%', '55%'],
                center: ['50%', '50%'],
                data:[{
                    value: 15,
                    name: '非结构化数据',
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            formatter:'{d}%',
                            textStyle: {
                                fontSize: '30',
                                color:'#ff8400'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 1,
                                y2: 0,
                                colorStops: [{
                                    offset: 0, color: '#ff8400' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#ffbf00' // 100% 处的颜色
                                }]
                            }

                        }
                    }
                },{
                    value: 85,
                    name: '结构化数据',
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            formatter:'{d}%',
                            textStyle: {
                                fontSize: '30',
                                color:"#00a7fe"
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 1,
                                y2: 0,
                                colorStops: [{
                                    offset: 0, color: '#00a7fe' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#0088fe' // 100% 处的颜色
                                }]
                            }

                        }
                    }
                }],
                label: {
                    normal: {
                        show:false,
                    }
                }
            }
        ]
    };
    initChart("pie2",option)
}

function  initChart(containerId,option) {

    try {
        var myChart = echarts.init(document.getElementById(containerId));
        myChart.setOption(option);
    }catch (e){}
}