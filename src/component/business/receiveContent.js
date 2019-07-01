import  React ,{Component} from 'react'
import '../../assets/css/table.css'
//详情页收款方
class ReceiveContent extends  Component{

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
                <td align="left" style={{width:"40%"}}>收款账户：</td>
                <td align="right" style={{width:"60%"}}>{obj.receiveAccount}</td>
            </tr>
            <tr>
                <td align="left">收款户名：</td>
                <td align="right" >{obj.receiveName}</td>
            </tr>
            <tr>
                <td align="left">收款联行号：</td>
                <td align="right" >{obj.receiveBankType}</td>
            </tr>
            <tr>
                <td align="left">收款开户行：</td>
                <td align="right" >{obj.receiveBank}</td>
            </tr>
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
                <td align="left" style={{width:"40%"}}>员工工资：</td>
                <td align="right" style={{width:"60%"}}>{obj.unitName}</td>
            </tr>
            <tr>
                <td align="left">金额(小写)：</td>
                <td align="right" >{obj.payerAccount}</td>
            </tr>
            <tr>
                <td align="left">金额(大写)：</td>
                <td align="right" >{obj.payerName}</td>
            </tr>
            <tr>
                <td align="left">备注：</td>
                <td align="right" >{obj.payerBank}</td>
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
                <td align="left" style={{width:"40%"}}>子账号：</td>
                <td align="right" style={{width:"60%"}}>{obj.relationAccount}</td>
            </tr>
            <tr>
                <td align="left">子账号户名：</td>
                <td align="right" >{obj.relationName}</td>
            </tr>
            <tr>
                <td align="left">开户行：</td>
                <td align="right" >{obj.relationBank}</td>
            </tr>
            <tr>
                <td align="left">所在省市：</td>
                <td align="right" >{obj.relationCityName ==obj.relationProvinceName?obj.collectProvinceName:obj.relationProvinceName+"-"+obj.relationCityName}</td>
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
                <td align="left" style={{width:"40%"}}>收款账号：</td>
                <td align="right"style={{width:"60%"}}>{obj.relationAccount}</td>
            </tr>
            <tr>
                <td align="left">收款户名：</td>
                <td align="right" >{obj.relationName}</td>
            </tr>
            <tr>
                <td align="left">收款开户行：</td>
                <td align="right" >{obj.relationBank}</td>
            </tr>
            <tr>
                <td align="left">收款方省市：</td>
                <td align="right" >{obj.relationCityName ==obj.relationProvinceName?obj.collectProvinceName:obj.relationProvinceName+"-"+obj.relationCityName}</td>
            </tr>
            </tbody>
        </table>
    )
}

export  default ReceiveContent