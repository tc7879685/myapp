import  React,{Component} from 'react'
import { Drawer,List,Picker,DatePicker,Icon} from 'antd-mobile';
import {connect} from 'react-redux'
import  API from '../../api/api'
import {withRouter} from 'react-router-dom'
import  Search from './search'
import  Loadding from '../common/loader/loader'
import  NoData from '../common/noData/noData'
import './css/fundTrend.css'
import  {initData,changeCurentcy,changeType,changeDate} from '../../redux/Action/fundTrend'
import {fomartDate, getJSonArray, fmoney, parserDate, getNextDate, getDifferDays} from '../../utils/commons'
import UnitCount from "./unitCount";

const moment = require('moment');
const Item = List.Item;
const Brief = Item.Brief;
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
let dateTime = moment().format();
let paramObj = {

}
class  FundTrend  extends  Component{

    constructor(props){
        super(props)
        this.state = {
            data:undefined,
        }
    }
    componentWillReceiveProps(nextProps){

        let paramObj = nextProps.fundTrendState;
        this.queryDataEle(paramObj); //查询数据
    }
    //查询数据
    queryDataEle = async (paramObj)=>{

        let param ={
            reportLevel:paramObj.reportLevel,//统计维度 0单位，1位为账号,2银行类别,3位单位标签
            unitUUID:'', //统计单位
            accountUUID:'', //账号id
            bankType:'',    //银行类别
            unitLabel:'',   //单位标签
            accountLabel:'',//账号标签
            accountNature:'', //账号标签值
            accountRevenue:'', //账户性质
            accountType:'', //账户种类
            reportStyle: 1, //展示周期,1每日，2每月
            reportMonth: 1, //每月第几日
            currencyCode:paramObj.currency, //币别，人命比：CNY,港币:HKD
            currencyUUID:'',
            beginDate: fomartDate(paramObj.date), //默认当天
            endDate: fomartDate(paramObj.date),//默认当天
            moneyStyle: 1 //金额单位，1：元,2:万元，3:亿元,
        }

            let object = await  API.loadYue(param)
            let data =   this.returnNewData(object);
            //查询下方账号。。（特殊情况）
            if(paramObj.reportLevel ==1){
                let paramAccount ={
                    beginDate: fomartDate(paramObj.date), //默认当天
                    endDate: fomartDate(paramObj.date),//默认当天
                    currencyUUID:getJSonArray(paramObj.currencyData,'value',paramObj.currency).idItem
                }
                let accountData =await API.queryAccountList(paramAccount)
                this.setState({
                    data:data,
                    accListData:accountData.rows
                })
            }else{
                this.setState({
                    data:data,
                })
            }




    }

    //返回新数据
    returnNewData =(object)=>{
        let dataset = object.dataset;
        let newArray = [];
        let countData = 0.00;
        dataset.map((item,i)=>{
            let countValue = 0;
            for(let k = 0;k<dataset[i].data.length;k++){
                countValue +=  parseFloat(item.data[k].tradeMoney);
            }
            item.countValue = fmoney(countValue,2);
            countData += countValue;
            newArray.push(item)
        })
        object.countArray = fmoney(countData,2);
        object.dataset = newArray;
        return object;
    }

    //展示图形
    showHtml(obj){
        obj.titleName = this.state.typeNameShow
        return(
            <UnitCount  obj={obj}/>
        )

    }
    componentDidMount(){
        if(!this.props.fundTrendState.currencyData){
            this.props.queryInitData();
        }else{
            let paramObj = this.props.fundTrendState;
            this.queryDataEle(paramObj); //查询数据
        }

    }
    //打开抽屉
    onOpenChange = (...args) => {
        console.log(111);
        this.setState({ open: !this.state.open });
    }

    showAccHtmlList = (obj)=>{
        return (
            <AccountList  item={obj}  />
        )
    }
    showHtmlList = (obj)=>{
        if(obj){
                return (
                    <UnitOrOtherList  item={obj} />
                )
        }

    }
    //列表明细
    sendHtml =(item)=>{
        let obj =  this.props.fundTrendState;
        let reportLevelName = getJSonArray(obj.reportLevelData,'value',obj.reportLevel).label;
        let currencyUUID = getJSonArray(obj.currencyData,'value',obj.currency).idItem;
        obj.typeNameShow = reportLevelName; //类别名称
        obj.countValue = item.countValue; //总额
        obj.currencyUUID = currencyUUID; //币别id
        let date = fomartDate(obj.date)
        obj.beginDate = date  //开始日期
        obj.endDate = date    //结束日期
        sessionStorage.setItem("fundTrendItem",JSON.stringify(obj))
       if(obj.reportLevel ==1){ //账号
            sessionStorage.setItem("accountDetail",JSON.stringify(item))
            this.props.history.push('/accountDetail');
        }else if(obj.reportLevel ==3 || obj.reportLevel==4){ //单位标签或者账号标签跳转
            this.props.history.push('/unitLabel/'+item.unitCode)
        }else{
            this.props.history.push('/queryList/'+item.unitCode)
        }

    }

