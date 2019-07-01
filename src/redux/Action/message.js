import instance  from '../../utils/instance'

export  const  queryNotice = (param)=>{
    return async (dispatch) => {
        debugger
        var resopne =   await instance.get('bt/wx/views/notice/queryNotice.do');
        debugger
        dispatch({
            type:'LOGING_SUCCUSS',
            rows:true
        })
    }

}

