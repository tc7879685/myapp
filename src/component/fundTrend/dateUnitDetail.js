/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React,{Component} from 'react'
import  {connect} from 'react-redux'
import  {withRouter} from 'react-router-dom'
import { SearchBar, Button,Checkbox,Toast,Modal,ListView} from 'antd-mobile';
import API from "../../api/api";
import  {removeArray,fmoney} from '../../utils/commons'
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

class DateUnitDetail extends React.Component {
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
    querytodoList = async (pageIndex) =>{
        const billCode = this.props.match.params.busiCode;
        const billType = this.props.match.params.billType;
        var param = {
            page: pageIndex,
            rows: NUM_ROWS,
            busiCode:billCode,
            busiFlag:billType
        }
        let todoList =  await API.queryCurrenttodoList(param);
        if(pageIndex == 1){
            this.rData = genData(pageIndex,todoList.length);
        }else{
            this.rData = { ...this.rData, ...genData(pageIndex,todoList.length)};
        }
        pageIndex++;
        this.setState({
            data:todoList,
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
            pageIndex:pageIndex
        })
    }

    //点击审批
    submitPass =async (value)=>{
        if(selected.length == 0){
            Toast.fail("请至少选择一条单据!",3)
            return
        }
        let param = {
            billCode:selected.join(','),
            auditOpinion:value
        }

        Toast.loading("审核中,请稍后...")
        let result =   await API.passSubmit(param);
        Toast.hide()//关闭
        let rows =  result.rows;
        if(rows.length>0){
            let message ="";
            rows.map((item,i)=>{
                if(item.code =="0"){
                    message += item.billCode+"-"+item.message+"\n";
                }else{
                    message += item.billCode+"-"+item.message+"\n";
                }
            })
            alert("提示",message,[ {text: '确认', onPress: () => {
                    const dataSource = new ListView.DataSource({
                        rowHasChanged: (row1, row2) => row1 !== row2,
                    });
                    selected = [];
                    this.setState({
                        dataSource:dataSource
                    })
                    this.querytodoList(1)
                }}]);
        }else {
            alert("提示",'审核失败!',[ {text: '确认', onPress: () => console.log('cancel')}]);
        }
    }
    //点击打回
    submitBack = async(value)=>{
        if(selected.length == 0){
            Toast.fail("请至少选择一条单据!",3)
            return
        }
        let param = {
            billCode:selected.join(','),
            auditOpinion:value
        }
        if(value == ""){
            Toast.fail("打回建议不能为空!",3)
            return
        }
        Toast.loading("打回中,请稍后...")
        let result =   await API.backSubmit(param);
        Toast.hide()//关闭
        let rows =  result.rows;
        if(rows.length>0 ){
            let message ="";
            rows.map((item,i)=>{
                if(item.code =="0"){
                    message += item.billCode+"-"+item.message+"\n";
                }else{
                    message += item.billCode+"-"+item.message+"\n";
                }
            })
            alert("提示",message,[ {text: '确认', onPress: () => {
                    const dataSource = new ListView.DataSource({
                        rowHasChanged: (row1, row2) => row1 !== row2,
                    });
                    selected = [];
                    this.setState({
                        dataSource:dataSource
                    })
                    this.querytodoList(1)

                }}]);
        }else {
            alert("提示",'打回失败!',[ {text: '确认', onPress: () => console.log('cancel')}]);
        }
    }

    //初始进入加载
    componentWillMount(){
        selected = [];//每次进来初始化为空
        this.querytodoList(1);
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
        if(this.state.data.length<10){
            this.setState({
                loadded:'我是有底线的'
            })
            return
        }
        this.setState({ isLoading: true });
        this.querytodoList(this.state.pageIndex);
    }
    //跳转到详情页面
    sendReRect(obj){
        this.props.history.push('/todoDetail/'+obj.billType+'/'+obj.billCode+'/'+obj.busiCode+'/'+1);
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
            dataArray = [];
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
                    <CheckboxItem     onChange={(e) => this.onChange(e,obj,rowID)}>
                        <div
                            style={{
                                lineHeight: '30px',
                                fontSize: 12,
                                display:'inline'
                            }}
                        >
                            {obj.billCode}  <span style={{float:"right"}}>{obj.tradeMoney ==undefined?"":fmoney(obj.tradeMoney,2)+"¥"} </span>
                        </div>
                    </CheckboxItem>
                    <div onClick={(e)=>{this.sendReRect(obj)} } data-id={obj.billCode} style={{ display: '-webkit-box', padding: '0px 0' }}>
                        {this.showBusiList(obj)}
                    </div>
                </div>
            );
        };
        return (
            <div>
                <SearchBar  className={'searchBar'} placeholder="Search" maxLength={8}></SearchBar>
                <ListView style={{paddingBottom:'40px',paddingTop:'44px'}}
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
                          scrollRenderAheadDistance={500}
                          onEndReached={this.onEndReached}
                          onEndReachedThreshold={10}
                />

                <div className={'footer'} >
                    <div
                        style={{
                            width:'100%',
                            fontSize: 12,
                            display:'inline',
                            textAlign:'center'
                        }}
                    >
                        <Button  onClick={()=>{
                            prompt('提示', '确认审核?', [
                                    { text: '取消', onPress: () => console.log('cancel') },
                                    { text: '确认', onPress: (value) => this.submitPass(value) },
                                ]
                                ,'default','',['审核意见'])
                        }} type="primary" size={'small'} inline style={{ marginRight: '4px',width:'40%' }}>审核通过</Button>
                        <Button onClick={()=>{
                            prompt('提示', '确认打回?', [
                                    { text: '取消', onPress: () => console.log('cancel') },
                                    { text: '确认', onPress: (value) => this.submitBack(value) },
                                ]
                                ,'default','',['审核意见'])
                        }} type="ghost" size={'small'} inline style={{ marginRight: '4px',width:'40%' }} className="am-button-borderfix">审核打回</Button>
                    </div>
                </div>
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

export  default  withRouter(connect(null,null)(DateUnitDetail))
