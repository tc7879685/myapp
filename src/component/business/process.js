import  React,{Component} from 'react'
import { Steps, WingBlank, WhiteSpace} from 'antd-mobile';
import  './css/process.css'
import '../../assets/css/table.css'
const Step = Steps.Step;
const step_fill = require('./file/step_fill.png')
const step_light = require('./file/step.png')
class Process  extends Component{

    render(){
        let obj = this.props.obj;
        let  dictateDetailListShow ="";
        let dictateDetailList =obj.dictateDetailList;
        if(dictateDetailList!=undefined && dictateDetailList.length>0){
            dictateDetailListShow =dictateDetailList.map((item,i)=>{
                let img = i==0?step_fill:step_light;
                return(
                    <Step key={i} title={item.operateType} icon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${img}) center center /  21px 21px no-repeat`
                        }}
                        />
                    } description={(<ShowLiuchengXU obj={item} />)} />
                )
            })
        }

        return(
            <WingBlank size="0.5g">
                <WhiteSpace />
                <Steps current={0}>
                    {dictateDetailListShow}
                </Steps>
            </WingBlank>
        )
    }

}

export  const  ShowLiuchengXU = (props)=>{
      let obj = props.obj;
        return(
            <table>
                <tbody>
                <tr>
                    <td align="left" style={{width:"40%"}}>处理时间：</td>
                    <td align="right" style={{width:"60%"}}>{obj.operateTime}</td>
                </tr>
                <tr>
                    <td align="left">处理信息：</td>
                    <td align="right" >{obj.operateInfo}</td>
                </tr>
                </tbody>
            </table>
        )
}
export  default  Process
