const defaultValue = {
    inputValue:222,
    list:[]
}

export  default (state = defaultValue,action)=>{
    switch (action.type){
        case "GET":
            return {
                inputValue:state.inputValue+1
            };
        default:
            return state;
    }

}