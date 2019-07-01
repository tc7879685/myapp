/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React,{Component} from 'react'
import  {connect} from 'react-redux'
import  {withRouter} from 'react-router-dom'
import {  Button,Checkbox,Toast,Modal,ListView,Drawer,NavBar,Icon} from 'antd-mobile';
import API from "../../api/api";
import NoData from "../common/noData/noData";
import  Loader from '../common/loader/loader'
import  Search from './search'
import {fmoney, isNotEmpty} from '../../utils/commons'
import  '../../assets/css/table.css'
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
const alert = Modal.alert;
const  prompt =  Modal.prompt;
const NUM_ROWS = 10;
let selected = [];//选中的数据
let total;//记录总数
//组装参数
function genData(pIndex,rows) {
    const dataBlob = {};
    for (let i = 0; i < rows; i++) {
        const ii = ((pIndex-1) * NUM_ROWS) + i;
        dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
}

class AccBalanceList extends React.Component {
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
    queryAccountList = async (pageIndex,obj) =>{
        const billCode = this.props.match.params.busiCode;
        const billType = this.props.match.params.billType;
        var param = {
            page: pageIndex,
            rows: NUM_ROWS,
            accountCode:'',
            accountName:'',
            statusCode:1,
            unitUUID:'',
            bankTypeUUID:'',
            currencyUUID:''
        }
        if(isNotEmpty(obj)){
            param =   Object.assign(param,obj)
        }
        let result =  await API.queryAccountList(param);
        let accountList = result.rows;
        total = result.total;
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
            total:result.totle
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
    sendReRect(obj){
        sessionStorage.setItem("accountDetail",JSON.stringify(obj))
        this.props.history.push('/accountDetail');
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
        const sidebar = (
            <Search canelQuery={(obj=>{this.canelQuery(obj)})}   submitQuery ={this.submitQuery.bind(this)} />
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
           return (<Loader/>)
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
                    {/*<div
                        style={{
                            lineHeight: '30px',
                            fontSize: 12,
                            display:'inline',
                            paddingLeft:'20px'
                        }}
                    >
                        {obj.billCode}  <span style={{float:"right",paddingRight:'25px'}}>{obj.tradeMoney ==undefined?"":fmoney(obj.tradeMoney,2)+"¥"} </span>
                    </div>*/}
                    <div onClick={(e)=>{this.sendReRect(obj)} } data-id={obj.billCode} style={{ display: '-webkit-box', padding: '0px 0' }}>
                        <table valign="top">
                            <tbody>
                            <tr>
                                <td  align="left" style={{width:"60%"}}>{obj.unitName}</td>
                                <td align="right" style={{width:"40%"}}>{obj.typeName}</td>
                            </tr>
                            <tr>
                                <td align="left">{obj.accountCode}</td>
                                <td align="right" >{obj.currencyName}</td>
                            </tr>
                            <tr>
                                <td align="left">{obj.queryTime}</td>
                                <td align="right" >{fmoney(obj.remainMoney,2)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        };
        return (
            <div>
              {/*  <SearchBar  className={'searchBar'} placeholder="Search" maxLength={8}></SearchBar>*/}
               <div className={''}>
                  <NavBar
                        icon={<Icon type="left" />}
                        onLeftClick={()=>{this.props.history.goBack()}}
                        rightContent={[
                            <Icon key="0" type="search" style={{ marginRight: '10px' }}
                                  onClick={this.onOpenChange} />,
                        ]}
                    >账户余额</NavBar>
               </div>
                <Drawer
                    className="my-drawer"
                    style={{minHeight: document.documentElement.clientHeight-45}}
                    enableDragHandle
                    contentStyle={{ minHeight:document.documentElement.clientHeight-45 }}
                    sidebar={sidebar}
                    position={"top"}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange}
                >
                    { dataArray.length==0?<NoData/>:
                        <ListView style={{paddingTop:'0',height:document.documentElement.clientHeight-45}}
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
                </Drawer>


            </div>

        );
    }
}
export const  Loadding = ()=> {
    return(
        <div>加载中....</div>
    )
}

export  default  withRouter(connect(null,null)(AccBalanceList))
