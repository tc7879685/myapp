import  API from '../../api/api'

//初始化参数
export  const  queryParam  = (param)=>{
    return async (dispatch) => {
        let accountInfo =  await API.loadAccount({ queryFlag:1,unitUUID:''});
        let unitInfo =   await  API.getUnitInfo()

        dispatch({
            type:'TASK_SEARCH_PARAMS',
            value:{
                accountInfo:accountInfo, //账号信息
                unitInfo:unitInfo     //单位信息
            }
        })

    }

}

//设置参数
export  const  setqueryParam  = (param)=>{
    return async (dispatch) => {

        dispatch({
            type:'TASK_SET_QUERY_PARAMS',
            value:param
        })

    }

}

//选择单位
export  const  changeUnit  = (unitUUID)=>{
    return async (dispatch) => {
        var param = {
            queryFlag:1,
            unitUUID:unitUUID
        }
        let account =  await API.loadAccount(param);
        dispatch({
            type:'TASK_SRAECH_CHANGE_UNIT',
            value:{
                unitUUID:unitUUID,
                accountInfo:account
            }
        })
    }

}
//账号
export  const  changeAccount = (accountID)=>{
    return async (dispatch) => {
        dispatch({
            type:'TASK_SRAECH_CHANGE_ACCOUNT',
            value:accountID
        })
    }

}
//单据编号改变
export  const  changeBillCode = (billCode)=>{
    return async (dispatch) => {
        dispatch({
            type:'TASK_SRAECH_CHANGE_BILLCODE',
            value:billCode
        })
    }

}
//单据收款
export  const  changeRecive = (billCode)=>{
    return async (dispatch) => {
        dispatch({
            type:'TASK_SRAECH_CHANGE_RECIVE',
            value:billCode
        })
    }

}//批次号
export  const  changeReqCode = (billCode)=>{
    return async (dispatch) => {
        dispatch({
            type:'TASK_SRAECH_CHANGE_REQCODE',
            value:billCode
        })
    }

}