    render(){
        const  {onChangeCurentcy,onChangeType,onChangeDate,fundTrendState}  = this.props
        // fix in codepen
        const sidebar = (
               <Search/>
        );
        let obj = this.state.data
        if(obj ==undefined){
            return(<Loadding/>)
        }
        let countYue = 0;
        let reportLevel = fundTrendState.reportLevel;
        let showList =  obj.dataset.map((item,i)=>{
            countYue +=parseFloat(item.data[0].tradeMoney);
            if(reportLevel =='1' && this.state.accListData){//账号
                return(
                    <Item key={i}
                        arrow="horizontal"
                        multipleLine
                        onClick={() => {this.sendHtml(this.state.accListData[i],reportLevel)}}
                    >
                        {this.showAccHtmlList(this.state.accListData[i])}
                    </Item>
                )
            }else{
                return(
                    <Item key={i}
                          arrow="horizontal"
                          multipleLine
                          onClick={() => {this.sendHtml(item,reportLevel)}}
                    >
                        {this.showHtmlList(item)}
                    </Item>
                )
            }
        })
            return (
                <div >
                    <div  className={'headerClass'}>
                        <div style={{width:'10%',textAlign:'center'}} onClick={()=>{this.props.history.goBack()}}>
                            <Icon type="left" />
                        </div>
                        <div style={{width:'25%',textAlign:'center'}} >
                            <DatePicker
                                mode="date"
                                title="选择时间"
                                extra="Optional"
                                value={fundTrendState.date}
                                onChange={onChangeDate}
                            >
                                <span >{fomartDate(fundTrendState.date)} </span>

                            </DatePicker>
                        </div>
                        <div style={{width:'40%',textAlign:'center'}} >
                            <Picker
                                data={fundTrendState.reportLevelData}
                                value={[fundTrendState.reportLevel]}
                                cols={1}
                                onChange={onChangeType}
                            >
                                <span>{getJSonArray(fundTrendState.reportLevelData,'value',fundTrendState.reportLevel).label}</span>
                            </Picker>

                        </div>
                        <div style={{width:'25%',textAlign:'center'}}>
                            <Picker
                                data={fundTrendState.currencyData}
                                value={[fundTrendState.currency]}
                                cols={1}
                                onChange={onChangeCurentcy}
                            >
                                <span>{getJSonArray(fundTrendState.currencyData,'value',fundTrendState.currency).label}</span>
                            </Picker>
                        </div>
                    </div>
                    {obj.dataset.length<=0?(<NoData/>):(
                        <Drawer
                            className="my-drawer fundTrend"
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
                                    <List renderHeader={() => (<div style={{textAlign:'right'}}>总金额:{fmoney(countYue)}</div>)} className="my-list">
                                        {showList}
                                    </List>
                                </div>
                            </div>
                        </Drawer>
                    )}

                </div>);
    }
}


//账户列表展示
export  const  AccountList =(props)=>{
    let item = props.item;
    return(
        <table style={{padding:'0px'}}  >
            <tbody>
            <tr>
                <td align="left" style={{width:"60%"}}>{item.accountCode}</td>
                <td align="right" style={{width:"40%"}}>{item.accountName}</td>
            </tr>
            <tr>
                <td align="left">{item.queryTime.substring(0,11)}</td>
                <td align="right">{fmoney(item.remainMoney,2)}</td>
            </tr>
            </tbody>
        </table>
    )
}
//其他方式展示
export  const  UnitOrOtherList =(props)=>{
    let item = props.item;
    return(
        <table style={{padding:'0px'}}>
            <tbody>
            <tr>
                <td align="left" style={{width:"60%"}}>{item.name}</td>
                <td align="right" style={{width:"40%",color:'#888888'}}>合计:</td>
            </tr>
            <tr>
                <td align="left">{item.data[0].tradTime}</td>
                <td align="right">{fmoney(item.countValue,2)}</td>
            </tr>
            </tbody>
        </table>
    )
}
function  mapState(state) {

        return{
            fundTrendState:state.getIn(['fundTrend']).toJS()
        }
}

function  mapDispatch(dispatch) {
    return {
        queryInitData:()=>{
            dispatch(initData())
        },
        //点击改变币别
        onChangeCurentcy:(currncy)=>{
            dispatch(changeCurentcy(currncy))
        },
        //切换类型
        onChangeType:(type)=>{
            dispatch(changeType(type))
        },
        //选择时间
        onChangeDate:(date)=>{
            dispatch(changeDate(date))
        }
    }
}


export  default withRouter(connect(mapState,mapDispatch)(FundTrend))
