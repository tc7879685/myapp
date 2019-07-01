import API from '../../api/api'
//初始化数据
export  const  initData = () =>{
    return  async (dispatch)=>{
        let currencyInfo  =   await  API.getCurrency() //币别
        dispatch({
            type:'FUND_INITDATA', //余额统计页初始数据
            value:currencyInfo
        })
    }
}
//币别切换
export  const  changeCurentcy=(param) =>{
    return  (dispatch)=>{
        dispatch({
            type:'CURRENCY',
            value:param
        })
    }
}

//选择类别
export  const  changeType=(param) =>{
    return  (dispatch)=>{
        dispatch({
            type:'FUND_TYPE',
            value:param
        })
    }
}
//选择日期
export  const  changeDate=(param) =>{
    return  (dispatch)=>{
        dispatch({
            type:'FUND_DATE',
            value:param
        })
    }
}