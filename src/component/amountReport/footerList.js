import  React,{Component} from 'react'
import { List} from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import {diff, fmoney} from "../../utils/commons";


const Item = List.Item;
const Brief = Item.Brief;

class FooterList extends  Component{
    constructor(props){
        super(props)
        this.state = {
            dataObj:props.obj
        }
    }
    componentWillReceiveProps(nextProps) {
        if(!diff(nextProps.obj,this.state.dataObj)){
            this.setState({
                dataObj:nextProps.obj
            })
        }
    }
    sendHtml = (unitCode,paramObj,time)=>{
        paramObj.queryDate = time;
        paramObj.currencyCode = paramObj.currency
        sessionStorage.setItem("accountDetailInfo",JSON.stringify(paramObj))
        this.props.history.push('/queryDetailByunit/'+unitCode)
    }
    render(){
        const  paramObj = this.props.paramObj;
        const  obj = this.props.obj;
        let countList =  obj.countArray;
        let showList =  countList.map((item,i)=>{
            let money = parseFloat(item.tradeMoney);
            return(
                    <Item key={i}
                          arrow="horizontal"
                          multipleLine
                          onClick={() => {this.sendHtml(item.code,paramObj,item.tradTime)}}
                    >
                    <table style={{padding:'0px'}}>
                        <tbody>
                        <tr>
                            <td align="left">{item.tradTime}</td>
                            <td align="right">{fmoney(item.tradeMoney,2)}</td>
                        </tr>
                        </tbody>
                    </table>
                </Item>
            )
        })

        return(
            <List renderHeader={() => (<div style={{textAlign:'left'}}>{obj.titleName}</div>)} className="my-list">
                {showList}
            </List>
        )

    }

}

export  default  withRouter(FooterList)