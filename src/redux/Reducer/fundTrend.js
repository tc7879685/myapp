import  {fromJS} from 'immutable'
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const arryValue = [{label:"单位",value:0},{label:"账号",'value':1},{label:"银行类别",'value':2},{label:"单位标签",'value':3},{label:"账号标签",'value':4}];
const defaultValue = fromJS({
    data:undefined,
    reportLevel:0,
    reportLevelName:'单位',
    reportLevelData:arryValue,
   // currency:0,
   // currencyName:'',
    date:now //当前时间
})


export  default function fundTrend(state = defaultValue,action){
    switch (action.type){
        case 'CURRENCY': //币别
            return state.set('currency',action.value[0]);
        case 'FUND_INITDATA'://初始化数据
            let stateA = fromJS({
                currency:action.value[0].value,
                currencyData:action.value
            })
            let newState = state.merge(stateA) //合并
            return newState
        case  'FUND_TYPE'://选择类别
            return state.set('reportLevel',action.value[0]);
        case  'FUND_DATE'://选择时间
            return state.set('date',action.value);
        default:
            //state.set({"loaddingValue":'1234'})
            return state;
    }

}