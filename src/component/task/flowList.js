/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React,{Component} from 'react'
import  {connect} from 'react-redux'
import  {withRouter} from 'react-router-dom'
import {  Button,Checkbox,Toast,Modal,ListView,Drawer,NavBar,Icon} from 'antd-mobile';
import API from "../../api/api";
import NoData from "../common/noData/noData";
import  Loader from '../common/loader/loader'
import  Search from './search'
import {removeArray, fmoney, isNotEmpty} from '../../utils/commons'
import  '../../assets/css/table.css'
import  './css/todoList.css'
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

class FlowList extends React.Component {
    //初始化
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataSource:dataSource,
            isLoading: true,
            loadded :"加载完成",   //第一页

        };
    }
    //查询当前页数据
    queryFlowList = async (pageIndex,obj) =>{
        const billCode = this.props.match.params.busiCode;
        const billType = this.props.match.params.billType;
        var param = {
            page: pageIndex,
            rows: NUM_ROWS,
            busiCodes:billCode,
            busiFlag:billType
        }
        if(isNotEmpty(obj)){
            param =   Object.assign(param,obj)
        }
        let result =  await API.queryCurrentFlowList(param);
        let flowList = result.rows;
        if(pageIndex == 1){
            this.rData = genData(pageIndex,flowList.length);
        }else{
            this.rData = { ...this.rData, ...genData(pageIndex,flowList.length)};
        }
        pageIndex++;
        this.setState({
            data:flowList,
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
            pageIndex:pageIndex,
            totle:result.totle
        })
    }


    //初始进入加载
    componentWillMount(){
        selected = [];//每次进来初始化为空
        this.queryFlowList(1);
    }

    onChange = (e,obj,rowId) => {
        if(e.target.checked){
            selected.push(obj.billCode)
        }else{
            selected = removeArray(selected,obj.billCode)
        }
        console.log(selected)
    }

    //根据业务类型不同展示不同
    showBusiList = (obj)=>{
        let billType = obj.billType
        switch (billType){
            case 1://转账支付类型，包含重新支付
                return(<Pay obj={obj} />)
            case 2://员工工资
                return( <SalaryOrReim obj={obj} />)
            case 3://员工报销
                return( <SalaryOrReim obj={obj} />)
                break;
            case 5://资金归集
                return( <CollectOrAllocate obj={obj} />)
                break;
            case 6://资金下拨
                return( <CollectOrAllocate obj={obj} />)
                break;
            case 7://头寸调拨
                return( <Toucun obj={obj} />)
                break;
            default:
                return( <CommonHml obj={obj} />)
                break;
        }
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
        this.queryFlowList(this.state.pageIndex,obj);
    }
    //跳转到详情页面
    sendReRect(obj){
        this.props.history.push('/flowDetail/'+obj.billType+'/'+obj.billCode+'/'+obj.busiCode+'/'+1);
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
        this.queryFlowList(1,obj);
        this.setState({ open: !this.state.open });
    }
    //点击取消
    canelQuery = (e)=>{
        this.setState({ open: !this.state.open });
    }
    render() {

        const sidebar = (
            <Search canelQuery={(obj=>{this.canelQuery(obj)})}  billType={this.props.match.params.billType}  submitQuery ={this.submitQuery.bind(this)} />
        );

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
            return(<Loader/>)
        }
        let index = dataArray.length - 1;
        //开始渲染单行
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = dataArray.length - 1;
            }
            const obj = dataArray[index--];
            return (
                <div    key={rowID}  style={{ padding: '0 0px' }}>
                        <div
                            style={{
                                lineHeight: '40px',
                                fontSize: 14,
                                paddingLeft:'20px',
                                borderBottom: '1px solid #F6F6F6',
                                color:'#000'
                            }}
                        >
                            {obj.billCode}  <span style={{float:"right",paddingRight:'20px'}}>{obj.tradeMoney ==undefined?"":fmoney(obj.tradeMoney,2)} </span>
                        </div>
                    <div onClick={(e)=>{this.sendReRect(obj)} } data-id={obj.billCode} style={{  display: 'flex', padding: '0px 0' }}>
                        {this.showBusiList(obj)}
                    </div>
                </div>
            );
        };
        return (
            <div>
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={()=>{this.props.history.goBack()}}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '10px' }}
                              onClick={this.onOpenChange} />,
                    ]}
                >{sessionStorage.getItem('flow_titleName')}</NavBar>
                <Drawer
                    className="my-drawer"
                    style={{  minHeight: document.documentElement.clientHeight-45}}
                    enableDragHandle
                    contentStyle={{ color: '#A6A6A6',minHeight:document.documentElement.clientHeight-45 }}
                    sidebar={sidebar}
                    position={"top"}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange}
                >
                    {dataArray.length == 0 ? <NoData/> :
                        <ListView style={{height:document.documentElement.clientHeight-45}}
                                  ref={el => this.lv = el}
                                  dataSource={this.state.dataSource}
                                  renderFooter={() => (<div style={{padding: 10, textAlign: 'center'}}>
                                      {this.state.isLoading ? (<Loadding/>) : this.state.loadded}
                                  </div>)}
                                  renderRow={row}
                                  renderSeparator={separator}
                                  className="am-list"
                                  pageSize={4}
                                  onScroll={() => {
                                      console.log('scroll');
                                  }}
                                  scrollRenderAheadDistance={100}
                                  onEndReached={this.onEndReached}
                                  onEndReachedThreshold={10}
                        />
                    }
                </Drawer>
            </div>

        );
    }
}
//转账支付
export  const  Pay =(props)=>{
    let obj = props.obj;
    return(
        <table style={{ padding:'0px'}}>
            <tbody>
            <tr>
                <td align="right" style={{width:"30%"}}>所属单位:</td>
                <td align="left" style={{width:"70%"}}>{obj.unitName}</td>
            </tr>
            <tr>
                <td align="right">付款账号:</td>
                <td align="left" >{obj.payerAccount}</td>
            </tr>
            <tr>
                <td align="right">收款户名:</td>
                <td align="left" >{obj.receiveName}</td>
            </tr>
            <tr>
                <td align="right">用途:</td>
                <td align="left" >{obj.tradeUsage}</td>
            </tr>
            </tbody>
        </table>
    )
}
//员工工资,员工报销
export  const  SalaryOrReim=(props)=>{
    let obj = props.obj;
    return(
        <table style={{ padding:'0px'}}>
            <tbody>
            <tr>
                <td align="right" style={{width:"40%"}}>所属单位:</td>
                <td align="left" style={{width:"60%"}}>{obj.unitName}</td>
            </tr>
            <tr>
                <td align="right">付款账号:</td>
                <td align="left" >{obj.payerAccount}</td>
            </tr>
            <tr>
                <td align="right">员工人数:</td>
                <td align="left" >{obj.workerNumber}</td>
            </tr>
            <tr>
                <td align="right">计划支付日期:</td>
                <td align="left" >{obj.wishTime.substring(0,11)}</td>
            </tr>
            </tbody>
        </table>
    )
}
//资金归集,资金下拨
export  const  CollectOrAllocate=(props)=>{
    let obj = props.obj;
    return(
        <table style={{ padding:'0px'}}>
            <tbody>
            <tr>
                <td align="right" style={{width:"40%"}}>总账号:</td>
                <td align="left" style={{width:"60%"}}>{obj.collectAccount}</td>
            </tr>
            <tr>
                <td align="right">总账号户名:</td>
                <td align="left" >{obj.collectName}</td>
            </tr>
            <tr>
                <td align="right">子账号:</td>
                <td align="left" >{obj.relationAccount}</td>
            </tr>
            <tr>
                <td align="right">子账号户名:</td>
                <td align="left" >{obj.relationName}</td>
            </tr>
            <tr>
                <td align="right">用途:</td>
                <td align="left" >{obj.tradeUsage}</td>
            </tr>
            </tbody>
        </table>
    )
}

