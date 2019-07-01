import  React,{PureComponent} from 'react'
import  {SwipeAction,List,Toast} from 'antd-mobile'
import  LoginComponent from '../component/login/loginComponent'
import  {connect} from 'react-redux'
import  {CORP_CODE} from '../utils/const'
import  {startLogin} from '../redux/Action/login'
import  {Redirect} from 'react-router-dom'
import  md5 from 'md5'


const content ={
    height:'100%'
}
class Login  extends  PureComponent{
    login(){
        console.log(1)
    }
    state ={
        loginStaus:false
    }
    queryUNit = async ()=>{
        //await API.getBankType(); //获取银行类别信息
        //  await API.getCurrency(); //币别
       // await API.getdDtailType(); //收支属性
       // await API.getUnitInfo({showAll:1});//单位
    }



    //判断是否绑定账号
    constructor(){
        super()
        sessionStorage.clear();
        this.queryUNit();
    }
    render(){
        const visit_way = this.props.match.params.a; //访问方式 1为微信 0位app 2为已绑定账号的微信访问
        let obj ={
            visit_way:visit_way,
        }
        if(visit_way == 2){
            obj.weixinpk = this.props.match.params.weixinpk;
            obj.openid = this.props.match.params.openid;
            sessionStorage.setItem("login_weixin",JSON.stringify(obj))
        }
       // let login_status =  sessionStorage.getItem("login_status"); //登录状态
       // let {loginStatus} = this.props;
            return(
                    <LoginComponent obj={obj} style={{height:'100%'}}  login ={this.props.login.bind(this)} />
            )


    }
}

function  mapState(state) {
    return {
        loginStatus:state.getIn(['login','valueName'])
    };
}
function  mapDispatch(dispatch,ownProps) {
    return {
        async login(corpCode,userName,pass){
            if(corpCode == ""){ Toast.fail('机构编号不能为空',1);  return;}
            if(userName == ""){Toast.fail('用户名',1); return}
            if(pass == ""){Toast.fail('密码不能为空',1); return}
             let  new_corpCode = CORP_CODE+"_"+corpCode;//组装corpCode
               Toast.loading("登录中..")
                //存储账户
                localStorage.setItem("bytter_corp",new_corpCode)
                sessionStorage.setItem("isApp",1)
                dispatch(startLogin({userAccount:userName,platCode_corpCode:new_corpCode,userPassword:md5(pass)}))


        }
    }
}
export  default connect(null,mapDispatch)(Login);







