import  {fromJS} from 'immutable'
const defaultValue = fromJS({
    billCode:"",         //单据编号
    unitUUID:"",         //单位UUID
    payerAccountName:"", //付款账户
    receiveName:"",      //收款账户
    recordCode:""        //批次号
   })

export  default function todoList(state = defaultValue, action){
    switch (action.type){
        case 'TODO_SET_PARAM': //设置参数
            let stateA = fromJS({
                billCode:action.value.billCode,           //单据编号
                unitUUID:action.value.unitUUID,           //单位UUID
                payerAccountName:action.value.payerAccountName, //付款账户
                receiveName:action.value.receiveName,     //收款账户
                recordCode:action.value.recordCode        //批次号
            })
            let newState = state.merge(stateA) //合并
            return newState
        case 'LOGING_LODDING'://登陆中
            return {

            }
        case  'LOGING_SUCCUSS'://登陆成功
            return state.set('valueName',action.value);
        default:
            //state.set({"loaddingValue":'1234'})
            return state;
    }

}
