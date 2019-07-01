/*
    登录组件
 */
import  React,{Component} from 'react'
import './css/login.css'
import './css/util.css'
import API from "../../api/api";
const  weixinPng = require('./files/weixin.png')
const logo = require('./files/logo.png')
class LoginComponent  extends  Component{
    submitLogin(){
        let corpCode =this.refs.corpCode.value;
        let userName = this.refs.userName.value;
        let pass =this.refs.pass.value;
        this.props.login(corpCode,userName,pass)
    }
    state ={
        backgound:undefined
    }
    //查询当前背景图片
    queryBackGround =  async ()=>{
        let obj =  this.props.obj;
        let visit_way = obj.visit_way;
        if(visit_way == 2){
            let param ={
                weixinpk:obj.weixinpk,
                openid:obj.openid
            }
            let result =   await  API.queryWxUserInfo(param);
            sessionStorage.setItem("headimgurl",result.headimgurl) //微信头像
            let corpCode =  result.plat_corpcode.split("_")[1];
            this.setState({
                backgound:require('./files/bg-05.jpg'),
                wxUser:result,
                visit_way:visit_way,
                corpCode:corpCode
            })
        }else{
            this.setState({
                backgound:require('./files/bg-05.jpg'),
                visit_way:visit_way
            })
        }
        //判断是否有绑定账号

        //查询不到图片设置默认背景图片


    }

    componentWillMount(){
        this.queryBackGround();

    }

    render(){
        return(
            <div className="limiter" style={{height:document.documentElement.clientHeight}}>
                <div className="container-login100" style={{background:`url(${this.state.backgound})`}}>
                    <div  className="wrap-login100 ">
                        <form className="login100-form validate-form">
                            <span className="login100-form-title p-b-49"><img src={logo} /></span>

                            <div className="wrap-input100 validate-input " data-validate="机构编号">
                                <input className="input100" type="text" value={this.state.visit_way==2?this.state.corpCode:null}  ref="corpCode" placeholder="机构编号"
                                     />
                                <span className="focus-input100"></span>
                            </div>
                            <div className="wrap-input100 validate-input" data-validate="用户名">
                                <input className="input100" type="text" value={this.state.visit_way==2?this.state.wxUser.account:null} ref="userName"  placeholder="用户名"/>
                                    <span className="focus-input100"></span>
                            </div>
                            <div className="wrap-input100 validate-input" data-validate="密码">
                                <input className="input100" type="password" ref="pass" placeholder="密码"/>
                                <span className="focus-input100"></span>
                            </div>
                            <div className="text-right p-t-8 p-b-31">
                            </div>
                            <div className="container-login100-form-btn">
                                <div className="wrap-login100-form-btn">
                                    <div className="login100-form-bgbtn"></div>
                                    <button className="login100-form-btn" onClick={this.submitLogin.bind(this)}>登 录</button>
                                </div>
                            </div>
                            <div style={{paddingTop:'40px'}}></div>
                            {/* 登录方式*/}
                           {/*  <LoginWay visit_way={visit_way}  />*/}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
//第三方登录
export  const LoginWay =(props)=>{
    let visit_way = props.visit_way;
    if(visit_way ==1 || visit_way ==2 ){
        return (
            <div>
                <div className="txt1 text-center p-t-54 p-b-20">
                    <span>第三方登录</span>
                </div>
                <div className="flex-c-m">
                    <a href="#" className="login100-social-item ">
                        <img src={weixinPng}/>
                    </a>
                </div>
            </div>
        )
    }
}

export  default LoginComponent

