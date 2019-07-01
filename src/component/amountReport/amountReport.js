import  React,{Component} from 'react'
import { Drawer, Icon ,List,Picker} from 'antd-mobile';
import  API from '../../api/api'
import  {withRouter} from 'react-router-dom'
import   {connect} from 'react-redux'
import  Search from './search'
import  Loadding from '../common/loader/loader'
import  NoData from '../common/noData/noData'
import './css/amountReport.css'
import {fomartDate, getJSonArray, parserDate, getPreDate, getNextDate, getDifferDays} from '../../utils/commons'
import  {initData,changeDate,changeCurency,changeUnit} from '../../redux/Action/amountReport'
import CanverCount from "./canverCount";
import  FooterList from './footerList'

const Item = List.Item;
const Brief = Item.Brief;
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const  initEndDate = fomartDate(now);
const  dateArrays = [{label:"近七天",value:0,endDate:initEndDate,beginDate:getPreDate(initEndDate,7)},{label:"近一个月",'value':1,endDate:initEndDate,beginDate:getPreDate(initEndDate,30)}];
let unitArray =[];
const currencyValue = [{label:"人民币",value:'CNY'},{label:"港币",'value':'HKD'}];
let paramObj = {

}
class  AmountReport  extends  Component{


    constructor(){
        document.title='结算量分析表';
        super()
        this.state = {
            data:undefined,
        }
        let    dateTime = fomartDate(now)

    }
    componentWillReceiveProps(nextProps){
        let paramObj = nextProps.amountReportState;
        this.queryDataEle(paramObj); //查询数据
    }
    componentDidMount(){
        if(!this.props.amountReportState.currencyData){
            this.props.queryInitData();
        }else{
            let paramObj = this.props.amountReportState;
            this.queryDataEle(paramObj); //查询数据
        }

    }

    //查询数据
    queryDataEle = async (paramObj)=>{
        //默认参数
        let dateObj = getJSonArray(paramObj.dateArrays,'value',paramObj.dateKey);
        let param = {
            reportLevel: 0, //统计维度 0单位，1位为账号 (当前为默认只有一个单位)
            unitUUID:paramObj.unitUUID, //统计单位id
            accountUUID:'', //账号id
            reportStyle: paramObj.reportStyle, //展示周期,1每日，2每月
            reportMonth: paramObj.reportMonth, //每月第几日
            currencyCode: paramObj.currency, //币别，人命比：CNY,港币:HKD
            beginDate: dateObj.beginDate, //七天前
            endDate:dateObj.endDate,//默认当天
            moneyStyle: paramObj.moneyStyle ,//金额单位，1：元,2:万元，3:亿元,
            timeSelect:0 // 0代表近七天,1代表近一个月
        }
            let object = await  API.loadSettle(param);
             object = this.returnNewData(object); //更新新的obj
            this.setState({
                data:object,

           })
    }

    //返回新数据
    returnNewData =(object)=>{
        let graph = object.graph;
        let dataset = object.dataset;
        let dateArray = [];
        let dateBegin =  parserDate(graph.beginDate)
        let dateNum =  getDifferDays(graph.beginDate,graph.endDate)
        for(let m = 0;m<dateNum+1;m++){
            dateArray.push(getNextDate(dateBegin,m))
        }
        let newArray = [];
        dataset.map((valueItem,j)=>{
            let rarAy = [];
            for(let i=0;i<dateArray.length;i++){
                let tradeMoney = "";
                let code;
                for(let n=0;n<valueItem.data.length;n++){
                    if(dateArray[i] ==valueItem.data[n].tradTime){
                        tradeMoney = valueItem.data[n]["tradeMoney"]
                        break;
                    }else{
                        tradeMoney = "0.00"
                    }
                }
                rarAy.push({tradTime:dateArray[i] ,tradeMoney:tradeMoney,code:code})
            }
            newArray.push({name:valueItem.name,data:rarAy,code:valueItem.code})
        })
        let countData = [];
        if(newArray.length>0){
            for(let k = 0;k<newArray[0].data.length;k++){
                let countValue = 0;
                let codeArray = [];
                newArray.map((item,i)=>{
                    countValue +=  parseFloat(item.data[k].tradeMoney);
                    codeArray.push(item.code)
                })
                countData.push({tradTime:newArray[0].data[k].tradTime,tradeMoney:countValue,code:codeArray.join('')})
            }
        }
        object.countArray = countData;
        object.category = dateArray;
        object.dataset = newArray;
        return object;
    }

