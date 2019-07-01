import  React,{Component} from 'react'
import {fmoney} from '../../utils/commons'
import  Header from '../common/header/header'
class  AccountDetail extends  Component{

    //渲染之前进行加载
    componentWillMount(){
    }

    render(){

        let accountDetail =  sessionStorage.getItem("accountDetail");
        if(accountDetail ==null ){
            return(
                <div>未查询到数据</div>
            )
        }

        let obj = JSON.parse(accountDetail)
        return(
            <div>
                <Header titleName={'账户详情'}/>
                <div   style={{paddingTop:'45px',  minHeight: document.documentElement.clientHeight-45,overflowY:'hidden'}}>
                    <table >
                        <tbody>
                        <tr>
                            <td  align="left" style={{width:"40%"}}>开户单位:</td>
                            <td align="right" style={{width:"60%"}}>{obj.unitName}</td>
                        </tr>
                        <tr>
                            <td align="left">账号:</td>
                            <td align="right" >{obj.accountCode}</td>
                        </tr>
                        <tr>
                            <td align="left">账户名称:</td>
                            <td align="right" >{obj.accountName}</td>
                        </tr>
                        <tr>
                            <td align="left">开户行:</td>
                            <td align="right" >{obj.bankName}</td>
                        </tr>
                        <tr>
                            <td align="left">银行类别:</td>
                            <td align="right" >{obj.typeName}</td>
                        </tr>
                        <tr>
                            <td align="left">银企直连:</td>
                            <td align="right" >{obj.directBank ==1?'启用':'禁用'}</td>
                        </tr>
                        <tr>
                            <td align="left">币别:</td>
                            <td align="right" >{obj.currencyName}</td>
                        </tr>
                        <tr>
                            <td align="left">余额日期:</td>
                            <td align="right" >{obj.queryTime}</td>
                        </tr>
                        <tr>
                            <td align="left">账户余额:</td>
                            <td align="right" >{fmoney(obj.remainMoney,2)}</td>
                        </tr>
                        <tr>
                            <td align="left">可用余额:</td>
                            <td align="right" >{fmoney(obj.usableMoney,2)}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}





export  default AccountDetail