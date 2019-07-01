import {Toast} from "antd-mobile/lib/index";
import API from '../../api/api'
import {createHashHistory} from 'history';
const history = createHashHistory();
export  const  startLogin = (param)=>{
    return async (dispatch) => {
       let dataJSon =  await API.login(param);

        if(dataJSon.success == "true"){
           /* let userInfo =  await API.queryUserInfo();//查询用户信息
            await API.queryUserRole({userUUID:userInfo.userUUID});//查询角色信息*/
            Toast.hide();//
            Toast.success("登录成功!", 1,function () {
                sessionStorage.setItem('UserSession',param);
                sessionStorage.setItem("userLoginTime",new Date().getTime())
                history.push('/home')
                return
                dispatch({
                    type:'LOGING_SUCCUSS',
                    value:true
                })
            })
        }else{
            Toast.fail(dataJSon.message)
            return;
        }


    }

}

