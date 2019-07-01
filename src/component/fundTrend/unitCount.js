import  React,{Component} from 'react'
import {fmoney}  from '../../utils/commons'
import { Carousel, WingBlank } from 'antd-mobile';
import {getNarray,diff} from '../../utils/commons'
// 引入 ECharts 主模块
const echarts = require('echarts');
const colorJSON =  require('../../utils/echartsColor')
//引入柱状图
//require('echarts/lib/chart/pie');
// 引入提示框和标题组件
//require('echarts/lib/component/tooltip');
//require('echarts/lib/component/title');

class  UnitCount extends  Component{
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
            let  eleseArray = getNarray(nextProps.obj.dataset,5);
            this.setState({
                data:eleseArray,
                dataObj:nextProps.obj
            })
            setTimeout(()=>{
                eleseArray.map((item,i)=>{
                    this.canversHistogram(item,nextProps.obj,i);//画柱状图
                })
            },100)
        }
    }


    componentDidMount(){
        let obj = this.props.obj;
        let eleseArray = getNarray(obj.dataset,5);
        this.setState({
            data:eleseArray
        })
        setTimeout(()=>{
            eleseArray.map((item,i)=>{
                this.canversHistogram(item,obj,i);//画柱状图
            })
        },100)
        //  this.canversPie(obj);//画折线图


    }
    canversHistogram =(arrayData,obj,i)=>{
        // 基于准备好的dom，初始化echarts实例
        echarts.registerTheme('westeros', colorJSON) //注册主题；
        let myChart = echarts.init(document.getElementById('main'+i),'westeros');
        let xData =[];//
        let seraiDataList = arrayData;
        let seraiData = [];
        let dataArray =[];
        seraiDataList.map((item,i)=>{
            //xData.push(item.name.substring(0,item.name.length-2)) //横坐标
            let  xName = item.name.length<=5?item.name:(item.name.substring(0,5)+'..'+item.name.substring(item.name.length-2))
            console.log(item.name.length)
            xData.push(xName) //横坐标
            dataArray.push(item.data[0].tradeMoney);
        })

        let param = {
            type: 'bar',
            barWidth: '30px',
            label: {
                normal: {
                    show: true
                },
                //offset:[10,40],
                align:'right',
                rotate:30,
                position:'top'
            },
            itemStyle: {
                normal: {
                    label: {
                        show: true, //开启显示
                        position: 'top', //在上方显示
                        textStyle: { //数值样式
                            color: '#919191',
                            fontSize: 12
                        },
                        offset:[-20,10,40,80],
                        rotate:30
                    },
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
        param.data = dataArray;
        seraiData.push(param)
        //let timeStr = time.length==1?time[0]:(time[0]+"-"+time[time.length-1]);//统计时间
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
               // text:titleName+'统计',
                //x:'center',
               // subtext:'统计时间：'+timeStr,
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
                   // type:'shadow', //十字准心

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
                left: '4%',
                right: '4%',
               // top:'6%',
                //bottom: '5%',
               // containLabel: true
            },
            xAxis: {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel:{
                    show: true,
                    rotate:'45',
                    interval:0,
                    textStyle:{
                        color:'#919191',
                      fontSize:'12'
                  }
                },
                data: xData   //横坐标数据,
            },
            yAxis: {
               // type: 'value',
                show:false
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
    canvesShow = (index)=>{
        console.log(index)

        // 基于准备好的dom，初始化echarts实例
       /* let myChart = echarts.init(document.getElementById('main'),'westeros');
        let xData =[];//
        let seraiDataList = data.dataset;
        let seraiData = [];
        let dataArray =[];
        seraiDataList.map((item,i)=>{
            //xData.push(item.name.substring(0,item.name.length-2)) //横坐标
            xData.push(item.name) //横坐标
            dataArray.push(item.data[0].tradeMoney);
        })*/
        //param.data = dataArray;
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
export  default  UnitCount
