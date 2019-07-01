import  React ,{Component} from 'react'
import '../../assets/css/table.css'
//详情页面上部分
class BusiHeader extends  Component{

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

//转账支付明细
export  const  PayDetail = (props)=>{
    let obj = props.obj;
    return(
        <table >
            <tbody>
            <tr>
                <td align="left" style={{width:"40%"}}>单据编号：</td>
                <td align="right" style={{width:"60%"}}>{obj.billCode}</td>
            </tr>
            <tr>
                <td align="left">业务类型：</td>
                <td align="right" >{obj.busiName}</td>
            </tr>
            <tr>
                <td align="left">计划支付日期：</td>
                <td align="right" >{obj.wishTime.substring(0,11)}</td>
            </tr>
            <tr>
                <td align="left">制单时间：</td>
                <td align="right" >{obj.createTime}</td>
            </tr>
            <tr>
                <td align="left">单据状态：</td>
                <td align="right" >{obj.statusName}</td>
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
                <td align="left" style={{width:"40%"}}>单据编号：</td>
                <td align="right" style={{width:"60%"}}>{obj.billCode}</td>
            </tr>
            <tr>
                <td align="left">业务类型：</td>
                <td align="right" >{obj.busiName}</td>
            </tr>
            <tr>
                <td align="left">{name}：</td>
                <td align="right" >{obj.salaryDate.substring(0,11)}</td>
            </tr>
            <tr>
                <td align="left">计划支付日期：</td>
                <td align="right" >{obj.wishTime.substring(0,11)}</td>
            </tr>
            <tr>
                <td align="left">制单时间：</td>
                <td align="right" >{obj.createTime}</td>
            </tr>
            <tr>
                <td align="left">单据状态：</td>
                <td align="right" >{obj.statusName}</td>
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
                <td align="left" style={{width:"40%"}}>单据编号：</td>
                <td align="right" style={{width:"60%"}}>{obj.billCode}</td>
            </tr>
            <tr>
                <td align="left">业务类型：</td>
                <td align="right" >{obj.busiName}</td>
            </tr>
            <tr>
                <td align="left">执行时间：</td>
                <td align="right" >{obj.wishTime}</td>
            </tr>
            <tr>
                <td align="left">制单时间：</td>
                <td align="right" >{obj.allocateTime}</td>
            </tr>
            <tr>
                <td align="left">单据状态：</td>
                <td align="right" >{obj.billStatusName}</td>
            </tr>
            </tbody>
        </table>
    )
}

export  default BusiHeader
