import  {fromJS} from 'immutable'
const defaultValue = fromJS({
    billCode:"",         //单据编号
    unitUUID:"",         //单位UUID
    payerAccountName:"", //付款账户
    receiveName:"",      //收款账户
    recordCode:"",        //批次号
    unitKey:'',           //单位参数
    accountKey:''         //账号key
   })

export  default function taskSearch(state = defaultValue, action){
    switch (action.type){
        case 'TASK_SET_QUERY_PARAMS': //设置参数
            let stateA = fromJS({
                billCode:action.value.billCode,           //单据编号
                unitUUID:action.value.unitUUID,             //单位UUID
                payerAccountName:action.value.payerAccountName,//付款账户
                unitKey:action.value.unitUUID,           //单位UUID
                accountKey:action.value.payerAccountName, //付款账户
                receiveName:action.value.receiveName,     //收款账户
                recordCode:action.value.recordCode        //批次号
            })
            let newState = state.merge(stateA) //合并
            return newState
        case 'TASK_SEARCH_PARAMS'://查询参数，设置参数
            let stateB = fromJS({
                unitArray:action.value.unitInfo,           //单位列表
                accountArray:action.value.accountInfo,     //收款账户列表
            })
            let newStateB = state.merge(stateB) //合并
            return newStateB
        case  'TASK_SRAECH_CHANGE_UNIT'://选择单位
            let stateC = fromJS({
                unitKey:action.value.unitUUID,
                unitUUID:action.value.unitUUID,
                accountArray:action.value.accountInfo,
            })
            let newStateC = state.merge(stateC) //合并
            return newStateC
        case 'TASK_SRAECH_CHANGE_ACCOUNT'://选择账号
            let stateD = fromJS({
                accountKey:action.value,
                payerAccountName:action.value,
            })
            return state.merge(stateD) //合并
        case 'TASK_SRAECH_CHANGE_BILLCODE'://改变单据编号
            let stateE = fromJS({
                billCode:action.value,
            })
            return state.merge(stateE) //合并
        case 'TASK_SRAECH_CHANGE_RECIVE'://改变收款账号
            let stateF = fromJS({
                receiveName:action.value,
            })
            return state.merge(stateF) //合并
        case 'TASK_SRAECH_CHANGE_REQCODE':  //批次号
            let stateG = fromJS({
                recordCode:action.value,
            })
            return state.merge(stateG) //合并
        default:
            //state.set({"loaddingValue":'1234'})
            return state;
    }

}
