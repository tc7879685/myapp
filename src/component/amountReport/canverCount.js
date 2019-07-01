import  React,{Component} from 'react'
import {diff, fmoney} from '../../utils/commons'
import { Carousel, WingBlank } from 'antd-mobile';
import {getNarray,} from '../../utils/commons'
// 引入 ECharts 主模块
const echarts = require('echarts');
const colorJSON =  require('../../utils/echartsColor')

let data;
let eleseArray;
class  CanverCount extends  Component{
    constructor(props){
        super(props)
        this.state = {
            data: ['1', '2', '3'],
            imgHeight: 176,
            dataObj:props.obj

        }

    }
    componentWillReceiveProps(nextProps) {
        if(!diff(nextProps.obj,this.state.dataObj)){
            let newObj =  nextProps.obj;
            let data = newObj.dataset;
            let time = newObj.category;
            let  eleseArrayTiime = getNarray(time,7);
            this.setState({
                data:eleseArrayTiime,
                dataObj:newObj
            })
            setTimeout(()=>{
                eleseArrayTiime.map((item,i)=>{
                    let newArrayShow = [];
                    data.map((itemArray,m)=>{
                        let newArray =  itemArray.data.slice(i*7,7*(i+1))
                        newArrayShow.push({name:itemArray.name,data:newArray})
                    })
                    this.canversPie(item,newArrayShow,i,newObj);//画折线图
                    //this.canversHistogram(item,time,i,titleName,graph);//画柱状图
                })
            },100)
        }
    }

    componentDidMount(){
        let obj = this.props.obj;
        let newObj =  obj;
        let data = newObj.dataset;
        let time =  newObj.category;
        let  eleseArrayTiime = getNarray(time,7);
        let titleName = obj.titleName;
        let graph = obj.graph;
        this.setState({
            data:eleseArrayTiime
        })
        setTimeout(()=>{
            eleseArrayTiime.map((item,i)=>{
                let newArrayShow = [];
                data.map((itemArray,m)=>{
                    let newArray =  itemArray.data.slice(i*7,7*(i+1))
                    newArrayShow.push({name:itemArray.name,data:newArray})
                })
                this.canversPie(item,newArrayShow,i,newObj);//画折线图
                //this.canversHistogram(item,time,i,titleName,graph);//画柱状图
            })
        },100)
    }



    canversPie =(dateArray,showArray,i,object)=>{
        let max = parseFloat(object.graph.maxValue).toFixed(2)
        let min = parseFloat(object.graph.maxValue).toFixed(2)
        // 基于准备好的dom，初始化echarts实例
        echarts.registerTheme('westeros', colorJSON) //注册主题；
        var myChart = echarts.init(document.getElementById('main'+i),'westeros');
        let xData = dateArray;
        let seraiDataList = showArray; //分页展示数据
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
                text: '结算量统计',
                x:'center',
                subtext: '单位：'+object.titleName,
                textStyle:{
                    color:"#4d2222",
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter:function (param) {
                    let showHtml = [];
                    param.map((item,i)=>{
                        showHtml.push('<div style="float: left">'+item.seriesName+'：</div>')
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
                show:false,
                // icon : 'roundRect',//icon为圆角矩形
                //type: 'scroll',
                bottom: 0,
                //data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
            },
            grid: {
                left: '3%',
                right: '6%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLabel:{
                    rotate:'45',
                    interval:0
                },
                data: xData   //横坐标数据,
            },
            yAxis: {
               /* min:max,
                max:min,*/
                name:'万元',
                align:'left',
                type: 'value',
                // axisLine : {onZero: false},
                axisLabel : {
                    formatter: function (param) {
                        return (param/10000).toFixed(2)
                    },
                },
                 boundaryGap : false,
                // data : ['0', '10', '20', '30', '40', '50', '60', '70', '80']
            },
            series: seraiData
        }

        myChart.setOption(optinsLine)
    }

    canvesShow = (index)=>{
        console.log(index)

    }

    render(){
        return(
            <div>
                <WingBlank style={{margin:'0px'}}>
                    <Carousel
                        autoplay={false}
                        dots={false}
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => this.canvesShow(index)}
                    >
                        {this.state.data.map((val,i) => (
                            <div key={i} id={"main"+i} style={{width:document.documentElement.clientWidth,height:'300px'}}></div>
                        ))}
                    </Carousel>
                </WingBlank>


            </div>

        )
    }
}
export  default  CanverCount
