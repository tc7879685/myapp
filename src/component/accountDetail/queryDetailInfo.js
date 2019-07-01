import  React,{Component} from 'react'
import  Header from '../common/header/header'
import {fmoney} from '../../utils/commons'

class  QueryDetailInfo extends  Component{

    //渲染之前进行加载
    componentWillMount(){
    }

    render(){

        let accountDetail =  sessionStorage.getItem("queryDetailInfo");
        if(accountDetail ==null ){
            return(
                <div>未查询到数据</div>
            )
        }

        let obj = JSON.parse(accountDetail)
        return(
            <div>
                <Header titleName={'明细详情'}/>
                <div   style={{paddingTop:'45px',  minHeight: document.documentElement.clientHeight-45,overflowY:'hidden'}}>
                <table  >
                    <tbody>
                    <tr>
                        <td align="left" style={{width:"40%"}}>交易时间:</td>
                        <td align="right" style={{width:"60%"}}>{obj.tradeTime}</td>
                    </tr>
                    <tr>
                        <td align="left">收支标志:</td>
                        <td align="right" >{obj.tradeName}</td>
                    </tr>
                    <tr>
                        <td align="left">币别:</td>
                        <td align="right" >{obj.currencyName}</td>
                    </tr>
                    <tr>
                        <td align="left">金额:</td>
                        <td align="right" >{fmoney(obj.tradeMoney,2)}</td>
                    </tr>
                    <tr>
                        <td align="left">摘要:</td>
                        <td align="right" >{obj.tradeSummary}</td>
                    </tr>
                    <tr>
                        <td align="left">业务类型:</td>
                        <td align="right" >{obj.busiName==null?"":obj.busiName}</td>
                    </tr>
                    </tbody>
                </table>
                <div className={'divClear'}>本方信息</div>
                <table >
                    <tbody>
                    <tr>
                        <td align="left" style={{width:"40%"}}>开户单位:</td>
                        <td align="right" style={{width:"60%"}}>{obj.unitName}</td>
                    </tr>
                    <tr>
                        <td align="left">本方账号:</td>
                        <td align="right" >{obj.accountCode}</td>
                    </tr>
                    <tr>
                        <td align="left">本方户名:</td>
                        <td align="right" >{obj.accountName}</td>
                    </tr>
                    <tr>
                        <td align="left">本方开户行:</td>
                        <td align="right" >{obj.bankName}</td>
                    </tr>
                    </tbody>
                </table>
                <div className={'divClear'}>对方信息</div>
                <table >
                    <tbody>
                    <tr>
                        <td align="left" style={{width:"40%"}}>对方账号:</td>
                        <td align="right" style={{width:"60%"}}>{obj.otherAccount}</td>
                    </tr>
                    <tr>
                        <td align="left">对方户名:</td>
                        <td align="right" >{obj.otherName}</td>
                    </tr>
                    <tr>
                        <td align="left">对方开户行:</td>
                        <td align="right" >{obj.otherDeposit}</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}





export  default QueryDetailInfo