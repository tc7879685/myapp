import  React,{Component} from 'react'
import {fmoney}  from '../../utils/commons'
// 引入 ECharts 主模块
const echarts = require('echarts');
const colorJSON =  require('../../utils/echartsColor')
//引入柱状图
//require('echarts/lib/chart/pie');
// 引入提示框和标题组件
//require('echarts/lib/component/tooltip');
//require('echarts/lib/component/title');

class  UnitCount extends  Component{
    constructor(){
        super()
    }
    componentDidMount(){
        let obj = this.props.obj;
        this.canversPie(obj);//画图
    }

    canversPie =(object)=>{
        // 基于准备好的dom，初始化echarts实例
        echarts.registerTheme('westeros', colorJSON) //注册主题；
        var myChart = echarts.init(document.getElementById('main'),'westeros');

        let xData = object.category;
        let seraiDataList = object.dataset;
        let seraiData = [];
        seraiDataList.map((item,i)=>{
            let param = {
                name: item.name,
                type: 'line',
                symbolSize:4,//标记点的大小
                itemStyle: {
                    normal: {
                        lineStyle: {        // 系列级个性化折线样式
                            width:1,
                            type: 'solid'
                        }
                    }//线条样式
                }
            }
            let dataArray = []
            item.data.map((itemValue,i)=>{
                dataArray.push(parseFloat(itemValue.tradeMoney))
            })
            param.data = dataArray;
            seraiData.push(param)
        })
        let optinsLine = {
            backgroundColor:'white',//背景颜色透明
            /* label:{
                     show:true,
                     formatter:function (param) {
                         return(param.data).toFixed(2)
                     }
             },*/
            title: {
                text: '单位余额统计图',
                x:'center',
                subtext: '数据来自西安兰特水电测控技术有限公司',
                textStyle:{
                    color:"#4d2222",
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter:function (param) {
                    let showHtml = [];
                    param.map((item,i)=>{
                        showHtml.push('<div style="float: left">'+item.seriesName+'</div><br/>')
                        showHtml.push('<div style="float: left">'+fmoney(item.value)+'元</div><br/>')

                    })
                    return showHtml.join('')
                },
                textStyle:{
                    fontSize:12
                },
                axisPointer:{
                    type:'cross', //十字准心
                    lineStyle:{
                        color: {
                            type: 'cross',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'red' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'blue' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        }
                    },
                    crossStyle:{
                        color: {
                            type: 'cross',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 0.5,
                            colorStops: [{
                                offset: 0, color: 'red' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'blue' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        }
                    }

                }
                /* formatter:function (param) {
                     return(param.data)
                 }*/
            },
            toolbox: {
                show:false,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            legend: {
                // icon : 'roundRect',//icon为圆角矩形
                type: 'scroll',
                bottom: 0,
                //data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
            },
            grid: {
                left: '3%',
                right: '4%',
                //bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xData   //横坐标数据,
            },
            yAxis: {
                type: 'value',
                // axisLine : {onZero: false},
                axisLabel : {
                    formatter: function (param) {
                        return fmoney(param,2)
                    },
                },
                //  boundaryGap : false,
                // data : ['0', '10', '20', '30', '40', '50', '60', '70', '80']
            },
            series: seraiData
        }

        myChart.setOption(optinsLine)
    }

    render(){
        return(
                <div id="main" style={{height:'300px'}}></div>

        )
    }
}

export  default  UnitCount