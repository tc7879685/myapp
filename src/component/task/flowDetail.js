import  React,{Component} from 'react'
import  API from '../../api/api'
import {Accordion,Modal} from 'antd-mobile'
import  Header from '../common/header/header'
import  {withRouter} from 'react-router-dom'
import  Loader from '../common/loader/loader'
import  BusiHeader from '../../component/business/busiHeader'
import PayerContent from "../business/payerContent";
import ReceiveContent from "../business/receiveContent";
import PaymentInfor from "../business/paymentInfor";
import Process from "../business/process";
import './css/todoDetail.css'
const alert = Modal.alert;
const  prompt =  Modal.prompt;
class  TodoDetail extends  Component{

    state ={
        isLoading:true,
    }

    //查询单据明细信息
    queryTodoDetail =  async (param)=>{
        let row  =  await API.querydetail(param);
        this.setState({
            isLoading:false,
            detalRow:row
        })
    }
    //渲染之前进行加载
    componentWillMount(){
        let  busiCode = this.props.match.params.busiCode;//业务编号
        let  billCode = this.props.match.params.billCode;//单据编号
        let  billType = this.props.match.params.billType;//单据类型
        let  auditStatus = this.props.match.params.auditStatus; //是否为审核界面
        let param ={
            busiCode:busiCode,
            billCode:billCode,
            billType:billType,
            auditStatus:auditStatus
        }
        switch (parseInt(billType)){
            case 1://转账支付类型，包含重新支付
                param.id =0
                param.code = busiCode
                break
            case 2://员工工资
                param.id =0
                param.code = busiCode
                break
            case 3://员工报销
                param.id =0
                param.code = busiCode
                break
            case 5://资金归集
                param.id =0
                param.allocateType = 0
                param.code = busiCode
                break;
            case 6://资金下拨
                param.id =0
                param.allocateType = 1
                param.code = busiCode
                break
            case 7://头寸调拨
                param.id =0
                param.allocateType = 2
                param.code = busiCode
                break
            default:
                break;
        }
        this.queryTodoDetail(param);
    }

    render(){
        if(this.state.isLoading){
            return (
                <div className='site-loader'>
                    <Loader/>
                </div>
            )
        }
        let obj = this.state.detalRow
        return(
            <div>
                <Header titleName={'单据明细'} />
                <div style={{paddingTop:'45px'}}>
                    <div><BusiHeader obj={obj} /></div>
                    <div className={'divClear'}>
                        {(obj.busiCode==5||obj.busiCode==6)?"总账户信息":"付款方"}
                    </div>
                    <div><PayerContent obj={obj} /></div>
                    <IsShowRecive  obj={obj} /> {/*判断是否由收款方*/}
                    <div className={'divClear'}>支付信息</div>
                    <div><PaymentInfor  obj={obj} /></div>
                    {/* <div className={'divClear'}>单据流转信息</div>*/}
                    <div className={'zhedieProcess'}>
                        <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
                            <Accordion.Panel header="单据流转信息" className="pad">
                                <Process obj={obj} />
                            </Accordion.Panel>
                        </Accordion>
                    </div>
                </div>
            </div>
        )
    }
}

//员工工资和报销无收款方
export  const  IsShowRecive = (props)=>{
    let obj = props.obj;
    if(obj.busiCode=="2"||obj.busiCode=="3"){
        return ""
    }else{
        return(
            <div>
                <div className={'divClear'}>{(obj.busiCode==5||obj.busiCode==6)?'子账户信息':'收款方'}</div>
                <div><ReceiveContent obj={obj}/></div>
            </div>
        )
    }
}




export  default withRouter(TodoDetail)
