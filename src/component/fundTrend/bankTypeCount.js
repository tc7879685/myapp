import  React,{Component} from 'react'
import {fmoney}  from '../../utils/commons'
// 引入 ECharts 主模块
const echarts = require('echarts');
const colorJSON =  require('../../utils/echartsColor')

class  BankTypeCount extends  Component{
    constructor(){
        super()
    }
    componentDidMount(){
        let obj = this.props.obj;
      //  this.canversPie(obj);//画折线图
        this.canversHistogram(obj);//画柱状图
    }
    canversHistogram =(object)=>{
        // 基于准备好的dom，初始化echarts实例
        echarts.registerTheme('westeros', colorJSON) //注册主题；
        let myChart = echarts.init(document.getElementById('main'),'westeros');
        let xData =[];//
        let seraiDataList = object.dataset;
        let seraiData = [];
        let dataArray =[];
        let param = {
            type: 'bar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
           // symbolSize:1,//标记点的大小
        }
        seraiDataList.map((item,i)=>{
            //xData.push(item.name.substring(0,item.name.length-2)) //横坐标
            xData.push(item.name) //横坐标
            dataArray.push(item.data[0].tradeMoney);

        })
        param.data = dataArray;
        seraiData.push(param)

        let timeArray = object.category;
        let timeStr = timeArray.length==1?timeArray[0]:(timeArray[0]+"-"+timeArray[timeArray.length-1]);//统计时间
        let optinsLine = {
            color: ['#3398DB'],
            backgroundColor:'white',//背景颜色透明
            /* label:{
                     show:true,
                     formatter:function (param) {
                         return(param.data).toFixed(2)
                     }
             },*/
            title: {
                text: '银行类别统计',
                x:'center',
                subtext:'统计时间：'+timeStr,
                textStyle:{
                    color:"#4d2222",
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter:function (param) {
                    let showHtml = [];
                    param.map((item,i)=>{
                        showHtml.push('<div style="float: left">'+item.axisValue+'</div><br/>')
                        showHtml.push('<div style="float: left">'+fmoney(item.value)+'元</div><br/>')

                    })
                    return showHtml.join('')
                },
                textStyle:{
                    fontSize:12
                },
                axisPointer:{
                    type:'shadow', //十字准心

                }
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
                data:xData
            },
            grid: {
                left: '3%',
                right: '4%',
                //bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
               axisTick: {
                    alignWithLabel: true
                },
                data: xData   //横坐标数据,
            },
            yAxis: {
                type: 'value',
                // axisLine : {onZero: false},
               /* axisLabel : {
                    formatter: function (param) {
                        return fmoney(param,2)
                    },
                },*/
                //  boundaryGap : false,
                // data : ['0', '10', '20', '30', '40', '50', '60', '70', '80']
            },
            series: seraiData
        }

        myChart.setOption(optinsLine)
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

export  default  BankTypeCount
