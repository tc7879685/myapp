/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React,{Component} from 'react'
import  {connect} from 'react-redux'
import  {withRouter} from 'react-router-dom'
import {  Button,Checkbox,Toast,Modal,ListView,Drawer,NavBar,Icon} from 'antd-mobile';
import API from "../../api/api";
import NoData from "../common/noData/noData";
import  Loader from '../common/loader/loader'
import {fmoney, isNotEmpty} from '../../utils/commons'
import  '../../assets/css/table.css'
import {List} from "antd-mobile/lib/index";
const Item = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
const alert = Modal.alert;
const  prompt =  Modal.prompt;
const NUM_ROWS = 10;
//let pageIndex = 1;
let selected = [];//选中的数据
//组装参数
function genData(pIndex,rows) {
    const dataBlob = {};
    for (let i = 0; i < rows; i++) {
        const ii = ((pIndex-1) * NUM_ROWS) + i;
        dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
}

class UnitLabel extends Component {
    //初始化
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        let objItem = JSON.parse(sessionStorage.getItem("fundTrendItem"));
        this.state = {
            dataSource:dataSource,
            isLoading: true,
            loadded :"加载完成",   //第一页
            countMoney:0.00
        };
        //this.state =  Object.assign( this.state,objItem);

    }
    //查询当前页数据
    queryAccountList = async (pageIndex,obj) =>{
        let objItem = JSON.parse(sessionStorage.getItem("fundTrendItem"));
       // let objAttr = this.state;
        const code = this.props.match.params.code;
        var param = {
            page: pageIndex,
            rows: NUM_ROWS,
            accountCode:'',
            accountName:'',
            beginDate:objItem.beginDate,
            endDate:objItem.endDate,
            bankType:'', //银行类别
            currencyUUID:objItem.currencyCode,
            reportLevel:objItem.reportLevel,
            reportStyle: 1,
            reportMonth: 1,
            moneyStyle:1
        }
        if(objItem.reportLevel ==3){ //单位
            param.unitLabel = code
        }else  if(objItem.reportLevel ==4){ //账号标签
            param.accountLabel = code
        }
        if(isNotEmpty(obj)){
            param =   Object.assign(param,obj)
        }
        let result =  await API.queryDataDetailList(param);
        let accountList= result.rows;

        if(pageIndex == 1){
            this.rData = genData(pageIndex,accountList.length);
        }else{
            this.rData = { ...this.rData, ...genData(pageIndex,accountList.length)};
        }
        pageIndex++;
        this.setState({
            data:accountList,
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
            pageIndex:pageIndex,
            total:result.total
        })
    }

    //初始进入加载
    componentWillMount(){
        selected = [];//每次进来初始化为空
        this.queryAccountList(1);
    }


    //下拉加载更多
    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        //当小于10行
        if(this.state.data.length<10 ||((this.state.pageIndex-2)*NUM_ROWS+this.state.data.length>=this.state.total)){
            this.setState({
                loadded:'我是有底线的'
            })
            return
        }
        this.setState({ isLoading: true });
        let obj = this.state.objParam;
        this.queryAccountList(this.state.pageIndex,obj);
    }
    //跳转到详情页面
    sendReRect(item){
        let objItem = JSON.parse(sessionStorage.getItem("fundTrendItem"));
        objItem.countValue = item.tradeMoney;
        sessionStorage.setItem("fundTrendItem",JSON.stringify(objItem))
        this.props.history.push('/queryList/'+item.unitCode)
    }

    //打开抽屉
    onOpenChange = (...args) => {
        console.log(111);
        this.setState({ open: !this.state.open });
    }

    //点击确定
    submitQuery =(obj)=>{
        //重新查询，重一开始
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        selected = [];
        this.setState({
            dataSource:dataSource,
            objParam:obj
        })
        this.queryAccountList(1,obj);
        this.setState({ open: !this.state.open });
    }
    //点击取消
    canelQuery = (e)=>{
        this.setState({ open: !this.state.open });
    }

    render() {
        let objItem = JSON.parse(sessionStorage.getItem("fundTrendItem"));
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        let dataArray = this.state.data
        if(dataArray == undefined ){
            return (<Loader/>)
        }
        let index = dataArray.length - 1;
        let countMoney = 0.00;//总金额
        //开始渲染单行
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = dataArray.length - 1;
            }
            const obj = dataArray[index--];
            countMoney += parseFloat(obj.remainMoney);
            return (

                <div    key={rowID}  style={{ padding: '0 0px' }}>
                    {objItem.reportLevel ==3?(
                        <Item key={rowID}
                              arrow="horizontal"
                              multipleLine
                              onClick={() => {this.sendReRect(obj)}}
                        >
                            <table valign="top" style={{padding:'0px'}}>
                                <tbody>
                                <tr>
                                    <td  align="left" style={{width:"60%"}}>{obj.unitName}</td>
                                    <td align="right" style={{width:"40%"}}>合计：</td>
                                </tr>
                                <tr>
                                    <td align="left">{obj.tradeTime}</td>
                                    <td align="right" >{fmoney(obj.tradeMoney,2)}</td>
                                </tr>
                                </tbody>
                            </table>
                        </Item>
                    ):
                        (
                            <Item key={rowID}
                            >
                                <table valign="top" style={{padding:'0px'}}>
                                    <tbody>
                                    <tr>
                                        <td  align="left" style={{width:"60%"}}>{obj.unitName}</td>
                                        <td align="right" style={{width:"40%"}}>合计：</td>
                                    </tr>
                                    <tr>
                                        <td align="left">{obj.tradeTime}</td>
                                        <td align="right" >{fmoney(obj.tradeMoney,2)}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </Item>
                        )
                    }

                </div>
            );
        };
        return (
            <div>
                {/*  <SearchBar  className={'searchBar'} placeholder="Search" maxLength={8}></SearchBar>*/}
                <div style={{position:'fixed',width: '100%',zIndex:'2'}}>
                    <div className={''}>
                        <NavBar
                            icon={<Icon type="left" />}
                            onLeftClick={()=>{this.props.history.goBack()}}
                        >余额单位明细</NavBar>
                    </div>
                    <div
                        style={{height:'75px'}}
                    >
                        <table style={{}}>
                            <tbody>
                            <tr>
                                <td align="left">{objItem.typeNameShow}</td>
                                <td  align="right">合计：</td>
                            </tr>
                            <tr>
                                <td align="left">{objItem.beginDate}</td>
                                <td align="right">{objItem.countValue}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                { dataArray.length==0?<NoData/>:
                    <ListView style={{paddingTop:'120px',height:document.documentElement.clientHeight}}
                              ref={el => this.lv = el}
                              dataSource={this.state.dataSource}
                              renderFooter={() => (<div style={{ padding: 10, textAlign: 'center' }}>
                                  {this.state.isLoading ?(<Loadding/>) : this.state.loadded}
                              </div>)}
                              renderRow={row}
                              renderSeparator={separator}
                              className="am-list"
                              pageSize={4}
                              useBodyScroll={false}
                              onScroll={() => { console.log('scroll'); }}
                              scrollRenderAheadDistance={100}
                              onEndReached={this.onEndReached}
                              onEndReachedThreshold={50}
                    />
                }


            </div>

        );
    }
}
export const  Loadding = ()=> {
    return(
        <div>加载中....</div>
    )
}

export  default  withRouter(connect(null,null)(UnitLabel))