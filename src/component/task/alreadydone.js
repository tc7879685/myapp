import  React,{Component} from 'react'
import  {List,NavBar,Icon} from 'antd-mobile'
import  '../../assets/css/common.css'
import  NoData from '../common/noData/noData'
import  Loader from '../common/loader/loader'
import  {withRouter} from 'react-router-dom'
import  Header from '../common/header/header'
import  API from '../../api/api'
import  {listRemoveRepeat} from '../../utils/commons'
const Item = List.Item;
const Brief = Item.Brief;

class AlreadyDone extends  Component{
    state = {
        disabled: false,
        arrayData:undefined
    }
    fengeBillType(item,billTypeList,todoList) {
        switch (item.billType) {
            case  1: //转账支付
            case  2: //员工工资
            case  3: //员工报销
                item.type = 1;
                todoList.push(item)
                billTypeList.push({type: 1, name: '结算管理'})
                break;
            case  4:  //资金调拨
            case  5:  //资金归集
            case  6:  //资金下拨
            case  7:  //头寸调拨
                //流动性管理
                item.type = 2;
                todoList.push(item)
                billTypeList.push({type: 2, name: '流动性管理'})
                break;
          /*  case  10:
                //承诺汇票
                item.type = 3;
                todoList.push(item)
                billTypeList.push({type: 3, name: '承诺汇票'})
                break;
            case  90:
                //预算管理
                item.type = 4;
                todoList.push(item)
                billTypeList.push({type: 4, name: '预算管理'})
                break;
            case  99:
                //质押额度维护
                item.type = 5;
                todoList.push(item)
                billTypeList.push({type: 5, name: '质押额度维护'})
                break;*/
            default:
                break;
        }
    }

    queryAreadyDoneList = async ()=>{
        let rows =   await API.queryAlreadyList();
        let billTypeList = [];
        let todoList = [];
        let billTypeArray = [];
        for (let i = 0;i<rows.length;i++){
            this.fengeBillType(rows[i],billTypeList,todoList)
        }
        //去重
        billTypeList =  listRemoveRepeat(billTypeList,"type")
        this.setState({
            arrayData:todoList,
            billTypeList:billTypeList
        })
    }
    componentWillMount(){
        this.queryAreadyDoneList();
    }

    sendHtml(data){
        sessionStorage.setItem('already_titleName',data.busiName)
        this.props.history.push('/alreadyDoneList/'+data.busiCode+'/'+data.billType);//跳转到代办详情页
    }
    returnPngs(billType) {
        switch (billType) {
            case  1: //转账支付
                return require('./files/pay.png')
            case  2: //员工工资
                return require('./files/salary.png')
            case  3: //员工报销
                return require('./files/baoxiao.png')
            case  5:  //资金归集
                return require('./files/collect.png')
            case  6:  //资金下拨
                return require('./files/allocate.png')
            case  7:  //头寸调拨
                return require('./files/toucun.png')
            case  10:
                return require('./files/huipiao.png')
                //承诺汇票
                break;
            case  90:
                return require('./files/yusuan.png')
                //预算管理
                break;
            case  99:
                return require('./files/zhiya.png')
                //质押额度维护
                break;
            default:
                break;
        }
    }
    render() {
        let todoList = this.state.arrayData;
        let billTypeList = this.state.billTypeList;
        if(todoList == undefined){
            return (
                <div className='site-loader'>
                    <Loader/>
                </div>
            )
        }
        //生成里层
        let  showListItem = (type) =>(
            todoList.map((item,i)=>{
                if(item.type ==type) {
                    let img =  this.returnPngs(item.billType);
                    return(
                        <Item key={i}
                              arrow="horizontal"
                             // thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                              multipleLine
                              extra = {item.billNumber!=undefined?item.billNumber:""}
                              onClick={() => {
                                  this.sendHtml(item)
                              }}
                        >
                            <span style={{paddingRight:"10px"}}><img src={img}/></span> {item.busiName}
                        </Item>
                    )
                }
            })
        )
        //生成最外层
        let ListShow   = billTypeList.map((item,i)=>(
            <List renderHeader={() => (item.name)} className="my-list" key={i}>
                {showListItem(item.type)}
            </List>
        ))
        return (
            <div>
                <Header titleName={'已办事项'} />
                <div className="mine-list">
                    {todoList.length==0? <NoData/> :ListShow}
                </div>
            </div>
        );
    }
}




export  default withRouter(AlreadyDone)