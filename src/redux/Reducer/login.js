import  {fromJS} from 'immutable'
const defaultValue = fromJS({
    valueName:false, //登陆提示信息
})

export  default function login(state = defaultValue,action){
    switch (action.type){
        case 'BEGIN_LOGIN': //开始登陆
            return {
                ...state
            };
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