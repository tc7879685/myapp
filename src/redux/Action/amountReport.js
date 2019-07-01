import API from '../../api/api'
//初始化数据
export  const  initData = () =>{
    return  async (dispatch)=>{
        let  unitInfo = await API.getUnitInfo({showAll:false,isReload:true}); //单位
        let  currencyInfo = await API.getCurrency({showAll:false}); //币别
        dispatch({
            type:'AMOUNT_INITDATA', //结算量分析页初始数据
            value:{
                unitInfo:unitInfo,
                currencyInfo:currencyInfo
            }
        })
    }
}
//币别切换
export  const  changeCurency=(param) =>{
    return  (dispatch)=>{
        dispatch({
            type:'AMOUNT_CURRENCY',
            value:param
        })
    }
}

//选择单位
export  const  changeUnit=(param) =>{
    return  (dispatch)=>{
        dispatch({
            type:'AMOUNT_UNIT',
            value:param
        })
    }
}
//选择日期
export  const  changeDate=(param) =>{
    return  (dispatch)=>{
        dispatch({
            type:'AMOUNT_DATE',
            value:param
        })
    }
}