import  React,{Component} from 'react'
import  {connect} from 'react-redux'
import { List,Tag,Button,Picker,InputItem,DatePickerView,Calendar } from 'antd-mobile';
import {parserDate,fomartDate} from '../../utils/commons'
import { createForm } from 'rc-form';
import {queryParam,setqueryParam,changeUnit,changeAccount,changeBillCode,changeRecive,changeReqCode} from "../../redux/Action/taskSearch";
// 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
    moneyKeyboardWrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}
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
            currencyKey:'',//币别
            show:false,//日历,
            startTime:'',
            endTime:''
        }

        paramObj ={
            billCode:'',
            unitUUID:'',
            payerAccountName:'',
            receiveName:'',
           // beginDate: '',
           // endDate: '',
        }
    }
    componentWillReceiveProps(nextProps) {
            if(this.state.show){
              /*  this.setState({
                    show:false
                })*/
            }
    }
    componentDidMount(){
        this.props.getQuery();
    }

    //选择单位
    onChangeUnit = (unit) => {
        let unitUUID = unit[0]==0?"":unit[0]
        this.props.changeUnitToQueryAccount(unitUUID);

    };
    //选择账号
    onChangeAccount = (account) => {
        this.props.changeAccount(account[0]);

    };
    submitS = (e)=>{
        let that = this.refs;
        let billCode =  that.billCode.props.value||'';
        paramObj.billCode=billCode
        let recordCode =  that.recordCode.props.value||''; //导入批次
        paramObj.recordCode=recordCode
        let receiveName =  that.receiveName.props.value||''; //收款户名
         paramObj.recordCode=receiveName
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
                    {zh}  {this.state.startTime==''?'':<DateFill obj={this.state}/>}
                </List.Item>
            );
        }

        onConfirm = (startTime, endTime) => {
        console.log(startTime+','+endTime)
            document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
           let beginDate = fomartDate(startTime);
           let endDate = fomartDate(endTime)
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

            const {onChangeBillCode,onChangeAccount,onChangeUnit,onChangeReciveName,onChangeReqCode} = this.props;
            const billType = this.props.billType;
            const { getFieldProps } = this.props.form
            const {taskSearchState} = this.props;
            return(
                <form>
                <div className="tag-container">
                    <div className={'inputUnit'}>
                        <List renderHeader={() => ''} style={{width:'95%'}}>
                            <InputItem
                                {...getFieldProps('billCode',{
                                    initialValue: taskSearchState.billCode,
                                })}
                                clear
                                placeholder=""
                                ref={'billCode'}
                               // defaultValue ={'100'}
                                onChange={onChangeBillCode}
                                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                            >单据编号：</InputItem>
                            <Picker
                                data={taskSearchState.unitArray}
                                value={[taskSearchState.unitKey]}
                                cols={1}
                                key={3}
                                onChange={onChangeUnit}
                            >
                                <List.Item  key={1} arrow="horizontal">所属单位:</List.Item>
                            </Picker>
                           <Picker
                                data={taskSearchState.accountArray}
                                value={[taskSearchState.accountKey]}
                                cols={1}
                                key={1}
                                onChange={onChangeAccount}
                            >
                                <List.Item key={2} arrow="horizontal">付款账号:</List.Item>
                            </Picker>

                             <InputItem
                                    {...getFieldProps('receiveName',{
                                        initialValue: taskSearchState.receiveName,
                                    })}
                                    clear
                                    placeholder=""
                                    ref={'receiveName'}
                                   // defaultValue = {taskSearchState.receiveName}
                                    moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                                   onChange={onChangeReciveName}
                                >收款户名：</InputItem>
                           {/* <InputItem
                                {...getFieldProps('usage')}
                                clear
                                placeholder=""
                            >用途：</InputItem>*/}
                            {
                                billType!=1?"":
                                <InputItem
                                        {...getFieldProps('recordCode',{
                                            initialValue: taskSearchState.recordCode,
                                        })}
                                        clear
                                        placeholder=""
                                        ref={'recordCode'}
                                       // defaultValue = {taskSearchState.recordCode}
                                        moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                                        onChange={onChangeReqCode}
                                 >导入批次：</InputItem>
                            }

                           {/* <Picker
                                data={this.state.currencyArray}
                                value={this.state.currencyKey}
                                cols={1}
                                onChange={this.onChangeCurrency}
                            >
                                <List.Item key={4} arrow="horizontal">币  别:</List.Item>
                            </Picker>*/}
                            {/*{this.renderBtn('查询日期：', 'Select Date Range (Shortcut)', { showShortcut: true })}*/}

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
        <div style={{float:'right',color:'#888',fontSize:'14px'}}>{obj.startTime+'-'+obj.endTime}</div>
    )

}


function  mapState(state) {
    return {
        taskSearchState:state.getIn(['taskSearch']).toJS()
    }
}
function  mapDispatch(dispatch,ownProps) {
    return {
        getQuery:()=>{
            dispatch(queryParam())
        },
        onChangeBillCode:(billCode)=>{
            dispatch(changeBillCode(billCode));
        },
        onChangeReciveName:(recieVe)=>{
            dispatch(changeRecive(recieVe));
        },
        onChangeReqCode:(reqCode)=>{
            dispatch(changeReqCode(reqCode));
        },
        setParamsToValue:(obj)=>{    //设置
            dispatch(setqueryParam(obj));
        },
        changeUnitToQueryAccount:(unitUUID)=>{  //切换单位
            dispatch(changeUnit(unitUUID));
        },
        changeAccount:(accountId)=>{  //切换账号
            dispatch(changeAccount(accountId));

        }
    }
}

export  default createForm()(connect(mapState,mapDispatch)(Search))