//头寸调拔
export  const  Toucun=(props)=>{
    let obj = props.obj;
    return(
        <table style={{ padding:'0px'}}>
            <tbody>
            <tr>
                <td align="right" style={{width:"40%"}}>付款账号:</td>
                <td align="left" style={{width:"60%"}}>{obj.collectAccount}</td>
            </tr>
            <tr>
                <td align="right">付款户名:</td>
                <td align="left" >{obj.collectName}</td>
            </tr>
            <tr>
                <td align="right">收款账号:</td>
                <td align="left" >{obj.relationAccount}</td>
            </tr>
            <tr>
                <td align="right">收款户名:</td>
                <td align="left" >{obj.relationName}</td>
            </tr>
            <tr>
                <td align="right">用途:</td>
                <td align="left" >{obj.tradeUsage}</td>
            </tr>
            </tbody>
        </table>
    )
}
//其他类型
export  const  CommonHml=(props)=>{
    let obj = props.obj;
    return(
        <table style={{ padding:'0px'}}>
            <tbody>
            <tr>
                <td align="right" style={{width:"40%"}}>所属单位:</td>
                <td align="left" style={{width:"60%"}}>{obj.unitName}</td>
            </tr>
            <tr>
                <td align="right">业务类型:</td>
                <td align="left" >{obj.busiName}</td>
            </tr>
            <tr>
                <td align="right">当前节点:</td>
                <td align="left" >{obj.taskName}</td>
            </tr>
            <tr>
                <td align="right">接收日期:</td>
                <td align="left" >{obj.createTime.substring(0,11)}</td>
            </tr>
            </tbody>
        </table>
    )
}
export const  Loadding = ()=> {
    return(
        <div>加载中....</div>
    )
}

export  default  withRouter(connect(null,null)(FlowList))