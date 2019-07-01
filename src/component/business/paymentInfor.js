import  React ,{Component} from 'react'
import '../../assets/css/table.css'
import {fmoney} from '../../utils/commons'

//支付信息
class PaymentInfor extends  Component{
    showHtml = (obj)=>{
        let busiCode = parseInt(obj.busiCode);
        switch (busiCode){
            case 1://转账支付类型，包含重新支付
            case 8:
                return(<PayDetail obj={obj} />)
            case 2://员工工资
                return( <SalaryOrReimDetail obj={obj} />)
            case 3://员工报销
                return( <SalaryOrReimDetail obj={obj} />)
                break;
            case 5://资金归集
            case 6://资金下拨
            case 7://头寸调拨
                return( <CollectOrAllocateDetail obj={obj} />)
                break;
            default:
                /*return( <CommonHmlDetail obj={obj} />)*/
                break;
        }

    }

    render(){
        let obj = this.props.obj;
        return(
            <div>
                {this.showHtml(obj)}
            </div>

        )
    }
}

function  showSubject(obj){
    if(obj.subjectList){
        obj.subjectList.map((item,i)=>{
            return (
                <tr>
                    <td>计划科目：</td>
                    <td>{item.subjectName+'('+fmoney(item.tradeMoney,2)}</td>
                </tr>
            )
          /*  trArray.push('<tr>')
            trArray.push(' <td>计划科目：</td>')
            trArray.push('<td>'+item.subjectName+'('+fmoney(item.tradeMoney,2)+')'+'</td>')
            trArray.push('</tr>')*/
        })
    }

}

//转账支付明细
export  const  PayDetail = (props)=>{
    let obj = props.obj;
    const  showSubject = obj.subjectList==undefined?"": obj.subjectList.map((item, i) => {
        if( obj.subjectList.length<=1){
            return (
                <tr>
                    <td align="left">计划科目：</td>
                    <td align="right">{item.subjectName}</td>
                </tr>
            )
        }else{
            return (
                <tr>
                    <td align="left">计划科目：</td>
                    <td align="right">{item.subjectName + '(' + fmoney(item.tradeMoney, 2)+')'}</td>
                </tr>
            )
        }

    })
    return(
        <div>

        <table>
            <tbody>
            {obj.subjectList==undefined?'':showSubject}
            <tr>
                <td align="left">币别：</td>
                <td align="right" >{obj.currencyName}</td>
            </tr>
            <tr>
                <td align="left">金额（小写）：</td>
                <td align="right" >{fmoney(obj.tradeMoney,2)}</td>
            </tr>
            <tr>
                <td align="left">金额（大写）：</td>
                <td align="right" >{obj.showMoney}</td>
            </tr>
            <tr>
                <td align="left">对公对私：</td>
                <td align="right" >{obj.privateFlagName}</td>
            </tr>
            <tr>
                <td align="left">是否加急：</td>
                <td align="right" >{obj.urgentFlagName}</td>
            </tr>
            <tr>
                <td align="left">用途：</td>
                <td align="right" >{obj.tradeUsage}</td>
            </tr>
            <tr>
                <td align="left">备注：</td>
                <td align="right" >{obj.tradeMemo}</td>
            </tr>
            {/*<tr>
                    <td align="left">附件：</td>
                    <td align="right" >{fmoney(obj.tradeMoney,2)}</td>
                </tr>*/}
            </tbody>
        </table>
        </div>
    )
}
//员工工资，员工报销
export  const  SalaryOrReimDetail = (props)=>{
    let obj = props.obj;
    let name = obj.busiCode =="2"?"工资日期":"报销日期"
    return(
        <table >
            <tbody>
            <tr>
                <td align="left" style={{width:"40%"}}>员工人数：</td>
                <td align="right" style={{width:"60%"}}>{obj.workerNumber}</td>
            </tr>
            <tr>
                <td align="left">币别：</td>
                <td align="right" >{obj.currencyName}</td>
            </tr>
            <tr>
                <td align="left">金额(小写)：</td>
                <td align="right" >{fmoney(obj.tradeMoney,2)}</td>
            </tr>
            <tr>
                <td align="left">金额(大写)：</td>
                <td align="right" >{obj.showMoney}</td>
            </tr>
            <tr>
                <td align="left">备注：</td>
                <td align="right" >{obj.tradeMemo}</td>
            </tr>
            </tbody>
        </table>
    )
}

//资金归集，资金下拨，头寸调拨
export  const  CollectOrAllocateDetail = (props)=>{
    let obj = props.obj;
    return(
        <table >
            <tbody>
            <tr>
                <td align="left" style={{width:"40%"}}>币别：</td>
                <td align="right" style={{width:"60%"}}>{obj.currencyName}</td>
            </tr>
            <tr>
                <td align="left" >金额(小写)：</td>
                <td align="right" >{fmoney(obj.tradeMoney,2)}</td>
            </tr>
            <tr>
                <td align="left">金额(大写)：</td>
                <td align="right" >{obj.showMoney}</td>
            </tr>
            <tr>
                <td align="left">用途/附言：</td>
                <td align="right" >{obj.tradeUsage}</td>
            </tr>
            <tr>
                <td align="left">备注：</td>
                <td align="right" >{obj.tradeMemo}</td>
            </tr>
            </tbody>
        </table>
    )
}

export  default PaymentInfor