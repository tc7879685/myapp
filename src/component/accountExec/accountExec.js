/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React,{Component} from 'react'
import {ListView} from 'antd-mobile';
import  Header from '../common/header/header'
import API from "../../api/api";
import  Loader from '../common/loader/loader'
import  '../../assets/css/table.css'
const NUM_ROWS = 10;
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

class AccountExec extends Component {
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
    queryuserAccountList = async (pageIndex) =>{

        const userUUID = this.props.match.params.userUUID;
        var param = {
            page: pageIndex,
            rows: NUM_ROWS,
            userUUID: userUUID
        }
        let result   =  await API.queryUserAccount(param);
        let  userAccountList = result.rows;
        if(pageIndex == 1){
            this.rData = genData(pageIndex,userAccountList.length);
        }else{
            this.rData = { ...this.rData, ...genData(pageIndex,userAccountList.length)};
        }
        pageIndex++;
        this.setState({
            data:userAccountList,
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
            pageIndex:pageIndex,
            totle:result.totle
        })
    }

    //初始进入加载
    componentWillMount(){
        selected = [];//每次进来初始化为空
        this.queryuserAccountList(1);
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
        this.queryuserAccountList(this.state.pageIndex);
    }
    //跳转到详情页面
    sendReRect(obj){
        sessionStorage.setItem("accountDetail",JSON.stringify(obj))
        this.props.history.push('/accountDetail');
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
                    <div
                       /* onClick={(e)=>{this.sendReRect(obj)} }*/
                        data-id={obj.billCode}
                        style={{ display: 'flex', padding: '0px 0' }}>
                        <table>
                            <tbody>
                            <tr>
                                <td align="left" style={{width:"40%"}}>开户单位：</td>
                                <td align="right" style={{width:"60%"}}>{obj.unitName}</td>
                            </tr>
                            <tr>
                                <td align="left">账号：</td>
                                <td align="right" >{obj.accountCode}</td>
                            </tr>
                            <tr>
                                <td align="left">账户名称：</td>
                                <td align="right" >{obj.accountName}</td>
                            </tr>
                            <tr>
                                <td align="left">开户行：</td>
                                <td align="right" >{obj.depositName}</td>
                            </tr>
                            <tr>
                                <td align="left">授权账号：</td>
                                <td align="right" >{obj.authMark=="1"?"查询，转账":"查询"}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        };
        return (
            <div>
                <Header titleName={'授权账号'}/>
                <ListView
                    style={{paddingTop:'45px'}}
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
            </div>

        );
    }
}
export const  Loadding = ()=> {
    return(
        <div>加载中....</div>
    )
}

export  default AccountExec
