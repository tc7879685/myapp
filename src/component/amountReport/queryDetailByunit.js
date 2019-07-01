/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React,{Component} from 'react'
import  {connect} from 'react-redux'
import  {withRouter} from 'react-router-dom'
import { SearchBar,Checkbox,Modal,ListView} from 'antd-mobile';
import  Header from '../common/header/header'
import  NoData from '../common/noData/noData'
import  Loader from '../common/loader/loader'
import API from "../../api/api";
import  {fmoney} from '../../utils/commons'
import  '../../assets/css/table.css'
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
let paramObj;
class QueryDetailByunit extends React.Component{
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

        paramObj = {
            reportLevel: '0',
            currencyCode: 'CNY',
            unitUUID:'',
            accountUUID:'',
            reportStyle: '1',
            reportMonth: 0,
            beginDate: '2018-12-01',
            endDate: '2018-12-19',
            moneyStyle: 1,
            unitCode: '',
            showFlag: 2,
            queryDate: '2018-12-09'
        }
    }
    //查询当前页数据
    queryList = async (pageIndex) =>{
        var param = {
            page: pageIndex,
            rows: NUM_ROWS,
        }
        let newParam =  Object.assign(param,paramObj);
        let accountList =  await API.loadReortDetail(param);
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
            pageIndex:pageIndex
        })
    }

    //初始进入加载
    componentWillMount(){
        selected = [];//每次进来初始化为空
        let unitCode  =  this.props.match.params.unitCode;
        let obj = JSON.parse(sessionStorage.getItem('accountDetailInfo'))
        paramObj = {
            reportLevel: obj.reportLevel,
            currencyCode: obj.currencyCode,
            unitUUID:obj.unitUUID,
            accountUUID:'',
            reportStyle: '1',
            reportMonth: 0,
           /* beginDate: '2018-12-01',
            endDate: '2018-12-19',*/
            moneyStyle: 1,
            unitCode: unitCode,
            showFlag: 2,
            queryDate: obj.queryDate
        }

        this.queryList(1);
    }


    //下拉加载更多
    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        //当小于10行
        if(this.state.data.length<10){
            this.setState({
                loadded:'我是有底线的'
            })
            return
        }
        this.setState({ isLoading: true });
        this.queryList(this.state.pageIndex);
    }
    //跳转到详情页面
    sendReRect(obj){
        sessionStorage.setItem("queryDetailInfo",JSON.stringify(obj))
        this.props.history.push('/queryDetailInfo');
    }

    render() {
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
                    <div
                        style={{
                            lineHeight: '40px',
                            fontSize: 12,
                            paddingLeft:'20px',
                            borderBottom: '1px solid #F6F6F6'
                        }}
                    >
                        {obj.otherName}  <span style={{float:"right",paddingRight:'20px'}}>{obj.tradeMoney ==undefined?""
                            :obj.tradeSign==1?"-"+fmoney(obj.tradeMoney,2)
                            :"+"+fmoney(obj.tradeMoney,2)} </span>
                    </div>
                    <div onClick={(e)=>{this.sendReRect(obj)} } data-id={obj.billCode} style={{ display: '-webkit-box', display: 'flex', padding: '0px 0' }}>
                        <table className={'corlor888 padding0' }>
                            <tbody>
                            <tr>
                                <td align="left" style={{width:"40%"}}>{obj.accountName}</td>
                                <td align="right" style={{width:"60%"}}>{obj.tradeSummary}</td>
                            </tr>
                            <tr>
                                <td align="left">{obj.accountCode}</td>
                                <td align="right" >{obj.tradeTime.substring(0,11)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        };
        return (
            <div>
                <Header titleName={'单位明细'}/>
                {dataArray.length==0?<NoData/>:
                    <ListView
                        style={{paddingTop:'45px',  minHeight: document.documentElement.clientHeight-45,overflowY:'hidden'}}
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}
                        renderFooter={() => (<div style={{ padding: 10, textAlign: 'center' }}>
                            {this.state.isLoading ?(<Loadding/>) : this.state.loadded}
                        </div>)}
                        renderRow={row}
                        renderSeparator={separator}
                        className="am-list"
                        pageSize={4}
                        useBodyScroll
                        onScroll={() => { console.log('scroll'); }}
                        scrollRenderAheadDistance={100}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={10}
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

export  default  withRouter(connect(null,null)(QueryDetailByunit))