    //展示图形
    showHtml(obj){
        let paranObj = this.props.amountReportState;
        let objUnit = getJSonArray(paranObj.unitData,'value',paranObj.unitUUID)
        obj.titleName =objUnit.label
        //obj.unitUUID =
        return(
            <CanverCount    obj={obj}/>
        )
    }

    //打开抽屉
    onOpenChange = (...args) => {
        console.log(111);
        this.setState({ open: !this.state.open });
    }
    render(){
        const  {onChangeDate,onChangeCurency,onChangeUnit,amountReportState} = this.props;
        const sidebar = (
               <Search/>
        );
        let obj = this.state.data
        if(obj ==undefined){
            return(<Loadding/>)
        }
        return (<div>
            <div  className={'headerClass'}>
                <div style={{width:'10%',textAlign:'center'}} onClick={()=>{this.props.history.goBack()}}>
                    <Icon type="left" />
                </div>
                <div style={{width:'20%',textAlign:'center'}} >
                    <Picker
                        data={amountReportState.dateArrays}
                        value={[amountReportState.dateKey]}
                        cols={1}
                        onChange={onChangeDate}
                    >
                        <span>{getJSonArray(amountReportState.dateArrays,'value',amountReportState.dateKey).label}</span>
                    </Picker>
                </div>
                <div style={{width:'40%',textAlign:'center'}} >
                    <Picker
                        data={amountReportState.unitData}
                        value={[amountReportState.unitUUID]}
                        cols={1}
                        onChange={onChangeUnit}
                    >
                        <span>{getJSonArray(amountReportState.unitData,'value',amountReportState.unitUUID).label}</span>
                    </Picker>

                </div>
                <div style={{width:'30%',textAlign:'center'}}>
                    <Picker
                        data={amountReportState.currencyData}
                        value={[amountReportState.currency]}
                        cols={1}
                        onChange={onChangeCurency}
                    >
                        <span>{getJSonArray(amountReportState.currencyData,'value',amountReportState.currency).label}</span>
                    </Picker>
                </div>
            </div>
                {obj.dataset.length<=0?(<NoData/>):(
                    <Drawer
                        className="my-drawer"
                        style={{  minHeight: document.documentElement.clientHeight-45}}
                        enableDragHandle
                        contentStyle={{ color: '#A6A6A6', textAlign: 'center' }}
                        sidebar={sidebar}
                        position={"top"}
                        open={this.state.open}
                        onOpenChange={this.onOpenChange}
                    >
                        <div  style={{overflowY:'hidden'}}>
                            <div style={{overflowY:'hidden',height:'300px',borderBottom: '1px solid #ddd'}}>
                                {this.showHtml(obj)}
                            </div>
                            <div style={{overflowY:'auto',height:document.documentElement.clientHeight-45-300}}>
                                <FooterList paramObj={amountReportState} obj ={obj} />
                            </div>
                        </div>
                    </Drawer>
                )}
        </div>);
    }
}

function  mapState(state) {
    return {
        amountReportState:state.getIn(['amountReport']).toJS()
    }
}
function  mapDispatch(dispatch,ownProps) {
    return {
        queryInitData:()=>{
            dispatch(initData())
        },
        onChangeDate:(date)=>{
            dispatch(changeDate(date))
        },
        //选择单位
        onChangeUnit:(unit)=>{
            dispatch(changeUnit(unit))
        },
        onChangeCurency:(curency)=>{
            dispatch(changeCurency(curency))
        }
    }
}
export  default withRouter(connect(mapState,mapDispatch)(AmountReport))
