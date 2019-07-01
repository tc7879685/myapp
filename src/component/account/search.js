import  React,{Component} from 'react'
import { List,Tag,Button,Picker,InputItem,Calendar} from 'antd-mobile';
import { createForm } from 'rc-form';
import  API from '../../api/api'
import {fomartDate, parserDate} from "../../utils/commons";

let paramObj;
const now = new Date();
class  Search extends  Component{
    constructor(props){

        super(props);
        this.state = {
            open: false,
            unitArray:undefined,
            unitKey:'',
            accountArray:undefined,
            accountKey:'',
            bnakTypeArray:undefined,
            bankTypeKey:'',
            currencyArray:undefined,
            currencyKey:'',//币别
            show:false,//日历,
            startTime:'',
            endTime:''
        }

        paramObj ={
            unitUUID:'',
            accountCode:'',
            accountName:'',
            payerAccountName:'',
            bankTypeUUID:'',
            currencyUUID:'',
            queryFlag:'1',
        }
    }

    componentWillReceiveProps(nextProps) {
            if(this.state.show){
              /*  this.setState({
                    show:false
                })*/
            }
    }

    getQuery = async ()=>{
        let  accountInfo =   await API.loadAccount({ queryFlag:1,unitUUID:'',showAll:1});
        let bankTypeInfo =  await API.getBankType({ showAll:1,gainType:'typeCode'});
        let currencyInfo  =   await  API.getCurrency({showAll:1,showUUID:true}) //币别
        let unitInfo =   await  API.getUnitInfo({showAll:1})
          this.setState({
              unitArray:unitInfo,
              accountArray:accountInfo,
              bankTypeArray:bankTypeInfo,
              currencyArray:currencyInfo,
          })
         // let unitInfo =   await  API.getUnitInfo()
    }

    componentDidMount(){
        this.getQuery();
    }


    queryAccount = async (unit)=>{
        var param = {
            queryFlag:1,
            unitUUID:unit[0]==0?"":unit[0],
            showAll:1

        }
        let account =  await API.loadAccount(param);
        this.setState({
            unitKey: unit,
            accountKey:'',
            accountArray:account
        });
    }

    //选择单位
    onChangeUnit = (unit) => {
        let unitUUID  = unit[0]==0?"":unit[0]
        paramObj.unitUUID = unitUUID;
        //单位查询账号
        this.queryAccount(unit)
    };


    //选择银行类别
    onChangeBankType =(bankType)=>{
        paramObj.bankType = bankType[0]==0?"":bankType[0]
        this.setState({
            bankTypeKey:bankType
        });
    }

    //选择账号
    onChangeAccount = (account) => {
        paramObj.accountCode =  account[0]==0?"":account[0]
        this.setState({
            accountKey:account
        });

    };
    //选择币别
    onChangeCurrency=(currency)=>{
        paramObj.currencyUUID = currency[0]==0?"":currency[0]
        this.setState({
            currencyKey:currency
        });
    }
    submitS = (e)=>{
        let that = this.refs;
        let accountName =  that.accountName.props.value||'';
        paramObj.accountName=accountName
        this.props.submitQuery(paramObj)
    }
    renderBtn(zh, en, config = {}) {
        // config.locale = this.state.en ? enUS : zhCN;
        return (
            <List.Item arrow="horizontal"
                       onClick={() => {
                           document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
                           this.setState({
                               show: true,
                               config,
                           });
                       }}
            >
                {zh}  {this.state.startTime==''?(<InitDate />):<DateFill obj={this.state}/>}
            </List.Item>
        );
    }
    onConfirm = (startTime, endTime) => {
        console.log(startTime+','+endTime)
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        let beginDate = fomartDate(startTime);
        let endDate = fomartDate(startTime)
        paramObj.beginDate = beginDate
        paramObj.endDate = endDate
        this.setState({
            show: false,
            startTime:beginDate,
            endTime:endDate
        });
    }

    onCancel = () => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.setState({
            show: false,
            startTime: '',
            endTime: '',
        });
    }

    render(){
            const { getFieldProps } = this.props.form
            return(
                <form>
                <div className="tag-container">
                    <div className={'inputUnit'}>
                        <List renderHeader={() => ''} style={{width:'95%'}}>
                            <Picker
                                data={this.state.unitArray}
                                value={this.state.unitKey}
                                cols={1}
                                onChange={this.onChangeUnit}
                            >
                                <List.Item  key={1} arrow="horizontal">开户单位：</List.Item>
                            </Picker>
                           <Picker
                                data={this.state.bankTypeArray}
                                value={this.state.bankTypeKey}
                                cols={1}
                                onChange={this.onChangeBankType}
                            >
                                <List.Item key={2} arrow="horizontal">银行类别：</List.Item>
                            </Picker>
                            <Picker
                                data={this.state.accountArray}
                                value={this.state.accountKey}
                                cols={1}
                                onChange={this.onChangeAccount}
                            >
                                <List.Item key={2} arrow="horizontal">账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</List.Item>
                            </Picker>
                            <InputItem
                                {...getFieldProps('accountName')}
                                clear
                                placeholder=""
                                ref={'accountName'}
                                // onChange={(value)=>{paramObj.receiveName = value}}
                            >账户名称：</InputItem>
                           {/* <InputItem
                                {...getFieldProps('usage')}
                                clear
                                placeholder=""
                            >用途：</InputItem>*/}
                            <Picker
                                data={this.state.currencyArray}
                                value={this.state.currencyKey}
                                cols={1}
                                onChange={this.onChangeCurrency}
                            >
                                <List.Item key={4} arrow="horizontal">币&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</List.Item>
                            </Picker>
                            {this.renderBtn('查询日期：', 'Select Date Range (Shortcut)', {  type: 'one' })}
                        </List>
                    </div>
                    <div className={'btn_tag'}>
                        <Button  onClick={this.submitS} type="primary" size={'small'} inline style={{ marginRight: '4px',width:'40%' }}>确定</Button>
                        <Button onClick={this.props.canelQuery} type="ghost" size={'small'} inline style={{ marginRight: '4px',width:'40%' }} className="am-button-borderfix">取消</Button>
                    </div>
                </div>
                    <div className={'searchCalender'}>
                        <Calendar

                            {...this.state.config}
                            visible={this.state.show}
                            onCancel={this.onCancel}
                            onConfirm={this.onConfirm}
                            //onSelectHasDisableDate={this.onSelectHasDisableDate}
                            // getDateExtra={this.getDateExtra}
                            defaultDate={now}

                            minDate={parserDate('2000-01-01')}
                            maxDate={new Date}
                        />
                    </div>
                </form>
            )
    }
}

//选择时间
export  const  DateFill = (props)=>{
    let obj =  props.obj;
    return(
        <div style={{float:'right',color:'#888',fontSize:'14px'}}>{obj.startTime}</div>
    )

}
export  const  InitDate= ()=>{
    return(
        <div style={{float:'right',color:'#888',fontSize:'14px'}}>{fomartDate(new Date())}</div>
    )
}


export  default createForm()(Search)