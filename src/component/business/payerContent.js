import  React ,{Component} from 'react'
import '../../assets/css/table.css'
//详情页付款方
class PayerContent extends  Component{

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
                return( <CollectOrAllocateDetail obj={obj} />)
            case 7://头寸调拨
                return( <Toucun obj={obj} />)
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
//转账支付明细
export  const  PayDetail = (props)=>{
    let obj = props.obj;
    return(
        <table>
            <tbody>
            <tr>
                <td align="left" style={{width:"40%"}}>付款单位：</td>
                <td align="right" style={{width:"60%"}}>{obj.unitName}</td>
            </tr>
            <tr>
                <td align="left">付款账号：</td>
                <td align="right" >{obj.payerAccount}</td>
            </tr>
            <tr>
                <td align="left">付款户名：</td>
                <td align="right" >{obj.payerName}</td>
            </tr>
            <tr>
                <td align="left">付款开户行：</td>
                <td align="right" >{obj.payerBank}</td>
            </tr>
           {/* <tr>
                <td align="left">扣减余额：</td>
                <td align="right" >{obj.tradeMoney}</td>
            </tr>*/}
            </tbody>
        </table>
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
                <td align="left" style={{width:"40%"}}>付款单位：</td>
                <td align="right" style={{width:"60%"}}>{obj.unitName}</td>
            </tr>
            <tr>
                <td align="left">付款账号：</td>
                <td align="right" >{obj.accountCode}</td>
            </tr>
            <tr>
                <td align="left">付款户名：</td>
                <td align="right" >{obj.accountName}</td>
            </tr>
            <tr>
                <td align="left">付款开户行：</td>
                <td align="right" >{obj.depositName}</td>
            </tr>
            </tbody>
        </table>
    )
}

//资金归集，资金下拨
export  const  CollectOrAllocateDetail = (props)=>{
    let obj = props.obj;
    return(
        <table >
            <tbody>
            <tr>
                <td align="left" style={{width:"40%"}}>单位：</td>
                <td align="right" style={{width:"60%"}}>{obj.allocateUnitName}</td>
            </tr>
            <tr>
                <td align="left">总账号：</td>
                <td align="right" >{obj.collectAccount}</td>
            </tr>
            <tr>
                <td align="left">总账号户名：</td>
                <td align="right" >{obj.collectName}</td>
            </tr>
            <tr>
                <td align="left">开户行：</td>
                <td align="right" >{obj.collectBank}</td>
            </tr>
            <tr>
                <td align="left">所在省市：</td>
                <td align="right" >{obj.collectCityName ==obj.collectProvinceName?obj.collectProvinceName:obj.collectProvinceName+"-"+obj.collectCityName}</td>
            </tr>
            </tbody>
        </table>
    )
}

//头寸调拨
export  const  Toucun = (props)=>{
    let obj = props.obj;
    return(
        <table >
            <tbody>
            <tr>
                <td align="left" style={{width:"40%"}}>付款单位：</td>
                <td align="right" style={{width:"60%"}}>{obj.allocateUnitName}</td>
            </tr>
            <tr>
                <td align="left">付款账号：</td>
                <td align="right" >{obj.collectAccount}</td>
            </tr>
            <tr>
                <td align="left">付款户名：</td>
                <td align="right" >{obj.collectName}</td>
            </tr>
            <tr>
                <td align="left">付款开户行：</td>
                <td align="right" >{obj.collectBank}</td>
            </tr>
            <tr>
                <td align="left">付款方省市：</td>
                <td align="right" >{obj.collectCityName ==obj.collectProvinceName?obj.collectProvinceName:obj.collectProvinceName+"-"+obj.collectCityName}</td>
            </tr>
            </tbody>
        </table>
    )
}



export  default PayerContent