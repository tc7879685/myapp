import instance  from '../../utils/instance'

export  const  setParamAction  = (param)=>{
    return async (dispatch) => {
        dispatch({
            type:'TODO_SET_PARAM',
            value:param
        })

    }

}

