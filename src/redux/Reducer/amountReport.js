import  {fromJS} from 'immutable'
import {fomartDate, getPreDate} from '../../utils/commons'
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const  initEndDate = fomartDate(now);
const  dateArrays = [{label:"近七天",value:0,endDate:initEndDate,beginDate:getPreDate(initEndDate,7)},{label:"近一个月",'value':1,endDate:initEndDate,beginDate:getPreDate(initEndDate,30)}];
const defaultValue = fromJS({
    reportLevel:0, //统计维度 0单位，1位为账号 (当前为默认只有一个单位)
    dateKey:0,                      //时间key
    dateArrays:dateArrays, //
    reportStyle:1,
    reportMonth:0,
    moneyStyle:1,
})


export  default function amountReport(state = defaultValue,action){
    switch (action.type){
        case 'AMOUNT_INITDATA'://初始化数据
            let stateA = fromJS({
                currency:action.value.currencyInfo[0].value, //币别
                unitUUID:action.value.unitInfo[0].value,  //单位id
                currencyData:action.value.currencyInfo, //币别数据
                unitData:action.value.unitInfo          //单位数据
            })
            let newState = state.merge(stateA) //合并
            return newState
        case 'AMOUNT_CURRENCY': //币别
            return state.set('currency',action.value[0]);
        case  'AMOUNT_UNIT'://选择单位
            return state.set('unitUUID',action.value[0]);
        case  'AMOUNT_DATE'://选择时间
            return state.set('dateKey',action.value);
        default:
            //state.set({"loaddingValue":'1234'})
            return state;
    }

}